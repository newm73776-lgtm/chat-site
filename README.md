# GlassChat 💎

A WhatsApp-style real-time chat application with Liquid Glass UI, built with vanilla JavaScript and Firebase.

![GlassChat Preview](https://img.shields.io/badge/style-Liquid%20Glass-blueviolet)
![Firebase](https://img.shields.io/badge/firebase-firestore-orange)
![Status](https://img.shields.io/badge/status-ready-success)

## ✨ Features

- **🔐 Secret Key Authentication** - Access control with secret key `2122`
- **💬 Real-time Messaging** - Instant message delivery with Firestore
- **📨 Message Status** - Sent ✓ / Delivered ✓✓ / Read ✓✓ (blue) ticks
- **😀 Emoji Picker** - Full emoji support with categories
- **🖼️ Media Sharing** - Image and video uploads with thumbnails
- **📱 Responsive Design** - Works on mobile and desktop
- **🎨 Liquid Glass UI** - Frosted glass effects, blur backgrounds, smooth animations
- **👥 User Search** - Find users by name
- **🟢 Online Status** - Real-time presence indicators
- **🔍 Fullscreen Preview** - Lightbox for media with download option

## 🚀 Quick Start

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database** and **Storage**
4. Add a web app to get your configuration
5. Update `firebase.js` with your config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### 2. Firestore Rules

Set these rules in Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // For development only
    }
  }
}
```

**For production, use:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /messages/{chatId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 3. Storage Rules

Set these rules in Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /media/{allPaths=**} {
      allow read: if true;
      allow write: if true;  // For development
    }
  }
}
```

### 4. Storage CORS Configuration

To allow file uploads from your domain, configure CORS:

1. Install `gsutil` (Google Cloud SDK)
2. Create a `cors.json` file:

```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
```

3. Run:

```bash
gsutil cors set cors.json gs://your-project.appspot.com
```

## 📁 Project Structure

```
/project-root
  ├── index.html          # Landing page with secret key gate
  ├── chat.html           # Main chat interface
  ├── style.css           # Liquid Glass theme styles
  ├── app.js              # Landing page logic
  ├── chat.js             # Chat functionality
  ├── firebase.js         # Firebase configuration
  ├── vercel.json         # Vercel deployment config
  └── media/
      ├── pic/            # Image uploads directory
      └── video/          # Video uploads directory
```

## 🔧 Local Development

Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy!

The `vercel.json` configuration is already included.

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Select main branch as source
3. Your site will be at `https://yourusername.github.io/reponame`

### Netlify

1. Drag and drop your project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repository

## 🎨 Customization

### Change Secret Key

Edit in `app.js`:

```javascript
const SECRET_KEY = '2122';  // Change to your preferred key
```

### Customize Theme

Edit CSS variables in `style.css`:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    --sent-bubble: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
    --glass-bg: rgba(255, 255, 255, 0.15);
    /* ... more variables */
}
```

## 🔐 Security Considerations

For production deployment:

1. **Enable Firebase Authentication** instead of simple localStorage
2. **Update Firestore Rules** to validate requests
3. **Add request validation** in security rules
4. **Use Firebase App Check** to prevent abuse
5. **Enable Firebase Storage CORS** for your specific domain only

## 📱 Features in Detail

### Message Status System
- **Single grey tick** ✓ = Message sent to Firebase
- **Double grey tick** ✓✓ = Message delivered to receiver
- **Double blue tick** ✓✓ = Message read by receiver

### Supported Media
- **Images**: JPG, PNG, GIF, WebP
- **Videos**: MP4, WebM, MOV
- **Upload limit**: Determined by Firebase Storage rules (default 10MB)

### Responsive Breakpoints
- **Mobile**: < 768px (single panel, sidebar as overlay)
- **Desktop**: ≥ 768px (split view with sidebar)

## 🐛 Troubleshooting

### Firebase not connecting
- Check your `firebaseConfig` values
- Verify Firestore and Storage are enabled in Firebase Console
- Check browser console for specific errors

### File uploads not working
- Verify Storage rules allow writes
- Configure CORS properly
- Check file size limits in Firebase Console

### Messages not appearing
- Ensure Firestore rules allow read/write
- Check that user is registered in `users` collection
- Verify internet connection

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Credits

- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter) by Google Fonts
- **Icons**: Native emoji and Unicode symbols
- **Firebase**: Backend and real-time infrastructure
- **Design**: Inspired by iOS/iCloud Liquid Glass aesthetic

---

Built with ❤️ using vanilla JavaScript and Firebase
