const { getStore } = require('@netlify/blobs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Username and password required' }) };
  }

  try {
    const store = getStore('users');
    let users = [];
    try {
      const data = await store.get('data');
      if (data) {
        users = JSON.parse(data);
      }
    } catch (err) {
      // No users yet
    }

    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return { statusCode: 409, body: JSON.stringify({ error: 'Username already exists' }) };
    }

    // Add new user
    users.push({ username, password }); // In production, hash password
    await store.set('data', JSON.stringify(users));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Registration successful', redirect: 'Login.html' }),
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Registration failed' }),
    };
  }
};