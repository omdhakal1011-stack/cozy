// Profile Logic
const database = firebase.database();
const user = firebase.auth().currentUser;

// Load user profile
function loadProfile() {
    const user = firebase.auth().currentUser;
    if (user) {
        database.ref('users/' + user.uid).once('value', (snapshot) => {
            const userData = snapshot.val();
            document.getElementById('usernameDisplay').textContent = userData.username;
            document.getElementById('emailDisplay').textContent = userData.email;
            document.getElementById('userAvatar').textContent = userData.avatar || 'A';
            document.getElementById('joinDate').textContent = new Date(userData.joinDate).toLocaleDateString();
        });
    }
}

// Edit avatar
function editAvatar() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const currentAvatar = document.getElementById('userAvatar').textContent;
    const currentIndex = letters.indexOf(currentAvatar);
    const nextIndex = (currentIndex + 1) % letters.length;
    const newAvatar = letters[nextIndex];
    
    document.getElementById('userAvatar').textContent = newAvatar;
    
    // Update in database
    const user = firebase.auth().currentUser;
    if (user) {
        database.ref('users/' + user.uid).update({
            avatar: newAvatar
        });
    }
}

// Load profile on page load
window.addEventListener('load', loadProfile);