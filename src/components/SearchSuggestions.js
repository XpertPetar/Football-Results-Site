import { useState, useEffect, useRef } from "react";

export default function SearchSuggestions({ suggestions, onSuggestionClick }) {
    const [show, setShow] = useState(false);
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
        if (suggestions.length > 0) setShow(true);
    }, [suggestions]);

    if (!suggestions) return null;

    return (
        <>
            {show ? (
                <div
                    className="absolute bg-gray-800 bg-opacity-95 w-80 lg:w-96 lg:top-12 lg:right-20 lg:mr-4 shadow-lg rounded-b-lg lg:mt-1 z-50 "
                    ref={dropdownRef}
                >
                    <ul className="list-none p-0 m-0 relative w-full">
                        {suggestions.map((suggestion, index) => (
                            <>
                                {index < 5 ? (
                                    <li
                                        key={index}
                                        onClick={() => onSuggestionClick(suggestion)}
                                        className="p-2 cursor-pointer hover:bg-gray-500 hover:rounded-b-lg"
                                    >
                                        {suggestion}
                                    </li>
                                ) : null}
                            </>
                        ))}
                    </ul>
                </div>
            ) : null}
        </>
    );
}
