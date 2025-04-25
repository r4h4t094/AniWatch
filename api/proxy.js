const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Extract the target URL from query parameters
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  try {
    // Forward the request to the target API
    const apiResponse = await fetch(targetUrl, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AnimeFlix/1.0'
      }
    });

    // Check if the response is OK
    if (!apiResponse.ok) {
      throw new Error(`API responded with status ${apiResponse.status}`);
    }

    // Get the response data
    const data = await apiResponse.json();

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Return the API response
    return res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
