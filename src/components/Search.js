import { useEffect, useState } from "react";
import SearchSuggestions from "./SearchSuggestions";
import SearchDropdown from "./SearchDropdown";
import { useNavigate } from "react-router-dom";
import { competitionsDictionary, teamsDictionary } from "../Global.js";

export default function Search() {
    const [input, setInput] = useState("");
    const [searchFilter, setSearchFilter] = useState("team");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (input) {
            const currentDictionary =
                searchFilter === "competitions" ? competitionsDictionary : teamsDictionary;
            const filteredSuggestions = Object.keys(currentDictionary).filter((name) =>
                name.toLowerCase().includes(input.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [input, searchFilter]);

    const handleSubmit = (suggestion = input) => {
        if (searchFilter === "competitions") {
            const competition = Object.keys(competitionsDictionary).find((name) =>
                name.toLowerCase().includes(suggestion.toLowerCase())
            );
            if (competition) {
                const competitionId = competitionsDictionary[competition];
                navigate(`/${searchFilter}/${competitionId}?name=${competition}`);
            }
        } else if (searchFilter === "team") {
            const team = Object.keys(teamsDictionary).find((name) =>
                name.toLowerCase().includes(suggestion.toLowerCase())
            );
            if (team) {
                const teamId = teamsDictionary[team];
                navigate(`/${searchFilter}/${teamId}`);
            }
        }

        setInput("");
    };

    function updateSearchFilter(newValue) {
        setSearchFilter(newValue);
    }

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion);
        handleSubmit(suggestion);
    };

    return (
        <div className="relative flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
                className="max-w-lg mx-auto"
            >
                <div className="flex items-center">
                    <SearchDropdown updateSearchFilter={updateSearchFilter} />

                    <div className="relative md:min-w-96 lg:min-w-96 xl:min-w-96 2xl:w-96 sm:max-w-48">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="search"
                            id="search"
                            className="block p-2.5 w-full z-20 text-sm text-gray-800 bg-white rounded-e-lg focus:!border-purple-500 focus:!ring-purple-500 focus:bg-gray-200 placeholder-gray-800"
                            placeholder="Search"
                            required
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white rounded-tr-md bg-slate-600 hover:bg-slate-500 focus:outline-none focus:border-gray-500"
                        >
                            <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </div>
                </div>

                {/* Include SearchSuggestions below the input field */}
                <SearchSuggestions
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                />
            </form>
        </div>
    );
}
