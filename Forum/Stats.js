document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/.netlify/functions/get-stats');
        const stats = await response.json();

        document.querySelector('#sidebar p:nth-of-type(1)').textContent = `Total Pastes: ${stats.totalPastes}`;
        document.querySelector('#sidebar p:nth-of-type(2)').textContent = `Active Users: ${stats.activeUsers}`;

        // Add most pastes
        const statsSection = document.querySelector('#sidebar h3').nextElementSibling;
        let insertAfter = statsSection;
        while (insertAfter.nextElementSibling && insertAfter.nextElementSibling.tagName === 'P') {
            insertAfter = insertAfter.nextElementSibling;
        }
        const mostPastesP = document.createElement('p');
        mostPastesP.textContent = `Most Pastes by: ${stats.mostPastesBy.author} (${stats.mostPastesBy.count})`;
        insertAfter.parentNode.insertBefore(mostPastesP, insertAfter.nextSibling);
    } catch (error) {
        console.error('Error loading stats:', error);
    }
});
