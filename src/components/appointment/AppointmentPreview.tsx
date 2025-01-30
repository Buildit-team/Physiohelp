import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentPreview = () => {
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState<any>(null);

    useEffect(() => {
        const data = localStorage.getItem('appointmentData');
        if (data) {
            setAppointmentData(JSON.parse(data));
        }
    }, []);

    const handleConfirm = () => {
        console.log('Final Booking Details:', appointmentData);
        alert('Appointment booked successfully!');
        localStorage.removeItem('appointmentData');
        navigate('/booking-confirmation');
    };

    if (!appointmentData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full mt-24 flex flex-col items-center">
            <div className="w-1/2 bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-medium mb-6">Review Your Appointment</h1>

                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <h2 className="text-xl text-blue-600 mb-2">Selected Services</h2>
                        <p className="text-gray-700">{appointmentData.services}</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-xl text-blue-600 mb-2">Medical Details</h2>
                        <p className="text-gray-700"><strong>Pain Location:</strong> {appointmentData.painLocation}</p>
                        <p className="text-gray-700"><strong>Limitations:</strong> {appointmentData.limitation}</p>
                        <p className="text-gray-700"><strong>Pain Duration:</strong> {appointmentData.painDuration}</p>
                    </div>

                    <div className="border-b pb-4">
                        <h2 className="text-xl text-blue-600 mb-2">Appointment Time</h2>
                        <p className="text-gray-700"><strong>Date:</strong> {new Date(appointmentData.date).toLocaleDateString()}</p>
                        <p className="text-gray-700"><strong>Time:</strong> {appointmentData.time}</p>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-[30px]">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-[200px] h-[40px] border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Back to Selection
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="w-[200px] h-[40px] border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AppointmentPreview;