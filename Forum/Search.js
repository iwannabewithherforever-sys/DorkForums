document.querySelector('#search button').addEventListener('click', function() {
    const query = document.querySelector('#search input').value.toLowerCase().trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }
    const pastes = document.querySelectorAll('.paste');
    for (let paste of pastes) {
        const title = paste.querySelector('h3 a').textContent.toLowerCase();
        if (title.includes(query)) {
            const authorDate = paste.querySelector('p').textContent;
            const content = paste.querySelector('p:nth-of-type(2)').textContent;
            alert(`Paste Found:\nTitle: ${paste.querySelector('h3 a').textContent}\n${authorDate}\nContent: ${content}`);
            return;
        }
    }
    alert('No paste found with that name.');
});
