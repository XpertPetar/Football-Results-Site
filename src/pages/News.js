import { useEffect, useState } from "react";
import { Tweet } from "react-tweet";
import axios from "axios";

export default function News() {
    const fetchLatestTweets = async (usernames) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/tweets?usernames=${usernames.join(",")}`
            );
            return response.data.tweetIds;
        } catch (error) {
            console.error("Error fetching tweets:", error);
            return [];
        }
    };

    const [tweetIds, setTweetIds] = useState([]);
    const usernames = ["FabrizioRomano", "David_Ornstein"]; // Replace with actual usernames

    useEffect(() => {
        const loadTweets = async () => {
            const ids = await fetchLatestTweets(usernames);
            setTweetIds(ids);
        };

        loadTweets();
    }, [usernames]);

    return (
        <div className="px-4">
            <h1 className="text-center text-2xl font-bold my-8">News</h1>
            <div className="flex flex-wrap gap-5 justify-center">
                {tweetIds.length > 0 ? (
                    tweetIds.map((id) => (
                        <div key={id} className="w-full lg:w-1/3 xl:w-1/3 mb-8 xl:max-w-xs">
                            <Tweet id={id} />
                        </div>
                    ))
                ) : (
                    <p>Loading tweets...</p>
                )}
            </div>
        </div>
    );
}
