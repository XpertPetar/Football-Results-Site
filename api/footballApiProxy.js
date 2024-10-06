import axios from "axios";

export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === "GET") {
        try {
            const endpoint = req.query.endpoint;
            const targetUrl = `https://api.football-data.org/v4/${endpoint}`;

            const response = await axios.get(targetUrl, {
                headers: {
                    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
                    "X-Unfold-Lineups": true,
                    "X-Unfold-Goals": true
                },
                params: req.query
            });

            res.status(200).json(response.data);
        } catch (error) {
            console.error("Error fetching data:", error); // Log error to console
            res.status(error.response?.status || 500).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
