// Load and display pastes from localStorage (for local testing)
document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('pastes-container');
    
    try {
        // Initialize default pastes if none exist
        if (!localStorage.getItem('pastes')) {
            const defaultPastes = [
                {
                    id: '1',
                    title: 'Welcome to Dorkbin',
                    content: 'Welcome to Dorkbin! Share your code snippets and pastes here.',
                    author: 'Zed',
                    date: '2026-02-21',
                    views: 150,
                    created_at: '2026-02-21T10:00:00Z',
                    password: null,
                },
                {
                    id: '2',
                    title: 'Sample Paste 1',
                    content: 'This is a sample paste to demonstrate functionality.',
                    author: 'You',
                    date: '2026-02-20',
                    views: 89,
                    created_at: '2026-02-20T15:30:00Z',
                    password: null,
                },
                {
                    id: '3',
                    title: 'Sample Paste 2',
                    content: 'Another paste example with some content.',
                    author: 'You',
                    date: '2026-02-19',
                    views: 25,
                    created_at: '2026-02-19T12:00:00Z',
                    password: null,
                }
            ];
            localStorage.setItem('pastes', JSON.stringify(defaultPastes));
        }
        // Initialize default users if none exist
        if (!localStorage.getItem('users')) {
            const defaultUsers = [
                { username: 'Zed', password: 'password', rank: 'Founder' },
                { username: 'Lud', password: 'password', rank: 'EXTORT' }
            ];
            localStorage.setItem('users', JSON.stringify(defaultUsers));
        }

        // Load pastes from localStorage
        let pastes = JSON.parse(localStorage.getItem('pastes')) || [];
        
        // Sort by newest first
        pastes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        function getUserRank(username) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.username === username);
            return user ? user.rank : null;
        }

        function formatAuthor(author) {
            const rank = getUserRank(author);
            if (rank) {
                const className = rank === 'EXTORT' ? 'led-text-red' : 'led-text';
                return `<a href="Profile.html?user=${author}"><span class="${className}">[${rank}]</span> ${author}</a>`;
            }
            return `<a href="Profile.html?user=${author}">${author}</a>`;
        }

        if (pastes.length > 0) {
            pastes.forEach(paste => {
                const pasteDiv = document.createElement('div');
                pasteDiv.className = 'paste';
                pasteDiv.innerHTML = `
                    <h3><a href="#" class="paste-link" data-id="${paste.id}">${paste.title}</a></h3>
                    <p>Author: ${formatAuthor(paste.author)} | Date: ${paste.date} | Views: ${paste.views}</p>
                    <div class="paste-content" style="display: none;">
                        <pre>${paste.content}</pre>
                        <div class="paste-comments">
                            <h4>Comments</h4>
                            <div class="comments-list" data-paste-id="${paste.id}"></div>
                            <input type="text" class="comment-input" placeholder="Add a comment...">
                            <button class="add-comment-btn" data-paste-id="${paste.id}">Comment</button>
                        </div>
                    </div>
                `;
                container.appendChild(pasteDiv);
            });

            // Add event listeners to toggle content
            document.querySelectorAll('.paste-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const pasteId = this.getAttribute('data-id');
                    const paste = pastes.find(p => p.id === pasteId);
                    if (paste.password) {
                        const enteredPassword = prompt('This paste is password protected. Enter password:');
                        if (enteredPassword !== paste.password) {
                            alert('Incorrect password.');
                            return;
                        }
                    }
                    const contentDiv = this.parentElement.nextElementSibling.nextElementSibling;
                    if (contentDiv.style.display === 'none') {
                        // Increment views
                        paste.views++;
                        localStorage.setItem('pastes', JSON.stringify(pastes));
                        // Update display
                        this.parentElement.nextElementSibling.innerHTML = `Author: ${formatAuthor(paste.author)} | Date: ${paste.date} | Views: ${paste.views}`;
                    }
                    contentDiv.style.display = contentDiv.style.display === 'none' ? 'block' : 'none';
                });
            });

            // Load paste comments
            const pasteComments = JSON.parse(localStorage.getItem('pasteComments')) || {};
            document.querySelectorAll('.comments-list').forEach(list => {
                const pasteId = list.getAttribute('data-paste-id');
                const comments = pasteComments[pasteId] || [];
                comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.classList.add('comment');
                    commentDiv.innerHTML = `<strong>${comment.author}:</strong> ${comment.text} <em>(${new Date(comment.date).toLocaleString()})</em>`;
                    list.appendChild(commentDiv);
                });
            });

            // Add event listeners for paste comments
            document.querySelectorAll('.add-comment-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const pasteId = this.getAttribute('data-paste-id');
                    const input = this.previousElementSibling;
                    const commentText = input.value.trim();
                    if (commentText !== '') {
                        const comment = { author: localStorage.getItem('username') || 'Anonymous', text: commentText, date: Date.now() };
                        if (!pasteComments[pasteId]) pasteComments[pasteId] = [];
                        pasteComments[pasteId].push(comment);
                        localStorage.setItem('pasteComments', JSON.stringify(pasteComments));
                        // Add to display
                        const list = document.querySelector(`.comments-list[data-paste-id="${pasteId}"]`);
                        const commentDiv = document.createElement('div');
                        commentDiv.classList.add('comment');
                        commentDiv.innerHTML = `<strong>${comment.author}:</strong> ${comment.text} <em>(${new Date(comment.date).toLocaleString()})</em>`;
                        list.appendChild(commentDiv);
                        input.value = '';
                    }
                });
            });
        } else {
            container.innerHTML = '<p>No pastes yet. <a href="#create-paste">Create one!</a></p>';
        }
    } catch (error) {
        console.error('Error loading pastes:', error);
        container.innerHTML = '<p>Error loading pastes. Please try again later.</p>';
    }
});