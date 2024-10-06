const axios = require("axios");

export default async function handler(req, res) {
    // Handle CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === "GET") {
        try {
            // Extract the endpoint from the request URL
            const endpoint = req.query.endpoint;

            // Construct the full URL to forward the request
            const targetUrl = `https://api.football-data.org/v4/${endpoint}`;

            // Forward the request with query parameters and headers
            const response = await axios.get(targetUrl, {
                headers: {
                    "X-Auth-Token": "bee0fa7abc114385b2b2e9e1eb961b2b", // Replace with your actual API key
                    "X-Unfold-Lineups": true,
                    "X-Unfold-Goals": true
                },
                params: req.query // Forward query parameters
            });

            // Send the response back to the client
            res.status(200).json(response.data);
        } catch (error) {
            // Handle errors
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
