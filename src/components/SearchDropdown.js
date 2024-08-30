import { useState, useEffect, useRef } from "react";

export default function SearchDropdown(props) {
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState("Team");
    const dropdownRef = useRef(null);

    const toggleShow = () => {
        setShow(!show);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShow(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        console.log(category);
    }, [category]);

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={toggleShow}
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="max-w-28 min-w-28 flex-shrink-0 z-10 items-center py-2.5 px-3 text-sm font-medium text-center text-gray-600 bg-gray-300 rounded-tl-md hover:bg-gray-400 focus:outline-none dark:bg-gray-400 dark:hover:bg-gray-500 dark:text-white dark:border-gray-950"
                    type="button"
                >
                    {category}{" "}
                    <svg
                        className="w-2.5 h-2.5 inline-block"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>

                {show ? (
                    <div
                        id="dropdown"
                        className="absolute z-10 divide-y divide-gray-100 rounded-sm shadow w-44"
                    >
                        <ul
                            className="px-0 m-0 text-sm text-gray-700"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            <div className="p-2 bg-gray-400">
                                <div>
                                    <li>
                                        <a
                                            onClick={() => {
                                                setCategory("Team");
                                                props.updateSearchFilter("team");
                                                toggleShow();
                                            }}
                                            href="#"
                                            className="rounded-sm block px-4 py-2.5 bg-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-white no-underline"
                                        >
                                            Team
                                        </a>
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <a
                                            onClick={() => {
                                                setCategory("League");
                                                props.updateSearchFilter("competitions");
                                                toggleShow();
                                            }}
                                            href="#"
                                            className="rounded-sm block px-4 py-2.5 bg-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-white no-underline"
                                        >
                                            League
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            onClick={() => {
                                                setCategory("Player");
                                                props.updateSearchFilter("player");
                                                toggleShow();
                                            }}
                                            href="#"
                                            className="rounded-sm block px-4 py-2.5 bg-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-white no-underline"
                                        >
                                            Player
                                        </a>
                                    </li>
                                </div>
                            </div>
                        </ul>
                    </div>
                ) : null}
            </div>
        </>
    );
}
