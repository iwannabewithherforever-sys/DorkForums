exports.handler = async (event, context) => {
  // Simulate stats (in real app, calculate from DB)
  const stats = {
    totalPastes: 1234,
    activeUsers: 200,
    mostPastesBy: { author: "Zed", count: 50 }
  };

  return {
    statusCode: 200,
    body: JSON.stringify(stats),
  };
};