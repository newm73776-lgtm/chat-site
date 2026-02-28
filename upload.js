// api/upload.js - Vercel Serverless Function for file uploads
// Handles multipart form data and saves to /tmp (writable in serverless)

import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Disable body parsing - we handle it with formidable
export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            error: 'Method not allowed', 
            details: 'Expected POST, got ' + req.method 
        });
    }

    try {
        const form = formidable({
            multiples: false,
            maxFileSize: 10 * 1024 * 1024, // 10MB limit
            uploadDir: '/tmp',
            keepExtensions: true
        });

        const [fields, files] = await form.parse(req);
        const file = files.file?.[0];

        if (!file) {
            return res.status(400).json({ 
                error: 'No file uploaded', 
                details: 'File field "file" not found' 
            });
        }

        // Validate file type
        const mimeType = file.mimetype || '';
        const isImage = mimeType.startsWith('image/');
        const isVideo = mimeType.startsWith('video/');

        // Fallback to extension check
        const ext = path.extname(file.originalFilename || '').toLowerCase().slice(1);
        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
        const videoExts = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'];

        let type = null;
        if (isImage || imageExts.includes(ext)) {
            type = 'image';
        } else if (isVideo || videoExts.includes(ext)) {
            type = 'video';
        }

        if (!type) {
            // Clean up temp file
            fs.unlink(file.filepath, () => {});
            return res.status(400).json({ 
                error: 'Invalid file type', 
                details: `Type "${mimeType}" not allowed. Only images and videos.` 
            });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const uniqueId = Math.random().toString(36).substring(2, 15);
        const newFilename = `${timestamp}_${uniqueId}.${ext || (type === 'image' ? 'jpg' : 'mp4')}`;

        // Vercel's /tmp is writable but ephemeral (resets on each deploy)
        // For persistent storage, you'd need external service like S3, Cloudinary, etc.
        // For now, we'll return a data URL or use a workaround
        
        // Read file and convert to base64 for inline storage in Firestore
        // This is a workaround since Vercel serverless doesn't have persistent storage
        const fileBuffer = fs.readFileSync(file.filepath);
        const base64Data = fileBuffer.toString('base64');
        const dataUrl = `data:${mimeType};base64,${base64Data}`;

        // Clean up temp file
        fs.unlink(file.filepath, () => {});

        // Return the data URL (stored inline)
        return res.status(200).json({
            success: true,
            url: dataUrl,
            filename: newFilename,
            type: type,
            note: 'File stored as base64 inline (Vercel has no persistent file storage)'
        });

    } catch (error) {
        console.error('Upload error:', error);
        return res.status(500).json({ 
            error: 'Upload failed', 
            details: error.message 
        });
    }
}
