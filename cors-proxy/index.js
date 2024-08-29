const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for all routes
app.use(cors());

app.get("/api/*", async (req, res) => {
    try {
        // Extract the endpoint from the request URL
        const endpoint = req.params[0];

        // Construct the full URL to forward the request
        const targetUrl = `https://api.football-data.org/v4/${endpoint}`;

        // Forward the request with query parameters and headers
        const response = await axios.get(targetUrl, {
            headers: { "X-Auth-Token": "bee0fa7abc114385b2b2e9e1eb961b2b" }, // Replace with your actual API key
            params: req.query // Forward query parameters
        });

        // Send the response back to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
});
