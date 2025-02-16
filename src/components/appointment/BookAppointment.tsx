import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState(null);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [location, setLocation] = useState<string>('');

    const locations = ['Lekki Ajah VGC', 'Victoria Island'];

    useEffect(() => {
        const data = localStorage.getItem('appointmentData');
        if (data) {
            const parsedData = JSON.parse(data);
            setAppointmentData(parsedData);
            setFullName(parsedData.fullName || '');
            setPhoneNumber(parsedData.phoneNumber || '');
            setEmail(parsedData.email || '');
            setLocation(parsedData.location || '');
            setSelectedDate(parsedData.date || '');
            setSelectedTime(parsedData.time || '');
        }
    }, []);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTime(e.target.value);
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const handleContinue = () => {
        if (!selectedDate || !selectedTime || !fullName || !phoneNumber || !email || !location) {
            alert('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('Please enter a valid phone number');
            return;
        }

        const updatedData = {
            ...(appointmentData || {}),
            fullName,
            phoneNumber,
            email,
            location,
            date: selectedDate,
            time: selectedTime,
        };
        localStorage.setItem('appointmentData', JSON.stringify(updatedData));
        navigate('/appointment-preview');
    };

    return (
        <div className="w-full mt-24 flex flex-col items-center">
            <div className="w-1/2 bg-white p-8 rounded-lg shadow-md max-[650px]:w-full">
                <h1 className="text-2xl font-medium mb-4">Book Appointment</h1>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                        placeholder="Enter your phone number"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Preferred Location</label>
                    <div className="flex flex-col space-y-2">
                        {locations.map((loc) => (
                            <label key={loc} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value={loc}
                                    checked={location === loc}
                                    onChange={handleLocationChange}
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span>{loc}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Select Date</label>
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Select Time</label>
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={handleTimeChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                    />
                </div>

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