// Blog Logic
const database = firebase.database();
const storage = firebase.storage();
const username = localStorage.getItem('username');

// Create post
function createPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const imageFile = document.getElementById('postImage').files[0];
    
    if (title && content) {
        const postData = {
            title: title,
            content: content,
            author: username,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        
        if (imageFile) {
            // Upload image
            const storageRef = storage.ref('post-images/' + Date.now() + '_' + imageFile.name);
            storageRef.put(imageFile).then((snapshot) => {
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    postData.imageUrl = downloadURL;
                    savePost(postData);
                });
            });
        } else {
            savePost(postData);
        }
    }
}

function savePost(postData) {
    database.ref('blog').push(postData).then(() => {
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';
        document.getElementById('postImage').value = '';
        alert('Post created successfully!');
    });
}

// Load posts
database.ref('blog').on('child_added', (snapshot) => {
    const post = snapshot.val();
    displayPost(post);
});

function displayPost(post) {
    const postsContainer = document.getElementById('postsContainer');
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    
    const postHTML = `
        <h3 class="post-title">${post.title}</h3>
        <div class="post-meta">By ${post.author} on ${new Date(post.timestamp).toLocaleDateString()}</div>
        <div class="post-content">${post.content}</div>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="Post image" class="post-image">` : ''}
    `;
    
    postDiv.innerHTML = postHTML;
    postsContainer.insertBefore(postDiv, postsContainer.firstChild);
}