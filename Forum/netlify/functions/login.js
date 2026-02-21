exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { username, password } = JSON.parse(event.body);

  // Simulate login (in real app, check DB)
  if (username === 'admin' && password === 'password') {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Login successful', redirect: 'Dorkbin.html' }),
    };
  }

  return { statusCode: 401, body: JSON.stringify({ error: 'Invalid credentials' }) };
};