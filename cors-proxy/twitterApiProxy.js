const express = require("express");
const { TwitterApi } = require("twitter-api-v2");
const cors = require("cors");
const app = express();
const port = 5000;
const { db, collection, addDoc, getDocs, query, where } = require("../src/firebase/firebase"); // Adjust the path as necessary

app.use(cors());

// Your credentials
const twitterClient = new TwitterApi({
    appKey: "torrh9NW5t7Q21ebwhUSaJjTc",
    appSecret: "5aeGFiNLkCn0esuV6xG9guS3KMhDx1CRQYZmZxSxpray8QCiAM",
    accessToken: "885257517428858882-Vr5BqydAzvmQYhEmC9kHL3DakBdnUS0",
    accessSecret: "UTpAdjCBgYKaCwyfvDkd8HNXjeKDOGpJRRVocOKB5wpds"
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

app.get("/api/tweets", async (req, res) => {
    try {
        const { usernames } = req.query;
        if (!usernames) {
            return res.status(400).send("Usernames query parameter is required");
        }

        const tweetIds = [];
        const usernamesArray = usernames.split(",");

        for (const username of usernamesArray) {
            let retry = true;
            while (retry) {
                try {
                    const user = await twitterClient.v2.userByUsername(username);
                    const userId = user.data.id;

                    // Fetch up to 3 tweets from the user
                    const tweets = await twitterClient.v2.userTimeline(userId, { max_results: 3 });

                    for (const tweet of tweets.data) {
                        // Check if tweet is already stored
                        const tweetRef = collection(db, "tweets");
                        const tweetQuery = query(tweetRef, where("id", "==", tweet.id));
                        const querySnapshot = await getDocs(tweetQuery);

                        if (querySnapshot.empty) {
                            // Add new tweet to Firebase
                            await addDoc(tweetRef, {
                                id: tweet.id,
                                text: tweet.text,
                                username: username
                            });
                        }

                        tweetIds.push(tweet.id);
                    }

                    retry = false; // Success, exit retry loop
                } catch (userError) {
                    if (
                        userError.response &&
                        userError.response.data &&
                        userError.response.data.status === 429
                    ) {
                        const rateLimitReset =
                            userError.response.headers["x-rate-limit-reset"] * 1000;
                        const currentTime = Date.now();
                        const waitTime = rateLimitReset - currentTime;
                        if (waitTime > 0) {
                            console.log(`Rate limit exceeded. Waiting for ${waitTime} ms.`);
                            await sleep(waitTime);
                        }
                    } else {
                        console.error(`Error fetching tweets for user ${username}:`, userError);
                        retry = false; // Exit retry loop on other errors
                    }
                }
            }

            // Add delay between requests to prevent hitting rate limits
            await sleep(1000); // Adjust delay as needed
        }

        res.json({ tweetIds });
    } catch (error) {
        console.error("Error fetching tweets:", error);
        res.status(500).send("Error fetching tweets");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
