import { useEffect, useState } from "react";
import { apiKey, apiUrl, prem, champ } from "../Global";
import "../App.css";

export default function Matches() {
    const [matches, setMatches] = useState();
    const [data, setData] = useState();
    const [league, setLeague] = useState(prem);

    function loadMatches(league) {
        const url = apiUrl + "competitions/" + league + "/matches/?status=FINISHED";
        fetch(url, {
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
    }

    useEffect(() => {
        loadMatches(prem);
    }, []);

    useEffect(() => {
        console.log(matches);
        console.log(typeof matches);
    });

    return (
        <div className="mb-5 w-full">
            <h1 className="text-center text-2xl font-bold my-4">Matches</h1>
            {data && (
                <div className="flex justify-center my-5">
                    <img
                        src={data.competition.emblem}
                        alt="Competition emblem"
                        className="w-32 h-24"
                    />
                </div>
            )}
            <div className="relative mx-auto w-2/4">
                <ul className="list-none">
                    {matches ? (
                        matches.map((match) => (
                            <li
                                key={match.id}
                                className="h-20 p-5 mb-2 bg-gray-100 rounded flex items-center"
                            >
                                <div className="flex items-center flex-1 text-left ml-5">
                                    <img
                                        src={match.homeTeam.crest}
                                        alt="homeTeamLogo"
                                        className="w-8 h-8 mr-5"
                                    />
                                    <span>{match.homeTeam.name}</span>
                                </div>
                                <div className="flex-none text-center w-24">
                                    <span className="border-b-2 border-indigo-500">
                                        {match.score.fullTime.home}
                                        {" : "}
                                        {match.score.fullTime.away}
                                    </span>
                                </div>
                                <div className="flex items-center flex-1 flex-row-reverse text-right mr-5">
                                    <span className="order-1">{match.awayTeam.name}</span>
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

                <div className="absolute my-5 left-0">
                    <button
                        onClick={() => {
                            if (league == prem) {
                                loadMatches(champ);
                                setLeague(champ);
                            } else {
                                loadMatches(prem);
                                setLeague(prem);
                            }
                        }}
                        type="button"
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                    >
                        Previous League
                    </button>
                </div>

                <div className="absolute my-5 right-0">
                    <button
                        onClick={() => {
                            if (league == prem) {
                                loadMatches(champ);
                                setLeague(champ);
                            } else {
                                loadMatches(prem);
                                setLeague(prem);
                            }
                        }}
                        type="button"
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                    >
                        Next League
                    </button>
                </div>
            </div>
        </div>
    );
}
