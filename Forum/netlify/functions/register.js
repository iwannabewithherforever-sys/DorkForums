exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, password } = JSON.parse(event.body);

  // Simulate registration (in real app, save to DB)
  if (!username || !password) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Username and password required' }) };
  }

  // Assume success
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Registration successful', redirect: 'Dorkbin.html' }),
  };
};