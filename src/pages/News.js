import { useEffect, useState, useRef } from "react";

export default function News() {
    const [scriptLoaded, setScriptLoaded] = useState(false);
    const containerRef = useRef(null);

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
