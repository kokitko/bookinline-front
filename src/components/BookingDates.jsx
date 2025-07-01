import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';

function BookingDates(props) {
    const showCalendar = props.showCalendar;
    const setShowCalendar = props.setShowCalendar;
    const formData = props.formData;
    const setFormData = props.setFormData;

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    function handleDateRangeChange(item) {
        setRange([item.selection]);
        setFormData(prev => ({
            ...prev,
            checkIn: format(item.selection.startDate, 'dd/MM/yyyy'),
            checkOut: format(item.selection.endDate, 'dd/MM/yyyy')
        }));
    }    

    return (
        <>
            {showCalendar && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40"
                    onClick={() => setShowCalendar(false)}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-2xl flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <DateRange
                            editableDateInputs={true}
                            onChange={handleDateRangeChange}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            rangeColors={["#2563eb"]}
                            minDate={new Date()}
                            className="rounded"
                        />
                        <button
                            type="button"
                            className="mt-4 px-8 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={() => setShowCalendar(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default BookingDates;