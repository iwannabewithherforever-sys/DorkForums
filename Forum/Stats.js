document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/.netlify/functions/get-stats');
        const stats = await response.json();

        // Update total pastes and active users
        document.querySelector('#sidebar p:nth-of-type(1)').textContent = `Total Pastes: ${stats.totalPastes.toLocaleString()}`;
        document.querySelector('#sidebar p:nth-of-type(2)').textContent = `Active Users: ${stats.activeUsers}`;

        // Add top contributor
        const statsSection = document.querySelector('#sidebar h3').nextElementSibling;
        let insertAfter = statsSection;
        while (insertAfter.nextElementSibling && insertAfter.nextElementSibling.tagName === 'P') {
            insertAfter = insertAfter.nextElementSibling;
        }
        
        // Get top contributor
        const topContributor = stats.topContributors && stats.topContributors[0];
        const topPastesP = document.createElement('p');
        if (topContributor) {
            topPastesP.textContent = `Top Contributor: ${topContributor.name} (${topContributor.pastes})`;
        } else {
            topPastesP.textContent = 'Top Contributor: Loading...';
        }
        insertAfter.parentNode.insertBefore(topPastesP, insertAfter.nextSibling);
        
        // Add total users stat
        const totalUsersP = document.createElement('p');
        totalUsersP.textContent = `Total Users: ${stats.totalUsers.toLocaleString()}`;
        insertAfter.parentNode.insertBefore(totalUsersP, topPastesP.nextSibling);
        
    } catch (error) {
        console.error('Error loading stats:', error);
        const statsSection = document.querySelector('#sidebar h3').nextElementSibling;
        const errorP = document.createElement('p');
        errorP.textContent = 'Stats unavailable';
        statsSection.parentNode.insertBefore(errorP, statsSection.nextSibling);
    }
});
