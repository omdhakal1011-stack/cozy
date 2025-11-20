// Authentication Logic
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    firebase.auth().signInWithEmailAndPassword(username + '@cozygaming.com', password)
        .then((userCredential) => {
            localStorage.setItem('username', username);
            window.location.href = 'home.html';
        })
        .catch((error) => {
            alert('Login failed: ' + error.message);
        });
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Store username in database
            firebase.database().ref('users/' + user.uid).set({
                username: username,
                email: email,
                avatar: username.charAt(0).toUpperCase(),
                joinDate: new Date().toISOString()
            });
            localStorage.setItem('username', username);
            window.location.href = 'home.html';
        })
        .catch((error) => {
            alert('Signup failed: ' + error.message);
        });
});

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function logout() {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });
}

// Check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (!user && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
});