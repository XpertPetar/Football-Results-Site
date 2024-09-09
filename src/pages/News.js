import { useEffect, useState, useRef } from "react";
import { Tweet } from "react-tweet";
import axios from "axios";

export default function News() {
    // Not using the twitter api because of limits

    // const fetchLatestTweets = async (usernames) => {
    //     try {
    //         const response = await axios.get(
    //             `http://localhost:5000/api/tweets?usernames=${usernames.join(",")}`
    //         );
    //         return response.data.tweetIds;
    //     } catch (error) {
    //         console.error("Error fetching tweets:", error);
    //         return [];
    //     }
    // };

    const [tweetIds, setTweetIds] = useState([]);
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const containerRef = useRef(null);
    const usernames = ["FabrizioRomano", "David_Ornstein"];

    // useEffect(() => {
    //     const loadTweets = async () => {
    //         const ids = await fetchLatestTweets(usernames);
    //         setTweetIds(ids);
    //     };

    //     loadTweets();
    // }, [usernames]);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                if (rect.top < window.innerHeight && !scriptLoaded) {
                    const script = document.createElement("script");
                    script.src = "https://platform.twitter.com/widgets.js";
                    script.async = true;
                    script.charset = "utf-8";
                    document.body.appendChild(script);
                    script.onload = () => setScriptLoaded(true);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scriptLoaded]);

    return (
        <div className="px-4">
            <h1 className="text-center text-2xl font-bold my-8">News</h1>
            <div ref={containerRef} className="flex flex-wrap gap-5 justify-center">
                {/* {tweetIds.length > 0 ? (
                    tweetIds.map((id) => (
                        <div key={id} className="w-full lg:w-1/3 xl:w-1/3 mb-8 xl:max-w-xs">
                            <Tweet id={id} />
                        </div>
                    ))
                ) : ( */}
                {
                    <div className="w-full xl:w-2/3">
                        <a
                            className="twitter-timeline flex justify-center pulse-animation"
                            href="https://twitter.com/FabrizioRomano?ref_src=twsrc%5Etfw"
                        >
                            Loading tweets from Fabrizio Romano...
                        </a>
                    </div>
                }
            </div>
        </div>
    );
}
