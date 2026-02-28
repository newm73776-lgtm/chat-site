<?php
// upload.php - Handle local file uploads for GlassChat
// Files are saved to media/pic/ or media/video/

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed', 'details' => 'Expected POST, got ' . $_SERVER['REQUEST_METHOD']]);
    exit;
}

// Check for upload errors
if (empty($_FILES)) {
    http_response_code(400);
    $uploadError = isset($_SERVER['CONTENT_LENGTH']) && $_SERVER['CONTENT_LENGTH'] > 0 
        ? 'File too large or PHP upload limits exceeded' 
        : 'No file data received';
    echo json_encode(['error' => 'No file uploaded', 'details' => $uploadError]);
    exit;
}

if (!isset($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded', 'details' => 'File field "file" not found in request']);
    exit;
}

$file = $_FILES['file'];

// Check for PHP upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'File too large (exceeds PHP upload_max_filesize)',
        UPLOAD_ERR_FORM_SIZE => 'File too large (exceeds form MAX_FILE_SIZE)',
        UPLOAD_ERR_PARTIAL => 'File partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'No temporary directory',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
        UPLOAD_ERR_EXTENSION => 'File upload stopped by extension'
    ];
    
    http_response_code(400);
    echo json_encode([
        'error' => 'Upload error',
        'details' => $errorMessages[$file['error']] ?? 'Unknown upload error (code: ' . $file['error'] . ')'
    ]);
    exit;
}

// Validate file type
$isImage = isset($file['type']) && strpos($file['type'], 'image/') === 0;
$isVideo = isset($file['type']) && strpos($file['type'], 'video/') === 0;

// Also check file extension as backup
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
$videoExtensions = ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'];

if (!$isImage && !$isVideo) {
    // Try extension-based detection
    if (in_array($extension, $imageExtensions)) {
        $isImage = true;
    } elseif (in_array($extension, $videoExtensions)) {
        $isVideo = true;
    }
}

if (!$isImage && !$isVideo) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Invalid file type',
        'details' => 'File type "' . ($file['type'] ?? 'unknown') . '" not allowed. Only images and videos allowed.'
    ]);
    exit;
}

// Determine folder
$folder = $isImage ? 'pic' : 'video';
$uploadDir = __DIR__ . '/media/' . $folder . '/';

// Create directory if doesn't exist
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create upload directory', 'details' => $uploadDir]);
        exit;
    }
}

// Check if directory is writable
if (!is_writable($uploadDir)) {
    http_response_code(500);
    echo json_encode(['error' => 'Upload directory not writable', 'details' => $uploadDir]);
    exit;
}

// Generate unique filename
$extension = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = time() . '_' . uniqid() . '.' . $extension;
$filepath = $uploadDir . $filename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $filepath)) {
    // Generate URL relative to root
    $url = "media/{$folder}/{$filename}";
    
    echo json_encode([
        'success' => true,
        'url' => $url,
        'filename' => $filename,
        'type' => $isImage ? 'image' : 'video'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to save file',
        'details' => 'move_uploaded_file failed from ' . $file['tmp_name'] . ' to ' . $filepath
    ]);
}
?>
