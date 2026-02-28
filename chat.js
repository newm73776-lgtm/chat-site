// Chat Application Logic - GlassChat

// ====================
// State Management
// ====================
const state = {
    currentUser: null,
    currentUserId: null,
    selectedUser: null,
    selectedUserId: null,
    currentChatId: null,
    isWorldChat: false,
    messages: [],
    chats: [],
    onlineUsers: new Set(),
    unsubscribeMessages: null,
    unsubscribeUserStatus: null
};

// ====================
// Emoji Data
// ====================
const emojiData = {
    smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖'],
    people: ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁', '👅', '👄', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', '👩', '🧓', '👴', '👵'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🕸', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍🦺', '🐈', '🐈‍⬛', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔'],
    food: ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🍍', '🥝', '🥥', '🥑', '🍆', '🥔', '🥕', '🌽', '🌶', '🫑', '🥒', '🥬', '🥦', '🧄', '🧅', '🍄', '🥜', '🌰', '🍞', '🥐', '🥖', '🥨', '🥯', '🥞', '🧇', '🧀', '🍖', '🍗', '🥩', '🥓', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🌯', '🫔', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🫕', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🦀', '🦞', '🦐', '🦑', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯'],
    travel: ['🌍', '🌎', '🌏', '🌐', '🗺', '🧭', '🏔', '⛰', '🌋', '🗻', '🏕', '🏖', '🏜', '🏝', '🏞', '🏟', '🏛', '🏗', '🧱', '🪨', '🪵', '🛖', '🏘', '🏚', '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒', '🗼', '🗽', '⛪', '🕌', '🛕', '🕍', '⛩', '🕋', '⛲', '⛺', '🌁', '🌃', '🏙', '🌄', '🌅', '🌆', '🌇', '🌉', '♨️', '🎠', '🎡', '🎢', '💈', '🎪', '🚂', '🚃', '🚄', '🚅', '🚆', '🚇', '🚈', '🚉', '🚊', '🚝', '🚞', '🚋', '🚌', '🚍', '🚎', '🚐', '🚑', '🚒', '🚓', '🚔', '🚕', '🚖', '🚗', '🚘', '🚙', '🛻', '🚚', '🚛', '🚜', '🏎', '🏍', '🛵', '🦽', '🦼', '🛺', '🚲', '🛴', '🛹', '🛼', '🚏', '🛣', '🛤', '🛢', '⛽', '🚨', '🚥', '🚦', '🛑', '🚧', '⚓', '⛵', '🛶', '🚤', '🛳', '⛴', '🛥', '🚢', '✈️', '🛩', '🛫', '🛬', '🪂', '💺', '🚁', '🚟', '🚠', '🚡', '🛰', '🚀', '🛸', '🛎', '🧳'],
    objects: ['⌚️', '📱', '📲', '💻', '⌨️', '🖥', '🖨', '🖱', '🖲', '🕹', '🗜', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎞', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙', '🎚', '🎛', '🧭', '⏱', '⏲', '⏰', '🕰', '⌛️', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯', '🪔', '🧯', '🛢', '💸', '💵', '💴', '💶', '💷', '🪙', '💰', '💳', '💎', '⚖️', '🧰', '🔧', '🔨', '⚒', '🛠', '⛏', '🔩', '⚙️', '🧱', '⛓', '🧲', '🔫', '💣', '🧨', '🪓', '🔪', '🗡', '⚔️', '🛡', '🚬', '⚰️', '🪦', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳', '🩹', '🩺', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡', '🧹', '🧺', '🧻', '🚽', '🚰', '🚿', '🛁', '🛀', '🧼', '🪒', '🧽', '🧴', '🛎', '🔑', '🗝', '🚪', '🪑', '🛋', '🛏', '🛌', '🧸', '🖼', '🪞', '🪟', '🛍', '🛒', '🎁', '🎈', '🎏', '🎀', '🪄', '🪅', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📥', '📤', '📦', '🏷', '🪧', '📪', '📫', '📬', '📭', '📮', '📯', '📜', '📃', '📄', '📑', '🧾', '📊', '📈', '📉', '🗒', '🗓', '📆', '📅', '🗑', '📇', '🗃', '🗳', '🗄', '📋', '📁', '📂', '🗂', '🗞', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '🖇', '📐', '📏', '🧮', '📌', '📍', '✂️', '🖊', '🖋', '🖌', '🖍', '✏️', '📝', '✒️', '🆔'],
    symbols: ['💯', '🔢', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈️', '♉️', '♊️', '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚️', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕️', '🛑', '⛔️', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗️', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯️', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿️', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🛗', '🚹', '🚺', '🚼', '⚧', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🔟', '🔢'],
    flags: ['🏳️', '🏴', '🏴‍☠️', '🏁', '🚩', '🏳️‍🌈', '🏳️‍⚧️', '🇺🇳', '🇦🇫', '🇦🇽', '🇦🇱', '🇩🇿', '🇦🇸', '🇦🇩', '🇦🇴', '🇦🇮', '🇦🇶', '🇦🇬', '🇦🇷', '🇦🇲', '🇦🇼', '🇦🇺', '🇦🇹', '🇦🇿', '🇧🇸', '🇧🇭', '🇧🇩', '🇧🇧', '🇧🇾', '🇧🇪', '🇧🇿', '🇧🇯', '🇧🇲', '🇧🇹', '🇧🇴', '🇧🇦', '🇧🇼', '🇧🇷', '🇮🇴', '🇻🇬', '🇧🇳', '🇧🇬', '🇧🇫', '🇧🇮', '🇰🇭', '🇨🇲', '🇨🇦', '🇮🇨', '🇨🇻', '🇧🇶', '🇰🇾', '🇨🇫', '🇹🇩', '🇨🇱', '🇨🇳', '🇨🇽', '🇨🇨', '🇨🇴', '🇰🇲', '🇨🇬', '🇨🇩', '🇨🇰', '🇨🇷', '🇨🇮', '🇭🇷', '🇨🇺', '🇨🇼', '🇨🇾', '🇨🇿', '🇩🇰', '🇩🇯', '🇩🇲', '🇩🇴', '🇪🇨', '🇪🇬', '🇸🇻', '🇬🇶', '🇪🇷', '🇪🇪', '🇸🇿', '🇪🇹', '🇪🇺', '🇫🇰', '🇫🇴', '🇫🇯', '🇫🇮', '🇫🇷', '🇬🇫', '🇵🇫', '🇹🇫', '🇬🇦', '🇬🇲', '🇬🇪', '🇩🇪', '🇬🇭', '🇬🇮', '🇬🇷', '🇬🇱', '🇬🇩', '🇬🇵', '🇬🇺', '🇬🇹', '🇬🇬', '🇬🇳', '🇬🇼', '🇬🇾', '🇭🇹', '🇭🇳', '🇭🇰', '🇭🇺', '🇮🇸', '🇮🇳', '🇮🇩', '🇮🇷', '🇮🇶', '🇮🇪', '🇮🇲', '🇮🇱', '🇮🇹', '🇯🇲', '🇯🇵', '🎌', '🇯🇪', '🇯🇴', '🇰🇿', '🇰🇪', '🇰🇮', '🇽🇰', '🇰🇼', '🇰🇬', '🇱🇦', '🇱🇻', '🇱🇧', '🇱🇸', '🇱🇷', '🇱🇾', '🇱🇮', '🇱🇹', '🇱🇺', '🇲🇴', '🇲🇬', '🇲🇼', '🇲🇾', '🇲🇻', '🇲🇱', '🇲🇹', '🇲🇭', '🇲🇶', '🇲🇷', '🇲🇺', '🇾🇹', '🇲🇽', '🇫🇲', '🇲🇩', '🇲🇨', '🇲🇳', '🇲🇪', '🇲🇸', '🇲🇦', '🇲🇿', '🇲🇲', '🇳🇦', '🇳🇷', '🇳🇵', '🇳🇱', '🇳🇨', '🇳🇿', '🇳🇮', '🇳🇪', '🇳🇬', '🇳🇺', '🇳🇫', '🇰🇵', '🇲🇰', '🇲🇵', '🇳🇴', '🇴🇲', '🇵🇰', '🇵🇼', '🇵🇸', '🇵🇦', '🇵🇬', '🇵🇾', '🇵🇪', '🇵🇭', '🇵🇳', '🇵🇱', '🇵🇹', '🇵🇷', '🇶🇦', '🇷🇪', '🇷🇴', '🇷🇺', '🇷🇼', '🇼🇸', '🇸🇲', '🇸🇹', '🇸🇦', '🇸🇳', '🇷🇸', '🇸🇨', '🇸🇱', '🇸🇬', '🇸🇽', '🇸🇰', '🇸🇮', '🇸🇧', '🇸🇴', '🇿🇦', '🇬🇸', '🇰🇷', '🇸🇸', '🇪🇸', '🇱🇰', '🇧🇱', '🇸🇭', '🇰🇳', '🇱🇨', '🇵🇲', '🇻🇨', '🇸🇩', '🇸🇷', '🇸🇪', '🇨🇭', '🇸🇾', '🇹🇼', '🇹🇯', '🇹🇿', '🇹🇭', '🇹🇱', '🇹🇬', '🇹🇰', '🇹🇴', '🇹🇹', '🇹🇳', '🇹🇷', '🇹🇲', '🇹🇨', '🇹🇻', '🇻🇮', '🇺🇬', '🇺🇦', '🇦🇪', '🇬🇧', '🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🏴󠁧󠁢󠁳󠁣󠁴󠁿', '🏴󠁧󠁢󠁷󠁬󠁳󠁿', '🇺🇸', '🇺🇾', '🇺🇿', '🇻🇺', '🇻🇦', '🇻🇪', '🇻🇳', '🇼🇫', '🇪🇭', '🇾🇪', '🇿🇲', '🇿🇼']
};

// ====================
// DOM Elements
// ====================
const elements = {
    sidebar: document.getElementById('sidebar'),
    mainChat: document.getElementById('mainChat'),
    chatHeader: document.getElementById('chatHeader'),
    welcomeScreen: document.getElementById('welcomeScreen'),
    messagesContainer: document.getElementById('messagesContainer'),
    inputContainer: document.getElementById('inputContainer'),
    currentUserAvatar: document.getElementById('currentUserAvatar'),
    currentUserName: document.getElementById('currentUserName'),
    userSearch: document.getElementById('userSearch'),
    searchResults: document.getElementById('searchResults'),
    chatsList: document.getElementById('chatsList'),
    chatHeaderAvatar: document.getElementById('chatHeaderAvatar'),
    chatHeaderName: document.getElementById('chatHeaderName'),
    chatHeaderStatus: document.getElementById('chatHeaderStatus'),
    messageInput: document.getElementById('messageInput'),
    sendButton: document.getElementById('sendButton'),
    emojiButton: document.getElementById('emojiButton'),
    emojiPicker: document.getElementById('emojiPicker'),
    emojiGrid: document.getElementById('emojiGrid'),
    attachmentButton: document.getElementById('attachmentButton'),
    fileInput: document.getElementById('fileInput'),
    backButton: document.getElementById('backButton'),
    lightbox: document.getElementById('lightbox'),
    lightboxContent: document.getElementById('lightboxContent'),
    lightboxClose: document.getElementById('lightboxClose'),
    downloadButton: document.getElementById('downloadButton')
};

// ====================
// Initialization
// ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check authentication
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    
    if (!username || !userId) {
        window.location.href = 'index.html';
        return;
    }
    
    state.currentUser = username;
    state.currentUserId = userId;
    
    // Update UI
    elements.currentUserName.textContent = username;
    elements.currentUserAvatar.textContent = getInitials(username);
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize emoji picker
    initializeEmojiPicker();
    
    // Update user online status
    updateOnlineStatus();
    
    // Load recent chats
    loadRecentChats();
    
    // Set up presence tracking
    setupPresenceTracking();
}

// ====================
// Event Listeners
// ====================
function setupEventListeners() {
    // Search users
    elements.userSearch.addEventListener('input', debounce(handleUserSearch, 300));
    elements.userSearch.addEventListener('focus', () => {
        if (elements.userSearch.value.trim()) {
            elements.searchResults.classList.add('show');
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            elements.searchResults.classList.remove('show');
        }
    });
    
    // Send message
    elements.sendButton.addEventListener('click', sendMessage);
    elements.messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize input
    elements.messageInput.addEventListener('input', autoResizeInput);
    
    // Emoji picker
    elements.emojiButton.addEventListener('click', toggleEmojiPicker);
    
    // File attachment
    elements.attachmentButton.addEventListener('click', () => elements.fileInput.click());
    elements.fileInput.addEventListener('change', handleFileUpload);
    
    // Back button (mobile)
    elements.backButton.addEventListener('click', showSidebar);
    
    // Lightbox
    elements.lightboxClose.addEventListener('click', closeLightbox);
    elements.lightbox.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) closeLightbox();
    });
    elements.downloadButton.addEventListener('click', downloadLightboxContent);
}

// ====================
// User Search
// ====================
async function handleUserSearch(e) {
    const query = e.target.value.trim().toLowerCase();
    
    if (!query) {
        elements.searchResults.classList.remove('show');
        return;
    }
    
    try {
        // Fetch all users and filter client-side (case-insensitive contains)
        const snapshot = await usersCollection.limit(100).get();
        
        const users = [];
        snapshot.forEach(doc => {
            if (doc.id !== state.currentUserId) {
                const user = doc.data();
                // Case-insensitive search: name contains query
                if (user.name && user.name.toLowerCase().includes(query)) {
                    users.push({ id: doc.id, ...user });
                }
            }
        });
        
        renderSearchResults(users);
    } catch (error) {
        console.error('Error searching users:', error);
    }
}

function renderSearchResults(users) {
    elements.searchResults.innerHTML = '';
    
    if (users.length === 0) {
        elements.searchResults.innerHTML = '<div class="search-result-item">No users found</div>';
    } else {
        users.forEach(user => {
            const div = document.createElement('div');
            div.className = 'search-result-item';
            div.innerHTML = `
                <div class="search-result-avatar">${getInitials(user.name)}</div>
                <div class="search-result-info">
                    <div class="search-result-name">${escapeHtml(user.name)}</div>
                    <div class="search-result-status">${user.online ? 'online' : 'offline'}</div>
                </div>
            `;
            div.addEventListener('click', () => selectUser(user));
            elements.searchResults.appendChild(div);
        });
    }
    
    elements.searchResults.classList.add('show');
}

// ====================
// Chat Selection
// ====================
async function selectUser(user) {
    state.selectedUser = user.name;
    state.selectedUserId = user.id;
    state.currentChatId = generateChatId(state.currentUserId, user.id);
    state.isWorldChat = false;
    
    // Remove active class from world chat
    document.getElementById('worldChatItem')?.classList.remove('active');
    
    // Update UI
    elements.chatHeaderAvatar.textContent = getInitials(user.name);
    elements.chatHeaderName.textContent = user.name;
    elements.chatHeader.style.display = 'flex';
    elements.welcomeScreen.style.display = 'none';
    elements.messagesContainer.style.display = 'flex';
    elements.inputContainer.style.display = 'block';
    
    // Update online status
    updateChatHeaderStatus(user.online);
    
    // Hide search results
    elements.searchResults.classList.remove('show');
    elements.userSearch.value = '';
    
    // On mobile, hide sidebar
    if (window.innerWidth <= 768) {
        elements.sidebar.classList.remove('show');
    }
    
    // Subscribe to messages
    subscribeToMessages();
    
    // Subscribe to user status
    subscribeToUserStatus(user.id);
    
    // Mark messages as read
    markMessagesAsRead();
}

// ====================
// World Chat
// ====================
function enterWorldChat() {
    state.isWorldChat = true;
    state.selectedUser = null;
    state.selectedUserId = null;
    state.currentChatId = 'world_chat';
    
    // Add active class to world chat item
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    document.getElementById('worldChatItem')?.classList.add('active');
    
    // Update UI
    elements.chatHeaderAvatar.textContent = '🌍';
    elements.chatHeaderName.textContent = 'World Chat';
    elements.chatHeaderStatus.textContent = 'Public chat room';
    elements.chatHeaderStatus.style.color = 'var(--text-secondary)';
    elements.chatHeader.style.display = 'flex';
    elements.welcomeScreen.style.display = 'none';
    elements.messagesContainer.style.display = 'flex';
    elements.inputContainer.style.display = 'block';
    
    // Hide search results
    elements.searchResults.classList.remove('show');
    elements.userSearch.value = '';
    
    // On mobile, hide sidebar
    if (window.innerWidth <= 768) {
        elements.sidebar.classList.remove('show');
    }
    
    // Unsubscribe from user status (not needed for world chat)
    if (state.unsubscribeUserStatus) {
        state.unsubscribeUserStatus();
        state.unsubscribeUserStatus = null;
    }
    
    // Subscribe to world messages
    subscribeToWorldMessages();
}

function showSidebar() {
    elements.sidebar.classList.add('show');
}

function subscribeToUserStatus(userId) {
    if (state.unsubscribeUserStatus) {
        state.unsubscribeUserStatus();
    }
    
    state.unsubscribeUserStatus = usersCollection.doc(userId).onSnapshot((doc) => {
        if (doc.exists) {
            const user = doc.data();
            updateChatHeaderStatus(user.online);
        }
    });
}

function updateChatHeaderStatus(online) {
    const avatar = elements.chatHeaderAvatar;
    const status = elements.chatHeaderStatus;
    
    if (online) {
        avatar.classList.add('online');
        status.textContent = 'online';
        status.style.color = 'var(--online-color)';
    } else {
        avatar.classList.remove('online');
        status.textContent = 'offline';
        status.style.color = 'var(--text-secondary)';
    }
}

// ====================
// Messaging
// ====================
function subscribeToMessages() {
    if (state.unsubscribeMessages) {
        state.unsubscribeMessages();
    }
    
    state.messages = [];
    elements.messagesContainer.innerHTML = '';
    
    state.unsubscribeMessages = messagesCollection
        .doc(state.currentChatId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const message = { id: change.doc.id, ...change.doc.data() };
                
                if (change.type === 'added') {
                    state.messages.push(message);
                    renderMessage(message);
                    scrollToBottom();
                } else if (change.type === 'modified') {
                    updateMessageStatus(message);
                }
            });
            
            // Update chat preview in sidebar
            updateChatPreview();
        }, (error) => {
            console.error('Error subscribing to messages:', error);
        });
}

function subscribeToWorldMessages() {
    if (state.unsubscribeMessages) {
        state.unsubscribeMessages();
    }
    
    state.messages = [];
    elements.messagesContainer.innerHTML = '';
    
    // Subscribe to world chat messages from a global collection
    state.unsubscribeMessages = messagesCollection
        .doc('world_chat')
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .limit(100)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const message = { id: change.doc.id, ...change.doc.data() };
                
                if (change.type === 'added') {
                    state.messages.push(message);
                    renderWorldMessage(message);
                    scrollToBottom();
                }
            });
        }, (error) => {
            console.error('Error subscribing to world messages:', error);
        });
}

async function sendMessage() {
    const text = elements.messageInput.value.trim();
    
    if (!text || !state.currentChatId) return;
    
    // Handle world chat
    if (state.isWorldChat) {
        const message = {
            senderId: state.currentUserId,
            senderName: state.currentUser,
            text: text,
            type: 'text',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        try {
            elements.messageInput.value = '';
            elements.messageInput.style.height = 'auto';
            
            await messagesCollection
                .doc('world_chat')
                .collection('messages')
                .add(message);
        } catch (error) {
            console.error('Error sending world message:', error);
        }
        return;
    }
    
    // Handle private chat
    const message = {
        senderId: state.currentUserId,
        receiverId: state.selectedUserId,
        text: text,
        type: 'text',
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'sent'
    };
    
    try {
        elements.messageInput.value = '';
        elements.messageInput.style.height = 'auto';
        
        await messagesCollection
            .doc(state.currentChatId)
            .collection('messages')
            .add(message);
        
        updateRecentChat();
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

async function sendMediaMessage(url, type, fileName) {
    // Handle world chat media
    if (state.isWorldChat) {
        const message = {
            senderId: state.currentUserId,
            senderName: state.currentUser,
            text: null,
            type: type,
            url: url,
            fileName: fileName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        try {
            await messagesCollection
                .doc('world_chat')
                .collection('messages')
                .add(message);
        } catch (error) {
            console.error('Error sending world media message:', error);
        }
        return;
    }
    
    // Handle private chat media
    const message = {
        senderId: state.currentUserId,
        receiverId: state.selectedUserId,
        text: null,
        type: type,
        url: url,
        fileName: fileName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'sent'
    };
    
    try {
        await messagesCollection
            .doc(state.currentChatId)
            .collection('messages')
            .add(message);
        
        updateRecentChat();
    } catch (error) {
        console.error('Error sending media message:', error);
    }
}

// ====================
// Message Rendering
// ====================
function renderMessage(message) {
    const isSent = message.senderId === state.currentUserId;
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    messageDiv.id = `message-${message.id}`;
    
    let content = '';
    
    if (message.type === 'text') {
        content = `<div class="message-content">${escapeHtml(message.text)}</div>`;
    } else if (message.type === 'image') {
        content = `
            <div class="message-media" onclick="openLightbox('${message.url}', 'image')">
                <img src="${message.url}" alt="Image" loading="lazy">
            </div>
        `;
    } else if (message.type === 'video') {
        content = `
            <div class="message-media" onclick="openLightbox('${message.url}', 'video')">
                <video src="${message.url}" preload="metadata"></video>
            </div>
        `;
    }
    
    const time = message.timestamp ? formatTime(message.timestamp.toDate()) : '...';
    const ticks = getTicksHtml(message.status);
    
    messageDiv.innerHTML = `
        ${content}
        <div class="message-meta">
            <span>${time}</span>
            ${isSent ? `<span class="ticks">${ticks}</span>` : ''}
        </div>
    `;
    
    elements.messagesContainer.appendChild(messageDiv);
}

function renderWorldMessage(message) {
    const isSent = message.senderId === state.currentUserId;
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
    messageDiv.id = `message-${message.id}`;
    
    let content = '';
    
    if (message.type === 'text') {
        content = `<div class="message-content">${escapeHtml(message.text)}</div>`;
    } else if (message.type === 'image') {
        content = `
            <div class="message-media" onclick="openLightbox('${message.url}', 'image')">
                <img src="${message.url}" alt="Image" loading="lazy">
            </div>
        `;
    } else if (message.type === 'video') {
        content = `
            <div class="message-media" onclick="openLightbox('${message.url}', 'video')">
                <video src="${message.url}" preload="metadata"></video>
            </div>
        `;
    }
    
    const time = message.timestamp ? formatTime(message.timestamp.toDate()) : '...';
    const senderName = isSent ? 'You' : (message.senderName || 'Unknown');
    
    messageDiv.innerHTML = `
        <div class="message-sender" style="font-size: 12px; font-weight: 600; margin-bottom: 4px; color: ${isSent ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)'};">${escapeHtml(senderName)}</div>
        ${content}
        <div class="message-meta">
            <span>${time}</span>
        </div>
    `;
    
    elements.messagesContainer.appendChild(messageDiv);
}

function updateMessageStatus(message) {
    const messageEl = document.getElementById(`message-${message.id}`);
    if (messageEl) {
        const ticksEl = messageEl.querySelector('.ticks');
        if (ticksEl) {
            ticksEl.innerHTML = getTicksHtml(message.status);
        }
    }
}

function getTicksHtml(status) {
    if (status === 'sent') {
        return '<span class="tick">✓</span>';
    } else if (status === 'delivered') {
        return '<span class="tick">✓✓</span>';
    } else if (status === 'read') {
        return '<span class="tick read">✓✓</span>';
    }
    return '';
}

// ====================
// File Upload - Local Server Storage
// ====================
async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
        alert('Please select an image or video file');
        return;
    }
    
    const type = isImage ? 'image' : 'video';
    
    try {
        // Create upload preview
        const uploadId = `upload-${Date.now()}`;
        const previewDiv = document.createElement('div');
        previewDiv.className = 'message sent';
        previewDiv.id = uploadId;
        previewDiv.innerHTML = `
            <div class="message-content">Uploading ${type}...</div>
            <div class="upload-progress">
                <div class="upload-progress-bar" id="progress-${uploadId}" style="width: 0%"></div>
            </div>
        `;
        elements.messagesContainer.appendChild(previewDiv);
        scrollToBottom();
        
        // Upload to local server
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        
        const xhr = new XMLHttpRequest();
        
        // Track upload progress
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 100;
                const progressBar = document.getElementById(`progress-${uploadId}`);
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
            }
        });
        
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    if (response.success) {
                        previewDiv.remove();
                        sendMediaMessage(response.url, response.type, file.name);
                    } else {
                        throw new Error(response.details || response.error || 'Upload failed');
                    }
                } catch (error) {
                    console.error('Upload error:', error);
                    previewDiv.remove();
                    alert('Upload failed: ' + error.message);
                }
            } else {
                // Show detailed error from server
                try {
                    const errorResponse = JSON.parse(xhr.responseText);
                    previewDiv.remove();
                    alert('Upload failed: ' + (errorResponse.details || errorResponse.error || 'Server error ' + xhr.status));
                } catch (e) {
                    previewDiv.remove();
                    alert('Upload failed. Server returned status: ' + xhr.status);
                }
            }
        });
        
        xhr.addEventListener('error', () => {
            console.error('Upload error');
            previewDiv.remove();
            alert('Upload failed. Please check server connection.');
        });
        
        xhr.open('POST', 'upload.php');
        xhr.send(formData);
        
    } catch (error) {
        console.error('Error handling file upload:', error);
    }
    
    // Reset file input
    elements.fileInput.value = '';
}

// ====================
// Emoji Picker
// ====================
function initializeEmojiPicker() {
    renderEmojis('smileys');
    
    // Category buttons
    document.querySelectorAll('.emoji-category').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.emoji-category').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderEmojis(btn.dataset.category);
        });
    });
}

function renderEmojis(category) {
    const emojis = emojiData[category] || [];
    elements.emojiGrid.innerHTML = emojis.map(emoji => 
        `<span class="emoji-item" onclick="insertEmoji('${emoji}')">${emoji}</span>`
    ).join('');
}

function toggleEmojiPicker() {
    elements.emojiPicker.classList.toggle('show');
}

function insertEmoji(emoji) {
    elements.messageInput.value += emoji;
    elements.messageInput.focus();
    autoResizeInput();
}

// Close emoji picker when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.input-wrapper') && !e.target.closest('.emoji-picker-container')) {
        elements.emojiPicker.classList.remove('show');
    }
});

// ====================
// Lightbox
// ====================
let currentLightboxUrl = '';

function openLightbox(url, type) {
    currentLightboxUrl = url;
    elements.lightboxContent.innerHTML = type === 'image' 
        ? `<img src="${url}" alt="Media">`
        : `<video src="${url}" controls autoplay></video>`;
    elements.lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    elements.lightbox.classList.remove('show');
    elements.lightboxContent.innerHTML = '';
    currentLightboxUrl = '';
    document.body.style.overflow = '';
}

function downloadLightboxContent() {
    if (!currentLightboxUrl) return;
    
    const a = document.createElement('a');
    a.href = currentLightboxUrl;
    a.download = 'media';
    a.target = '_blank';
    a.click();
}

// ====================
// Chat Management
// ====================
async function loadRecentChats() {
    try {
        const snapshot = await messagesCollection
            .where('participants', 'array-contains', state.currentUserId)
            .orderBy('lastMessageTime', 'desc')
            .limit(20)
            .get();
        
        state.chats = [];
        snapshot.forEach(doc => {
            state.chats.push({ id: doc.id, ...doc.data() });
        });
        
        renderChatsList();
    } catch (error) {
        console.error('Error loading chats:', error);
    }
}

function renderChatsList() {
    if (state.chats.length === 0) return;
    
    elements.chatsList.innerHTML = '';
    
    state.chats.forEach(chat => {
        const otherUserId = chat.participants.find(id => id !== state.currentUserId);
        const isActive = state.currentChatId === chat.id;
        
        const div = document.createElement('div');
        div.className = `chat-item ${isActive ? 'active' : ''}`;
        div.innerHTML = `
            <div class="chat-item-avatar">${getInitials(chat.otherUserName)}</div>
            <div class="chat-item-info">
                <div class="chat-item-header">
                    <span class="chat-item-name">${escapeHtml(chat.otherUserName)}</span>
                    <span class="chat-item-time">${formatTimeShort(chat.lastMessageTime?.toDate())}</span>
                </div>
                <div class="chat-item-preview">${escapeHtml(chat.lastMessageText || 'No messages')}</div>
            </div>
        `;
        
        div.addEventListener('click', () => {
            selectUser({ id: otherUserId, name: chat.otherUserName });
        });
        
        elements.chatsList.appendChild(div);
    });
}

async function updateRecentChat() {
    if (!state.currentChatId || !state.selectedUser) return;
    
    const chatRef = messagesCollection.doc(state.currentChatId);
    
    try {
        await chatRef.set({
            participants: [state.currentUserId, state.selectedUserId],
            otherUserName: state.selectedUser,
            lastMessageTime: firebase.firestore.FieldValue.serverTimestamp(),
            lastMessageText: elements.messageInput.value.trim() || 'Media'
        }, { merge: true });
    } catch (error) {
        console.error('Error updating chat:', error);
    }
}

function updateChatPreview() {
    // Refresh the chat list when new messages arrive
    loadRecentChats();
}

async function markMessagesAsRead() {
    if (!state.currentChatId) return;
    
    try {
        const unreadMessages = await messagesCollection
            .doc(state.currentChatId)
            .collection('messages')
            .where('receiverId', '==', state.currentUserId)
            .where('status', 'in', ['sent', 'delivered'])
            .get();
        
        const batch = db.batch();
        unreadMessages.forEach(doc => {
            batch.update(doc.ref, { status: 'read' });
        });
        
        await batch.commit();
    } catch (error) {
        console.error('Error marking messages as read:', error);
    }
}

// ====================
// Presence & Status
// ====================
function updateOnlineStatus() {
    const userRef = usersCollection.doc(state.currentUserId);
    
    // Set online
    userRef.update({
        online: true,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Set offline on disconnect
    userRef.onDisconnect().update({
        online: false,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function setupPresenceTracking() {
    // Mark messages as delivered when user opens chat
    setInterval(() => {
        if (state.currentChatId) {
            markMessagesAsDelivered();
        }
    }, 3000);
}

async function markMessagesAsDelivered() {
    if (!state.currentChatId) return;
    
    try {
        const undeliveredMessages = await messagesCollection
            .doc(state.currentChatId)
            .collection('messages')
            .where('receiverId', '==', state.currentUserId)
            .where('status', '==', 'sent')
            .get();
        
        const batch = db.batch();
        undeliveredMessages.forEach(doc => {
            batch.update(doc.ref, { status: 'delivered' });
        });
        
        await batch.commit();
    } catch (error) {
        console.error('Error marking messages as delivered:', error);
    }
}

// ====================
// Utility Functions
// ====================
function getInitials(name) {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatTime(date) {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

function formatTimeShort(date) {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function scrollToBottom() {
    elements.messagesContainer.scrollTop = elements.messagesContainer.scrollHeight;
}

function autoResizeInput() {
    elements.messageInput.style.height = 'auto';
    elements.messageInput.style.height = elements.messageInput.scrollHeight + 'px';
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ====================
// Cleanup on page unload
// ====================
window.addEventListener('beforeunload', () => {
    if (state.unsubscribeMessages) {
        state.unsubscribeMessages();
    }
    if (state.unsubscribeUserStatus) {
        state.unsubscribeUserStatus();
    }
    
    // Set user offline
    if (state.currentUserId) {
        usersCollection.doc(state.currentUserId).update({
            online: false,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
});
