import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUrl, apiKey, corsProxyUrl } from "../Global";

export default function Competition() {
    const [competition, setCompetition] = useState();
    const [teams, setTeams] = useState();
    const { id } = useParams();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const leagueName = query.get("name");

    useEffect(() => {
        const url = `${corsProxyUrl}api/competitions/${id}/standings/`;
        console.log(url);
        fetch(url, {
            method: "GET"
        })
            .then((response) => {
                console.log(response.status);
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setCompetition(data);
                setTeams(data.standings[0].table);
                console.log(data.standings[0].table);
            })
            .catch((error) => console.error("Fetch error:", error));
    }, []);

    return (
        <>
            <h1 className="text-center text-2xl font-bold my-8">{leagueName}</h1>
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-slate-700 text-white text-sm font-semibold">
                    <tr>
                        <th className="py-3 px-4 text-left">Position</th>
                        <th className="py-3 px-4 text-left">Team</th>
                        <th className="py-3 px-4 text-left">P</th>
                        <th className="py-3 px-4 text-left">W</th>
                        <th className="py-3 px-4 text-left">D</th>
                        <th className="py-3 px-4 text-left">L</th>
                        <th className="py-3 px-4 text-left">GF</th>
                        <th className="py-3 px-4 text-left">GA</th>
                        <th className="py-3 px-4 text-left">GD</th>
                        <th className="py-3 px-4 text-left">Pts</th>
                    </tr>
                </thead>
                <tbody>
                    {teams?.map((team, idx) => {
                        return (
                            <tr
                                key={idx + 1}
                                className={idx % 2 === 0 ? "bg-slate-200" : "bg-slate-50"}
                            >
                                <td className="py-3 px-4 text-base text-gray-600 font-bold pl-10">
                                    {idx + 1}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    <img
                                        src={team.team.crest}
                                        className="inline-block w-8 h-8 mr-5"
                                    ></img>{" "}
                                    {team.team.name}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    {team.playedGames}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">{team.won}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{team.draw}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{team.lost}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{team.goalsFor}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    {team.goalsAgainst}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">
                                    {team.goalDifference}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-600">{team.points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
