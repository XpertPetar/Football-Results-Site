import { corsProxyUrl } from "../Global";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { differenceInYears } from "date-fns";

export default function Team() {
    const { id } = useParams();
    const [team, setTeam] = useState();
    const [squad, setSquad] = useState();

    useEffect(() => {
        const url = `${corsProxyUrl}api/teams/${id}`;

        fetch(url, {
            method: "GET"
        })
            .then((response) => {
                console.log(response.status);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setTeam(data);
                setSquad(data.squad);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    function calculateAge(dateOfBirth) {
        return differenceInYears(new Date(), new Date(dateOfBirth));
    }

    return (
        <>
            {team ? (
                <div>
                    <div className="flex justify-center">
                        <h1 className="text-2xl font-bold my-8 ml-2 inline-block">{team.name}</h1>
                    </div>
                    <div className="flex gap-5 justify-between my-8 bg-gray-100 rounded-full py-8">
                        <div className="w-1/2 p-5 inline-flex items-center justify-end">
                            <img src={team.crest} className="inline-block w-32 h-32"></img>
                        </div>
                        <div className="w-1/2 border-l-2 border-slate-400 p-5">
                            <h3 className="text-xl font-bold mb-3">General Info</h3>
                            <div className="pl-2">
                                <p className="inline-block my-2">Founded: {" " + team.founded}</p>
                                <br></br>
                                <p className="inline-block my-2">
                                    Nation: {" " + team.area.name + " "}
                                </p>
                                <img
                                    src={team.area.flag}
                                    className="w-8 h-8 ml-2 inline-block"
                                ></img>
                                <br></br>
                                <p className="inline-block my-2">
                                    Competiton: {" " + team.runningCompetitions[0].name}
                                </p>
                                <img
                                    src={team.runningCompetitions[0].emblem}
                                    className="w-8 h-8 ml-2 inline-block"
                                ></img>
                                <br></br>
                                <p className="inline-block my-2">
                                    Club colors: {" " + team.clubColors}
                                </p>
                                <br></br>
                                <p className="inline-block my-2">Stadium: {" " + team.venue}</p>
                                <br></br>
                                <p className="inline-block my-2">
                                    Coach: {" " + team.coach.name + " "}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full border-l-2 border-slate-400 p-5">
                        <h3 className="text-xl font-bold mb-3">Squad</h3>
                        <div>
                            {squad?.map((player, idx) => {
                                if (player.position) {
                                    return (
                                        <div
                                            className={`flex justify-between items-center p-3 text-slate-800 ${
                                                idx % 2 === 0 ? "bg-slate-200" : "bg-slate-50"
                                            }`}
                                            key={player.id}
                                        >
                                            <span className="w-1/4 text-left">
                                                {player.position}
                                            </span>
                                            <span className="w-1/4 text-left font-semibold">
                                                {player.name}
                                            </span>
                                            <span className="w-1/4 text-left">
                                                {player.nationality}
                                            </span>
                                            <span className="w-1/4 text-left">
                                                {"Age: " + calculateAge(player.dateOfBirth)}
                                            </span>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
