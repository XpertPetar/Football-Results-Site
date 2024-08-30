import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUrl, apiKey, corsProxyUrl } from "../Global";
import { Link } from "react-router-dom";

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
                        <th className="py-3 px-4 text-left" title="Played">
                            P
                        </th>
                        <th className="py-3 px-4 text-left" title="Wins">
                            W
                        </th>
                        <th className="py-3 px-4 text-left" title="Draws">
                            D
                        </th>
                        <th className="py-3 px-4 text-left" title="Losses">
                            L
                        </th>
                        <th className="py-3 px-4 text-left hidden lg:table-cell" title="Goals For">
                            GF
                        </th>
                        <th
                            className="py-3 px-4 text-left hidden lg:table-cell"
                            title="Goals Against"
                        >
                            GA
                        </th>
                        <th
                            className="py-3 px-4 text-left hidden lg:table-cell"
                            title="Goal Difference"
                        >
                            GD
                        </th>
                        <th className="py-3 px-4 text-left" title="Points">
                            Pts
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {teams?.map((team, idx) => (
                        <tr
                            key={idx + 1}
                            className={idx % 2 === 0 ? "bg-slate-200" : "bg-slate-50"}
                        >
                            <td className="py-3 px-4 text-base text-gray-600 font-bold pl-10">
                                {idx + 1 + "."}
                            </td>
                            <Link to={`/team/${team.team.id}`}>
                                <td className="py-3 px-4 text-sm text-gray-600 hover:text-blue-600 hover:underline underline-offset-2">
                                    <img
                                        src={team.team.crest}
                                        className="inline-block w-8 h-8 mr-5"
                                        alt={`${team.team.name} crest`}
                                    />{" "}
                                    {window.innerWidth < 1200
                                        ? team.team.shortName
                                        : team.team.name}
                                </td>
                            </Link>
                            <td className="py-3 px-4 text-sm text-gray-600">{team.playedGames}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{team.won}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{team.draw}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">{team.lost}</td>
                            <td className="py-3 px-4 text-sm text-gray-600 hidden lg:table-cell">
                                {team.goalsFor}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600 hidden lg:table-cell">
                                {team.goalsAgainst}
                            </td>
                            <td className="py-3 px-4 text-sm text-gray-600 hidden lg:table-cell">
                                {team.goalDifference}
                            </td>
                            <td className="py-3 px-4 text-base text-gray-600 font-bold">
                                {team.points}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
