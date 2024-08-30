import { Link, useParams } from "react-router-dom";

const Fixtures = ({ matches = [] }) => {
    const { id } = useParams();

    function matchOutcome(match) {
        if (match.score.winner === "DRAW") {
            return "draw";
        } else if (match.score.winner === "AWAY_TEAM" && match.awayTeam.id === parseInt(id)) {
            return "win";
        } else if (match.score.winner === "HOME_TEAM" && match.homeTeam.id === parseInt(id)) {
            return "win";
        } else if (match.score.winner !== null) {
            return "lost";
        }
    }

    function getMatchCardClass(match) {
        const outcome = matchOutcome(match);
        switch (outcome) {
            case "win":
                return "bg-green-200";
            case "draw":
                return "bg-yellow-200";
            case "lost":
                return "bg-red-200";
            default:
                return "bg-white";
        }
    }

    return (
        <div className="overflow-x-auto">
            <div className="flex space-x-2 divide-x py-2 relative">
                {matches ? (
                    matches.map((match) => (
                        <div
                            key={match.id}
                            className={`w-52 h-48 p-4 flex-shrink-0 flex flex-col gap-2 justify-center items-start rounded-md relative ${getMatchCardClass(
                                match
                            )}`}
                        >
                            <div className="absolute text-sm top-2 left-2 p-2 bg-white bg-opacity-80 rounded-md shadow-md">
                                {"Matchday " + match.matchday}
                            </div>

                            <div className="w-full flex items-center gap-2 relative mt-10">
                                <Link
                                    to={`/team/${match.homeTeam.id}`}
                                    className="flex items-center space-x-2 hover:text-blue-600 hover:underline underline-offset-2"
                                >
                                    <img
                                        src={match.homeTeam.crest}
                                        alt={match.homeTeam.shortName}
                                        className="w-10 h-10"
                                    />
                                    <span className="text-sm font-semibold">
                                        {match.homeTeam.shortName}
                                    </span>
                                </Link>
                                <span className="text-lg font-semibold ml-5 absolute right-0">
                                    {match.score.fullTime.home}
                                </span>
                            </div>
                            <div className="w-full flex items-center gap-2 mt-2 relative">
                                <Link
                                    to={`/team/${match.awayTeam.id}`}
                                    className="flex items-center space-x-2 hover:text-blue-600 hover:underline underline-offset-2"
                                >
                                    <img
                                        src={match.awayTeam.crest}
                                        alt={match.awayTeam.shortName}
                                        className="w-10 h-10"
                                    />
                                    <span className="text-sm font-semibold">
                                        {match.awayTeam.shortName}
                                    </span>
                                </Link>
                                <span className="text-lg font-semibold ml-5 absolute right-0">
                                    {match.score.fullTime.away}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No fixtures available</p>
                )}
            </div>
        </div>
    );
};

export default Fixtures;
