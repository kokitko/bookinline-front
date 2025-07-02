import React, { useState, useMemo } from 'react';
import { DateRange } from 'react-date-range';
import { format, addDays, parseISO } from 'date-fns';

function expandBookedDates(bookedRanges) {
    const disabled = [];
    bookedRanges.forEach(({ checkInDate, checkOutDate }) => {
        let current = parseISO(checkInDate);
        const end = parseISO(checkOutDate);
        while (current < end) {
            disabled.push(new Date(current));
            current = addDays(current, 1);
        }
    });
    return disabled;
}

function BookingDates(props) {
    const { showCalendar, setShowCalendar, formData, setFormData, bookedDates = [] } = props;

    const disabledDates = useMemo(() => expandBookedDates(bookedDates), [bookedDates]);

    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    function handleDateRangeChange(item) {
        const { startDate, endDate } = item.selection;
        let safeEndDate = endDate;
        if (
            startDate &&
            endDate &&
            (endDate <= startDate)
        ) {
            safeEndDate = addDays(startDate, 1);
        }
        setRange([{
            startDate,
            endDate: safeEndDate,
            key: 'selection'
        }]);
        setFormData(prev => ({
            ...prev,
            checkIn: format(startDate, 'dd/MM/yyyy'),
            checkOut: format(safeEndDate, 'dd/MM/yyyy')
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
                            disabledDates={disabledDates}
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