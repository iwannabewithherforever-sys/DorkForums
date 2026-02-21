exports.handler = async (event, context) => {
  // Simulate fetching user's pastes (in real app, query DB by user ID)
  const pastes = [
    { title: "Hello World", content: "print('Hello, world!')", author: "You", date: "2026-02-21", views: 0 },
    { title: "SQL Injection", content: "SELECT * FROM users WHERE username = 'admin' --", author: "You", date: "2026-02-20", views: 5 },
    { title: "XSS Example", content: "<script>alert('XSS')</script>", author: "You", date: "2026-02-19", views: 10 }
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(pastes),
  };
};