import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const BookAppointment = () => {
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');

    useEffect(() => {
        // Retrieve stored data from localStorage
        const data = localStorage.getItem('appointmentData');
        if (data) {
            setAppointmentData(JSON.parse(data));
        }
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(e.target.value);
    };

    const handleContinue = () => {
        if (!selectedDate || !selectedTime) {
            alert('Please select both date and time');
            return;
        }

        // Update appointment data in localStorage with date and time
        const updatedData = {
            ...appointmentData,
            date: selectedDate,
            time: selectedTime,
        };
        localStorage.setItem('appointmentData', JSON.stringify(updatedData));
        navigate('/appointment-preview');
    };

    return (
        <div className="w-full mt-24 flex flex-col items-center">
            <div className="w-1/2 bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-medium mb-4">Select Appointment Time</h1>

                {/* Date Picker */}
                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Select Date</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                    />
                </div>

                {/* Time Picker */}
                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Select Time</label>
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                    />
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleContinue}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Continue to Preview
                </button>
            </div>
        </div>
    );
};

export default BookAppointment;