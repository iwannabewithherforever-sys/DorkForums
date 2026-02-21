// Get all pastes with optional search filtering
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'GET') {
      return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    // Get search query from URL parameters
    const searchQuery = event.queryStringParameters?.search || '';

    // Read pastes from Netlify Blobs
    const store = getStore('pastes');
    let pastes = [];
    try {
      const data = await store.get('data');
      if (data) {
        pastes = JSON.parse(data);
      } else {
        // Initialize with default pastes
        pastes = [
          {
            id: '1',
            title: 'Welcome to Dorkbin',
            content: 'Welcome to Dorkbin! Share your code snippets and pastes here.',
            author: 'Zed',
            category: 'General',
            date: '2026-02-21',
            views: 150,
            created_at: '2026-02-21T10:00:00Z',
          },
          {
            id: '2',
            title: 'Sample Paste 1',
            content: 'This is a sample paste to demonstrate functionality.',
            author: 'You',
            category: 'Code',
            date: '2026-02-20',
            views: 89,
            created_at: '2026-02-20T15:30:00Z',
          },
          {
            id: '3',
            title: 'Sample Paste 2',
            content: 'Another paste example with some content.',
            author: 'You',
            category: 'Text',
            date: '2026-02-19',
            views: 25,
            created_at: '2026-02-19T12:00:00Z',
          }
        ];
        await store.set('data', JSON.stringify(pastes));
      }
    } catch (err) {
      // If error, use empty array
    }

    // Filter by search query if provided
    if (searchQuery) {
      pastes = pastes.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by newest first
    pastes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        count: pastes.length,
        pastes,
      }),
    };
  } catch (error) {
    console.error('Error fetching pastes:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch pastes' }),
    };
  }
};