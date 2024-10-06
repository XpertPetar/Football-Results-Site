import { useEffect, useState } from "react";
import "../App.css";
import { format, addDays, subDays } from "date-fns";
import { Link } from "react-router-dom";
import Calendar from "../components/Calendar";

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [euDate, setEuDate] = useState(format(new Date(), "dd MMMM"));
    const [dayBeforeDate, setDayBeforeDate] = useState(
        format(subDays(new Date(), 1), "yyyy-MM-dd")
    );
    const [dayAfterDate, setDayAfterDate] = useState(format(addDays(new Date(), 1), "yyyy-MM-dd"));

    useEffect(() => {
        setLoading(true);
        const url = `/api/footballApiProxy?endpoint=matches&dateFrom=${date}&dateTo=${dayAfterDate}`;

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMatches(data.matches || []);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
    }, [date, dayAfterDate]);

    function updateDate(newDate) {
        setDate(newDate);
        setDayBeforeDate(format(subDays(newDate, 1), "yyyy-MM-dd"));
        setDayAfterDate(format(addDays(newDate, 1), "yyyy-MM-dd"));
        setEuDate(format(newDate, "dd MMMM"));
    }

    const dummyMatches = Array.from({ length: 5 }, (_, index) => ({
        id: `dummy-${index}`,
        homeTeam: { crest: "", shortName: "Home Team Name...", name: "Home Team Name..." },
        awayTeam: { crest: "", shortName: "Away Team Name...", name: "Away Team Name..." },
        status: "SCHEDULED",
        score: { fullTime: { home: null, away: null } },
        utcDate: new Date().toISOString()
    }));

    return (
        <div className="mb-5 mx-auto w-full">
            <div className="mb-5 w-full">
                <h1 className="text-center text-2xl font-bold my-8">Matches{" " + euDate}</h1>
                <div className="flex justify-center">
                    <Calendar onDateChange={updateDate} selectedDate={date} />
                </div>
                <div className="flex justify-center">
                    <div className="my-5 mx-1">
                        <button
                            onClick={() =>
                                updateDate(format(subDays(new Date(date), 1), "yyyy-MM-dd"))
                            }
                            type="button"
                            className="text-white bg-gradient-to-br from-blue-900 to-blue-400 hover:bg-gradient-to-bl font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Previous Day
                        </button>
                    </div>
                    <div className="my-5 mx-1">
                        <button
                            onClick={() => updateDate(format(new Date(), "yyyy-MM-dd"))}
                            type="button"
                            className="text-white bg-gradient-to-br from-blue-900 to-blue-400 hover:bg-gradient-to-bl font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Today
                        </button>
                    </div>

                    <div className="my-5 mx-1">
                        <button
                            onClick={() =>
                                updateDate(format(addDays(new Date(date), 1), "yyyy-MM-dd"))
                            }
                            type="button"
                            className="text-white bg-gradient-to-br from-blue-900 to-blue-400 hover:bg-gradient-to-bl font-medium rounded-md text-sm px-5 py-2.5 text-center mb-2"
                        >
                            Next Day
                        </button>
                    </div>
                </div>

                <div className="mx-auto w-full">
                    <ul className="list-none">
                        {loading ? (
                            dummyMatches.map((match) => (
                                <li
                                    key={match.id}
                                    className="h-20 lg:w-3/4 mx-auto lg:p-5 mb-2 bg-blue-50 rounded flex items-center justify-between relative pulse-animation"
                                >
                                    <div className="flex items-center flex-1 text-left lg:ml-5 max-w-md">
                                        <div className="w-8 h-8 bg-gray-300 rounded mr-5"></div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <span className="block text-gray-500 font-bold text-sm">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center flex-1 flex-row-reverse text-right lg:mr-5 max-w-md">
                                        <div className="w-8 h-8 bg-gray-300 rounded ml-5"></div>
                                    </div>
                                </li>
                            ))
                        ) : matches.length > 0 ? (
                            matches.map((match) => (
                                <li
                                    key={match.id}
                                    className="h-20 lg:w-3/4 mx-auto lg:p-5 mb-2 bg-blue-50 bg-opacity-90 rounded flex items-center justify-between relative"
                                >
                                    <Link to={`/team/${match.homeTeam.id}`} className="z-40">
                                        <div className="flex items-center flex-1 text-left lg:ml-5 max-w-md hover:text-blue-600 hover:underline underline-offset-2">
                                            <img
                                                src={match.homeTeam.crest}
                                                alt="homeTeamLogo"
                                                className="w-8 h-8 mr-5"
                                            />
                                            <span className="text-sm sm:text-base truncate md:whitespace-normal">
                                                {window.innerWidth < 1200
                                                    ? match.homeTeam.shortName
                                                    : match.homeTeam.name}
                                            </span>
                                        </div>
                                    </Link>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            {match.status === "IN_PLAY" ? (
                                                <span className="block text-green-500 font-bold text-sm pulse-animation">
                                                    Playing
                                                </span>
                                            ) : match.status === "PAUSED" ? (
                                                <span className="block text-green-500 font-bold text-sm">
                                                    Half Time
                                                </span>
                                            ) : match.status === "TIMED" ||
                                              match.status === "SCHEDULED" ? (
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
                                                <span className="block text-green-500 font-bold text-sm pulse-animation">
                                                    Playing
                                                </span>
                                            )}

                                            <span
                                                className={`block border-b-2 w-fit mx-auto ${
                                                    match.status === "IN_PLAY"
                                                        ? "border-green-500 pulse-animation"
                                                        : match.status === "PAUSED"
                                                        ? "border-green-500"
                                                        : "border-indigo-500"
                                                }`}
                                            >
                                                {match.score.fullTime.home !== null &&
                                                match.score.fullTime.away !== null ? (
                                                    <span>
                                                        {match.score.fullTime.home}
                                                        {" : "}
                                                        {match.score.fullTime.away}
                                                    </span>
                                                ) : (
                                                    <span>
                                                        {(match.utcDate.substr(11, 5) === "00:00" &&
                                                            match.status === "SCHEDULED") ||
                                                        match.status === "POSTPONED"
                                                            ? "N/A"
                                                            : match.utcDate.substr(11, 5)}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <Link to={`/team/${match.awayTeam.id}`} className="z-40">
                                        <div className="flex items-center flex-1 flex-row-reverse text-right lg:mr-5 max-w-md hover:text-blue-600 hover:underline underline-offset-2">
                                            <span className="order-1 text-sm sm:text-base truncate md:whitespace-normal">
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
                            <p className="text-center text-lg text-gray-500">No matches found.</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
