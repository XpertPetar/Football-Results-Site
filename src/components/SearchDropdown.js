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
                    className="max-w-28 min-w-32 flex-shrink-0 z-10 items-center py-2.5 px-3 text-sm font-medium text-center text-white bg-gray-400 hover:bg-gray-500 rounded-tl-md focus:outline-none"
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
                    <div id="dropdown" className="absolute z-10 shadow w-44">
                        <ul
                            className="px-0 m-0 text-sm text-white"
                            aria-labelledby="dropdownDefaultButton"
                        >
                            <div className="p-2 bg-gray-400 divide-y divide-gray-500 rounded-sm">
                                <li>
                                    <a
                                        onClick={() => {
                                            setCategory("Team");
                                            props.updateSearchFilter("team");
                                            toggleShow();
                                        }}
                                        href="#"
                                        className="rounded-sm block px-4 py-2.5 bg-gray-400 hover:bg-gray-500 text-white no-underline text-left"
                                    >
                                        Team
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={() => {
                                            setCategory("Competition");
                                            props.updateSearchFilter("competitions");
                                            toggleShow();
                                        }}
                                        href="#"
                                        className="rounded-sm block px-4 py-2.5 bg-gray-400 hover:bg-gray-500 text-white no-underline text-left"
                                    >
                                        Competition
                                    </a>
                                </li>
                            </div>
                        </ul>
                    </div>
                ) : null}
            </div>
        </>
    );
}
