// Create a new paste
const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    const { title, content, author, password } = JSON.parse(event.body);

    // Validate input
    if (!title || !content) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Title and content required' }) };
    }

    // Create paste object with unique ID
    const paste = {
      id: Date.now().toString(),
      title,
      content,
      author: author || 'Anonymous',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      password: password || null, // Optional password
      created_at: new Date().toISOString(),
    };

    // Save to Netlify Blobs
    const store = getStore('pastes');
    let pastes = [];
    try {
      const data = await store.get('data');
      if (data) {
        pastes = JSON.parse(data);
      }
    } catch (err) {
      // If no data, start with empty
    }
    pastes.push(paste);
    await store.set('data', JSON.stringify(pastes));

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ success: true, message: 'Paste created successfully', paste }),
    };
  } catch (error) {
    console.error('Error creating paste:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to create paste' }),
    };
  }
};