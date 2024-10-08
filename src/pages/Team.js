import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { differenceInYears } from "date-fns";
import Fixtures from "../components/Fixtures";
import FollowButton from "../components/FollowButton";
import clubLogo from "../images/clubLogo.png";

export default function Team() {
    const { id } = useParams();
    const [team, setTeam] = useState();
    const [squad, setSquad] = useState();
    const [fixtures, setFixtures] = useState();

    useEffect(() => {
        const url = `/api/footballApiProxy?endpoint=teams/${id}`;

        fetch(url, {
            method: "GET"
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setTeam(data);
                setSquad(data.squad);
            })
            .catch((error) => console.error("Fetch error:", error));

        const fixturesUrl = `/api/footballApiProxy?endpoint=teams/${id}/matches`;

        const timeout = setTimeout(() => {
            fetch(fixturesUrl, {
                method: "GET"
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    setFixtures(data.matches);
                })
                .catch((error) => console.error("Fetch error:", error));
        }, 2000);
    }, [id]);

    function calculateAge(dateOfBirth) {
        return differenceInYears(new Date(), new Date(dateOfBirth));
    }

    const dummyFixtures = [
        {
            id: 1,
            homeTeam: {
                id: 1,
                crest: "https://via.placeholder.com/48",
                shortName: "Home Team A"
            },
            awayTeam: {
                id: 2,
                crest: "https://via.placeholder.com/48",
                shortName: "Away Team A"
            },
            score: {
                fullTime: {
                    home: 0,
                    away: 0
                }
            },
            matchday: 1
        },
        {
            id: 2,
            homeTeam: {
                id: 3,
                crest: "https://via.placeholder.com/48",
                shortName: "Home Team B"
            },
            awayTeam: {
                id: 4,
                crest: "https://via.placeholder.com/48",
                shortName: "Away Team B"
            },
            score: {
                fullTime: {
                    home: 0,
                    away: 0
                }
            },
            matchday: 2
        },
        {
            id: 3,
            homeTeam: {
                id: 5,
                crest: "https://via.placeholder.com/48",
                shortName: "Home Team B"
            },
            awayTeam: {
                id: 6,
                crest: "https://via.placeholder.com/48",
                shortName: "Away Team B"
            },
            score: {
                fullTime: {
                    home: 0,
                    away: 0
                }
            },
            matchday: 2
        },
        {
            id: 4,
            homeTeam: {
                id: 7,
                crest: "https://via.placeholder.com/48",
                shortName: "Home Team B"
            },
            awayTeam: {
                id: 8,
                crest: "https://via.placeholder.com/48",
                shortName: "Away Team B"
            },
            score: {
                fullTime: {
                    home: 0,
                    away: 0
                }
            },
            matchday: 2
        },
        {
            id: 5,
            homeTeam: {
                id: 9,
                crest: "https://via.placeholder.com/48",
                shortName: "Home Team B"
            },
            awayTeam: {
                id: 10,
                crest: "https://via.placeholder.com/48",
                shortName: "Away Team B"
            },
            score: {
                fullTime: {
                    home: 0,
                    away: 0
                }
            },
            matchday: 2
        }
    ];

    return (
        <>
            {team ? (
                <div>
                    <div className="flex justify-center items-center gap-4">
                        <FollowButton id={id}></FollowButton>
                        <h1 className="text-2xl font-bold my-8 ml-2 inline-block">{team.name}</h1>
                    </div>
                    <div className="mx-auto flex flex-wrap lg:flex-nowrap lg:flex gap-5 justify-between my-8 bg-blue-50 bg-opacity-90 rounded-xl lg:rounded-full py-4">
                        <div className="w-1/2 lg:pl-40 p-5 inline-flex items-center justify-center mx-auto">
                            <img src={team.crest} className="inline-block w-46 h-46"></img>
                        </div>
                        <div className="w-3/4 lg:w-1/2 lg:border-l-2 border-slate-400 p-5 lg:pl-28">
                            <h3 className="text-xl font-bold mb-3">General Info</h3>
                            <div className="pl-2">
                                <p className="inline-block my-2">Founded: &nbsp;{team.founded}</p>
                                <br></br>
                                <p className="inline-block my-2">
                                    Nation: &nbsp;{team.area.name}&nbsp;
                                </p>
                                <img
                                    src={team.area.flag}
                                    className="w-8 h-8 ml-2 inline-block"
                                ></img>
                                <br></br>
                                <p className="inline-block my-2">Competiton: &nbsp;</p>

                                {team.runningCompetitions.map((competition) => {
                                    if (competition.type === "LEAGUE") {
                                        return (
                                            <Link
                                                to={`/competitions/${competition.id}?name=${competition.name}`}
                                                key={competition.id}
                                            >
                                                <div className="inline-block my-2 hover:text-blue-600 hover:underline underline-offset-2 hover:cursor-pointer">
                                                    {competition.name}
                                                    <img
                                                        src={competition.emblem}
                                                        className="w-8 h-8 ml-2 inline-block"
                                                    ></img>
                                                </div>
                                            </Link>
                                        );
                                    }
                                    return null;
                                })}

                                <br></br>
                                <p className="inline-block my-2">
                                    Club colors: &nbsp;{team.clubColors}
                                </p>
                                <br></br>
                                <p className="inline-block my-2">Stadium: &nbsp;{team.venue}</p>
                                <br></br>
                                <p className="inline-block my-2">
                                    Coach: &nbsp;{team.coach.name}&nbsp;
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-l-2 border-slate-400 p-5">
                        <h3 className="text-xl font-bold mb-3">Fixtures</h3>
                        {fixtures ? (
                            <Fixtures matches={fixtures} />
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <div className="flex space-x-2 divide-x py-2 relative">
                                        {dummyFixtures.map((fixture) => (
                                            <div
                                                key={fixture.id}
                                                className="w-52 h-48 p-4 flex-shrink-0 flex flex-wrap gap-2 justify-center items-start rounded-md bg-gray-200 pulse-animation bg-opacity-90"
                                            >
                                                <div className="w-full flex items-center gap-2">
                                                    <img
                                                        src={clubLogo}
                                                        alt={fixture.homeTeam.shortName}
                                                        className="w-12 h-12"
                                                    />
                                                    <span className="text-sm font-semibold bg-gray-100 text-transparent">
                                                        {fixture.homeTeam.shortName}
                                                    </span>
                                                    <span className="text-lg font-semibold ml-5">
                                                        {fixture.score.fullTime.home}
                                                    </span>
                                                </div>
                                                <div className="w-full flex items-center gap-2 mt-2">
                                                    <img
                                                        src={clubLogo}
                                                        alt={fixture.awayTeam.shortName}
                                                        className="w-12 h-12"
                                                    />
                                                    <span className="text-sm font-semibold bg-gray-100 text-transparent">
                                                        {fixture.awayTeam.shortName}
                                                    </span>
                                                    <span className="text-lg font-semibold ml-5">
                                                        {fixture.score.fullTime.away}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="w-full border-l-2 border-slate-400 p-5">
                        <h3 className="text-xl font-bold mb-3">Squad</h3>
                        <div>
                            <div className="flex justify-between items-center p-3 text-slate-800 bg-gradient-to-br from-blue-900 to-blue-400 text-white">
                                {window.innerWidth < 1200 ? (
                                    <>
                                        {" "}
                                        <span className="lg:w-1/4 text-left">Pos.</span>
                                        <span className="lg:w-1/4 text-left">Name</span>
                                        <span className="lg:w-1/4 text-left">Nation.</span>
                                        <span className="lg:w-1/4 text-left">Age</span>
                                    </>
                                ) : (
                                    <>
                                        {" "}
                                        <span className="lg:w-1/4 text-left">Position</span>
                                        <span className="lg:w-1/4 text-left">Name</span>
                                        <span className="lg:w-1/4 text-left">Nationality</span>
                                        <span className="lg:w-1/4 text-left">Age</span>
                                    </>
                                )}
                            </div>
                            {squad?.map((player, idx) => {
                                if (player.position) {
                                    return (
                                        <div
                                            className={`flex gap-4 lg:gap-2 justify-between items-center p-3 text-slate-800 ${
                                                idx % 2 === 0 ? "bg-blue-50" : "bg-white"
                                            }`}
                                            key={player.id}
                                        >
                                            <span className="w-1/4 text-left truncate">
                                                {player.position}
                                            </span>
                                            <span className="w-1/4 text-left font-semibold">
                                                {player.name}
                                            </span>
                                            <span className="w-1/4 text-left">
                                                {player.nationality}
                                            </span>
                                            <span className="w-1/4 text-right lg:text-left">
                                                {calculateAge(player.dateOfBirth)}
                                            </span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
}
