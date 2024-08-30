import { useEffect, useState } from "react";
import { apiKey, apiUrl, prem, champ, corsProxyUrl } from "../Global";
import "../App.css";
import { format, addDays, subDays } from "date-fns";
import { Link } from "react-router-dom";

export default function Matches() {
    const [matches, setMatches] = useState();
    const [data, setData] = useState();
    const [league, setLeague] = useState(prem);

    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [euDate, setEuDate] = useState(format(date, "dd MMMM"));
    const [dayBeforeDate, setDayBeforeDate] = useState(format(subDays(date, 1), "yyyy-MM-dd"));
    const [dayAfterDate, setDayAfterDate] = useState(format(addDays(date, 1), "yyyy-MM-dd"));

    useEffect(() => {
        console.log(date, dayAfterDate);
        const urlCors = `${corsProxyUrl}api/matches/?dateFrom=${date}&dateTo=${dayAfterDate}`;
        const url = `${apiUrl}matches/?dateFrom=${date}&dateTo=${dayAfterDate}`;
        fetch(`${urlCors}`, {
            method: "GET"
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
    }, [date, dayAfterDate, dayBeforeDate]);

    function updateDate(newDate) {
        setDate(newDate);
        setDayBeforeDate(format(subDays(newDate, 1), "yyyy-MM-dd"));
        setDayAfterDate(format(addDays(newDate, 1), "yyyy-MM-dd"));
        setEuDate(format(newDate, "dd MMMM"));
    }

    useEffect(() => {
        console.log(matches);
        console.log(typeof matches);
    });

    return (
        <div className="mb-5 mx-auto w-full">
            <div className="mb-5 w-full">
                <h1 className="text-center text-2xl font-bold my-8">Matches{" " + euDate}</h1>
                {data && (
                    <div className="flex justify-center my-5">
                        {/* <img
                        src={data.competition.emblem}
                        alt="Competition emblem"
                        className="w-32 h-24"
                    /> */}
                    </div>
                )}

                <div className="flex justify-center">
                    <div className="my-5 mx-1">
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
                    <div className="my-5 mx-1">
                        <button
                            onClick={() => {
                                updateDate(format(new Date(), "yyyy-MM-dd"));
                            }}
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Today
                        </button>
                    </div>

                    <div className="my-5 mx-1">
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
                                    <Link to={`/team/${match.homeTeam.id}`}>
                                        <div className="flex items-center flex-1 text-left ml-5 max-w-1/3 hover:text-blue-600 hover:underline underline-offset-2">
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
                                    </Link>
                                    <div className="flex-none text-center w-1/3 uppercase">
                                        {match.status === "IN_PLAY" ? (
                                            <span className="block text-green-500 font-bold text-sm">
                                                Playing
                                            </span>
                                        ) : match.status === "TIMED" ? (
                                            <span className="block text-yellow-500 font-bold text-sm">
                                                Scheduled
                                            </span>
                                        ) : match.status === "FINISHED" ? (
                                            <span className="block text-blue-500 font-bold text-sm">
                                                Finished
                                            </span>
                                        ) : match.status === "POSTPONED" ? (
                                            <span className="block text-red-500 font-bold text-sm">
                                                Postponed
                                            </span>
                                        ) : (
                                            <span className="block text-green-500 font-bold text-sm">
                                                Playing
                                            </span>
                                        )}

                                        <span className="block border-b-2 border-indigo-500 w-fit mx-auto">
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

                                    <Link to={`/team/${match.awayTeam.id}`}>
                                        <div className="flex items-center flex-1 flex-row-reverse text-right mr-5 max-w-1/3 hover:text-blue-600 hover:underline underline-offset-2">
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
                                    </Link>
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
