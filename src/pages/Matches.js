import { useEffect, useState } from "react";
import { apiKey, apiUrl, prem, champ } from "../Global";
import "../App.css";
import { format, addDays, subDays } from "date-fns";

export default function Matches() {
    const [matches, setMatches] = useState();
    const [data, setData] = useState();
    const [league, setLeague] = useState(prem);

    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [euDate, setEuDate] = useState(format(date, "dd MMMM"));
    const [dayBeforeDate, setDayBeforeDate] = useState(format(subDays(date, 1), "yyyy-MM-dd"));
    const [dayAfterDate, setDayAfterDate] = useState(format(addDays(date, 1), "yyyy-MM-dd"));

    useEffect(() => {
        const corsProxy = "https://cors-anywhere.herokuapp.com/"; // works but limit
        const corsProxy2 = "https://corsproxy.io/?";
        const corsProxy3 = "https://crossorigin.me/";
        const corsProxy4 = "https://test.cors.workers.dev/?";
        const url2 = "https://corsproxy.io/?" + encodeURIComponent("apiUrl");

        const url = apiUrl + `/matches/?dateFrom=${date}&dateTo=${dayAfterDate}`;
        fetch(`${url}`, {
            method: "GET",
            headers: {
                "X-Auth-Token": apiKey
            }
        })
            .then((response) => {
                console.log(response.status);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setData(data);
                setMatches(data.matches);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, [date]);

    function updateDate(date) {
        setDate(date);
        setEuDate(format(date, "dd MMMM"));
        setDayBeforeDate(format(subDays(date, 1), "yyyy-MM-dd"));
        setDayAfterDate(format(addDays(date, 1), "yyyy-MM-dd"));
    }

    useEffect(() => {
        console.log(matches);
        console.log(typeof matches);
    });

    return (
        <div className="mb-5 mx-auto w-full">
            <div className="mb-5 w-full">
                <h1 className="text-center text-2xl font-bold my-4">Matches{" " + euDate}</h1>
                {data && (
                    <div className="flex justify-center my-5">
                        {/* <img
                        src={data.competition.emblem}
                        alt="Competition emblem"
                        className="w-32 h-24"
                    /> */}
                    </div>
                )}

                <div className="flex justify-between">
                    <div className="my-5">
                        <button
                            onClick={() => {
                                updateDate(dayBeforeDate);
                            }}
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Previous Day
                        </button>
                    </div>

                    <div className="my-5">
                        <button
                            onClick={() => {
                                updateDate(dayAfterDate);
                            }}
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Next Day
                        </button>
                    </div>
                </div>

                <div className="mx-auto w-full">
                    <ul className="list-none">
                        {matches ? (
                            matches.map((match) => (
                                <li
                                    key={match.id}
                                    className="h-20 p-5 mb-2 bg-gray-100 rounded flex items-center justify-between"
                                >
                                    <div className="flex items-center flex-1 text-left ml-5 max-w-1/3">
                                        <img
                                            src={match.homeTeam.crest}
                                            alt="homeTeamLogo"
                                            className="w-8 h-8 mr-5"
                                        />
                                        <span className="">
                                            {window.innerWidth < 1200
                                                ? match.homeTeam.shortName
                                                : match.homeTeam.name}
                                        </span>
                                    </div>
                                    <div className="flex-none text-center w-1/3">
                                        <span className="border-b-2 border-indigo-500">
                                            {match.score.fullTime.home !== null &&
                                            match.score.fullTime.away !== null ? (
                                                <span>
                                                    {match.score.fullTime.home}
                                                    {" : "}
                                                    {match.score.fullTime.away}
                                                </span>
                                            ) : (
                                                <span>{match.utcDate.substr(11, 5)}</span>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center flex-1 flex-row-reverse text-right mr-5 max-w-1/3">
                                        <span className="order-1">
                                            {window.innerWidth < 1200
                                                ? match.awayTeam.shortName
                                                : match.awayTeam.name}
                                        </span>
                                        <img
                                            src={match.awayTeam.crest}
                                            alt="awayTeamLogo"
                                            className="w-8 h-8 ml-5"
                                        />
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>Loading matches...</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
