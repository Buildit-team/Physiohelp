import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { bookAppointment } from '../../admin/services/api-service';
import { Calendar, Clock, MapPin, Phone, Mail, User, Heart, Activity, AlertCircle } from 'lucide-react';

export interface AppointmentData {
    full_name: string;
    amount: number;
    address: string;
    phone_number: string;
    service_needed: string;
    where_it_hurts: string;
    pain_durations: string;
    appointment_date: string;
    appointment_time: string;
    email: string;
    limitaions: string;
}

const AppointmentPreview = () => {
    const navigate = useNavigate();
    const [appointmentData, setAppointmentData] = useState<AppointmentData>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = localStorage.getItem('appointmentData');
        if (data) {
            setAppointmentData(JSON.parse(data));
        }
        setIsLoading(false);
    }, []);

    const appointmentMutation = useMutation(() => {
        if (appointmentData) {
            return bookAppointment(appointmentData);
        }
        throw new Error('Appointment data is undefined');
    }, {
        onSuccess: () => {
            navigate('/appointment-success');
        },
        onError: (error) => {
            console.error('Booking failed:', error);
            // You could add toast notification here
        }
    });

    const handleConfirm = () => {
        appointmentMutation.mutate();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!appointmentData) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md mx-auto">
                    <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Appointment Data Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find your appointment information. Please try booking again.</p>
                    <button
                        onClick={() => navigate('/book-appointment')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Book New Appointment
                    </button>
                </div>
            </div>
        );
    }

    // Format date properly - handle potential invalid date
    const formatAppointmentDate = () => {
        try {
            return new Date(appointmentData.appointment_date).toLocaleDateString();
        } catch (e) {
            return appointmentData.appointment_date;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[50px]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Appointment Preview</h1>
                    <p className="mt-2 text-gray-600">Please review your appointment details before confirming</p>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-blue-600 px-6 py-4 text-white">
                        <h2 className="text-xl max-[650px]:text-[14px] font-semibold flex items-center">
                            <Activity className="mr-2 h-5 w-5" />
                            {appointmentData.service_needed}
                        </h2>
                        <p className="mt-1 flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            {formatAppointmentDate()} at {appointmentData.appointment_time}
                        </p>
                    </div>
                    <div className="bg-blue-50 px-6 py-3 border-b border-blue-100">
                        <div className="flex justify-between items-center">
                            <span className="font-medium text-blue-800">Service Fee</span>
                            <span className="text-xl font-bold text-blue-800">${appointmentData?.amount?.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="px-6 py-6 space-y-6">
                        <div className="rounded-lg bg-gray-50 p-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <Heart className="mr-2 h-5 w-5 text-red-500" />
                                Medical Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Pain Location</p>
                                    <p className="font-medium">{appointmentData.where_it_hurts}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Duration</p>
                                    <p className="font-medium">{appointmentData.pain_durations}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-sm text-gray-500">Limitations</p>
                                    <p className="font-medium">{appointmentData.limitaions}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Information</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <User className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Full Name</p>
                                        <p className="font-medium">{appointmentData.full_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone Number</p>
                                        <p className="font-medium">{appointmentData.phone_number}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{appointmentData.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{appointmentData.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-blue-50 p-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                                <Clock className="mr-2 h-5 w-5 text-blue-500" />
                                Appointment Time
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-medium">{formatAppointmentDate()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Time</p>
                                    <p className="font-medium">{appointmentData.appointment_time}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-6 py-3 rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex-1 max-w-xs mx-auto sm:mx-0"
                        >
                            Back to Selection
                        </button>
                        <button
                            onClick={handleConfirm}
                            disabled={appointmentMutation.isLoading}
                            className={`px-6 py-3 rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex-1 max-w-xs mx-auto sm:mx-0 ${appointmentMutation.isLoading ? 'opacity-75 cursor-not-allowed' : ''
                                }`}
                        >
                            {appointmentMutation.isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                'Confirm Booking'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentPreview;