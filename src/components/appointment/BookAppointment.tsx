import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState(null);
    const [appointment_date, setSelectedDate] = useState<string>('');
    const [appointment_time, setSelectedTime] = useState<string>('');
    const [full_name, setFullName] = useState<string>('');
    const [phone_number, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setLocation] = useState<string>('');



    useEffect(() => {
        const data = localStorage.getItem('appointmentData');
        if (data) {
            const parsedData = JSON.parse(data);
            setAppointmentData(parsedData);
            setFullName(parsedData.full_name || '');
            setPhoneNumber(parsedData.phone_number || '');
            setEmail(parsedData.email || '');
            setLocation(parsedData.address || '');
            setSelectedDate(parsedData.appointment_date || '');
            setSelectedTime(parsedData.appointment_time || '');
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
        if (!appointment_date || !appointment_time || !full_name || !phone_number || !email || !address) {
            alert('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(phone_number)) {
            alert('Please enter a valid phone number');
            return;
        }

        const updatedData = {
            ...(appointmentData || {}),
            full_name,
            phone_number,
            email,
            address,
            appointment_date: appointment_date,
            appointment_time: appointment_time,
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
                        value={full_name}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        value={phone_number}
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
                    <label className="block text-xl text-blue-600 mb-2"> Address</label>
                    <div className="flex flex-col space-y-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={address}
                                onChange={handleLocationChange}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                                placeholder='Where is your location'
                            />
                        </label>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Select Date</label>
                    <input
                        type="date"
                        value={appointment_date}
                        onChange={handleDateChange}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-gray-300"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-xl text-blue-600 mb-2">Select Time</label>
                    <input
                        type="time"
                        value={appointment_time}
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