const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, password } = JSON.parse(event.body);

  try {
    const store = getStore('users');
    let users = [];
    try {
      const data = await store.get('data');
      if (data) {
        users = JSON.parse(data);
      }
    } catch (err) {
      // No users
    }

    // Check credentials
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Login successful', redirect: 'Dorkbin.html', username }),
      };
    } else {
      return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Login failed' }),
    };
  }
};