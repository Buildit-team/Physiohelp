import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, CheckCircle} from 'lucide-react';
import type { AppointmentData } from './AppointmentPreview';

const AppointmentSuccess = () => {
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState<AppointmentData>();

    useEffect(() => {
        const data = localStorage.getItem('appointmentData');
        if (data) {
            setAppointmentData(JSON.parse(data));
        }
    }, []);

    const formatAppointmentDate = () => {
        if (!appointmentData?.appointment_date) return '';

        try {
            return new Date(appointmentData.appointment_date).toLocaleDateString();
        } catch (e) {
            return appointmentData.appointment_date;
        }
    };

    if (!appointmentData) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
                    <CheckCircle className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Appointment Confirmed</h2>
                    <p className="text-gray-600 mb-6">Your appointment has been successfully booked, but we couldn't retrieve the details.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[50px]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <div className="bg-blue-100 rounded-full p-3 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                        <CheckCircle className="h-12 w-12 text-blue-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Booking Successful!</h1>
                    <p className="mt-2 text-gray-600">Your appointment has been confirmed. We look forward to seeing you!</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-blue-500 px-6 py-4 text-white">
                        <h2 className="text-xl font-semibold flex items-center">
                            <CheckCircle className="mr-2 h-5 w-5" />
                            Appointment Confirmed
                        </h2>
                        <p className="mt-1 flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {formatAppointmentDate()} at {appointmentData.appointment_time}
                        </p>
                    </div>

                    <div className="px-6 py-6 space-y-6">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                                Service Information
                            </h3>
                            <div>
                                <p className="text-sm text-gray-500">Service Type</p>
                                <p className="font-medium">{appointmentData.service_needed}</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Appointment Details</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium">{appointmentData.full_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{appointmentData.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date</p>
                                        <p className="font-medium">{formatAppointmentDate()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Time</p>
                                        <p className="font-medium">{appointmentData.appointment_time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-blue-50 p-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">
                                What's Next
                            </h3>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">1</span>
                                    <span>You'll receive a confirmation email at <span className="font-medium">{appointmentData.email}</span></span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">2</span>
                                    <span>We'll send a reminder 24 hours before your appointment</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-800 mr-2 flex-shrink-0">3</span>
                                    <span>Please arrive 15 minutes before your scheduled time</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <button
                            onClick={() => {
                                navigate('/')
                                localStorage.removeItem('appointmentData');
                            }}
                            className="flex items-center justify-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
                        >
                            Return Home
                        </button>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-500 text-sm">
                    <p>Need to make changes? Please contact us at least 24 hours before your appointment.</p>
                    <p className="mt-1">Call us: <span className="font-medium">1-800-XXX-XXXX</span></p>
                </div>
            </div>
        </div>
    );
};

export default AppointmentSuccess;