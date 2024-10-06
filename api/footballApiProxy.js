export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.method === "GET") {
        try {
            const endpoint = req.query.endpoint;
            let targetUrl = `https://api.football-data.org/v4/${endpoint}`;

            if (req.query.dateFrom && req.query.dateTo) {
                const dateFrom = req.query.dateFrom;
                const dateTo = req.query.dateTo;

                targetUrl += `?dateFrom=${dateFrom}&dateTo=${dateTo}`;
            }

            const response = await fetch(targetUrl, {
                method: "GET",
                headers: {
                    "X-Auth-Token": process.env.FOOTBALL_API_KEY,
                    "X-Unfold-Lineups": true,
                    "X-Unfold-Goals": true
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
