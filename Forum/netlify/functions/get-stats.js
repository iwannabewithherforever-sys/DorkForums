// Fetch dynamic stats for Dorkbin - total pastes, active users, and top contributors
exports.handler = async (event, context) => {
  try {
    // Add CORS headers for cross-origin requests
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle OPTIONS request (CORS preflight)
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: '',
      };
    }

    // Simulate fetching stats from database
    // In production, replace with real database queries
    const stats = {
      totalPastes: 1234,
      activeUsers: 200,
      totalUsers: 5678,
      pasteCategories: {
        code: 485,
        text: 342,
        config: 184,
        other: 223,
      },
      topContributors: [
        { rank: 1, name: 'Zed', pastes: 156 },
        { rank: 2, name: 'User1', pastes: 89 },
        { rank: 3, name: 'User2', pastes: 67 },
      ],
      communityStats: {
        totalViews: 45000,
        totalDownloads: 12000,
        averageRating: 4.5,
      },
      lastUpdated: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(stats),
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch stats' }),
    };
  }
};
