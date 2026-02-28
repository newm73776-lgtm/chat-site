// Landing Page Logic - GlassChat
const SECRET_KEY = '2122';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const secretKeyInput = document.getElementById('secretKey');
const errorToast = document.getElementById('errorToast');
const landingCard = document.querySelector('.landing-card');

// Check if already logged in
document.addEventListener('DOMContentLoaded', () => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        // Already logged in, redirect to chat
        window.location.href = 'chat.html';
    }
});

// Form Submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const secretKey = secretKeyInput.value.trim();
    
    // Validate inputs
    if (!username || !secretKey) {
        showError('Please fill in all fields');
        return;
    }
    
    // Check secret key
    if (secretKey !== SECRET_KEY) {
        showError('Wrong secret key. Access denied.');
        shakeCard();
        return;
    }
    
    // Secret key is correct - proceed
    try {
        // Save username to localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('userId', generateUserId(username));
        
        // Register or update user in Firebase
        await registerUser(username);
        
        // Animate and redirect
        landingCard.style.animation = 'slideUp 0.5s ease reverse forwards';
        landingCard.style.opacity = '0';
        landingCard.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            window.location.href = 'chat.html';
        }, 500);
        
    } catch (error) {
        console.error('Error registering user:', error);
        showError('Something went wrong. Please try again.');
    }
});

// Generate unique user ID from username
function generateUserId(username) {
    return username.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now().toString(36);
}

// Register user in Firebase
async function registerUser(username) {
    const userId = localStorage.getItem('userId');
    
    try {
        await usersCollection.doc(userId).set({
            name: username,
            online: true,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Set offline status when user leaves
        window.addEventListener('beforeunload', () => {
            usersCollection.doc(userId).update({
                online: false,
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
    } catch (error) {
        console.error('Firebase registration error:', error);
        throw error;
    }
}

// Show error toast
function showError(message) {
    errorToast.textContent = message;
    errorToast.classList.add('show');
    
    setTimeout(() => {
        errorToast.classList.remove('show');
    }, 3000);
}

// Shake animation for card
function shakeCard() {
    landingCard.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        landingCard.style.animation = '';
    }, 500);
}

// Input focus effects
usernameInput.addEventListener('focus', () => {
    errorToast.classList.remove('show');
});

secretKeyInput.addEventListener('focus', () => {
    errorToast.classList.remove('show');
});

// Allow Enter key to submit from any input field
secretKeyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});
