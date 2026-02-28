// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzUMlX0tqndSIfJ8r11LqVrjhvdcoxEjA",
    authDomain: "chat-app-be5d6.firebaseapp.com",
    databaseURL: "https://chat-app-be5d6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-app-be5d6",
    storageBucket: "chat-app-be5d6.firebasestorage.app",
    messagingSenderId: "351741166289",
    appId: "1:351741166289:web:bf7e55797d2b394254bbf0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore only
const db = firebase.firestore();

// Collection references
const usersCollection = db.collection('users');
const messagesCollection = db.collection('messages');

// Generate chat ID from two user IDs (consistent ordering)
function generateChatId(userId1, userId2) {
    const sorted = [userId1, userId2].sort();
    return `${sorted[0]}_${sorted[1]}`;
}

// Export for use in other files
window.firebaseConfig = firebaseConfig;
window.db = db;
window.usersCollection = usersCollection;
window.messagesCollection = messagesCollection;
window.generateChatId = generateChatId;
