export default function SearchSuggestions({ suggestions, onSuggestionClick }) {
    if (!suggestions) return null;

    return (
        <div className="absolute bg-gray-400 w-96 top-12 right-20 mr-1 shadow-lg rounded-b-lg mt-1 z-50">
            <ul className="list-none p-0 m-0">
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        onClick={() => onSuggestionClick(suggestion)}
                        className="p-2 cursor-pointer hover:bg-gray-500"
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        </div>
    );
}
