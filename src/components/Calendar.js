import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";

export default function Calendar({ selectedDate, onDateChange }) {
    const datePickerRef = useRef(null);

    const handleDateChange = (date) => {
        if (date) {
            onDateChange(format(date, "yyyy-MM-dd"));
        }
    };

    const handleIconClick = () => {
        datePickerRef.current.setFocus();
    };

    return (
        <div className="relative">
            <DatePicker
                ref={datePickerRef}
                selected={selectedDate ? selectedDate : null}
                placeholderText="Choose a date"
                onChange={(date) => handleDateChange(date)}
                dateFormat="dd/MM/yyyy"
                className="block w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
            />
            <button
                type="button"
                onClick={handleIconClick}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
            >
                <FaCalendarAlt size={20} />
            </button>
        </div>
    );
}
