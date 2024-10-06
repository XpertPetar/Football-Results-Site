export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === "GET") {
        try {
            const endpoint = req.query.endpoint;
            const targetUrl = `https://api.football-data.org/v4/${endpoint}`;

            const response = await fetch(targetUrl, {
                method: "GET",
                headers: {
                    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
                    "X-Unfold-Lineups": true,
                    "X-Unfold-Goals": true
                }
                // If you want to pass query parameters, you can append them to the URL
                // or use the `URLSearchParams` object for cleaner handling
                // Example:
                // params: req.query
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching data:", error); // Log error to console
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
