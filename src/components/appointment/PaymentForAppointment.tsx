import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, ShieldCheck, Check, User, Activity } from 'lucide-react';
import { completeAppointmentBooking } from '../../admin/services/api-service';
import { useMutation } from 'react-query';

const PayForAppointment = () => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const appointmentData = {
        full_name: "John Smith",
        amount: 85.00,
        address: "123 Main Street, Suite 4, New York, NY 10001",
        phone_number: "(555) 123-4567",
        service_needed: "Physical Therapy Session",
        where_it_hurts: "Lower Back",
        pain_durations: "2 weeks",
        appointment_date: "2025-04-25",
        appointment_time: "10:30 AM",
        email: "john.smith@example.com",
        limitations: "Difficulty bending and sitting for long periods"
    };
    const paymentMutation = useMutation(['PAYFOR_APPOINTMENT'], () => completeAppointmentBooking(id ?? ''), {
        onSuccess: () => {
            setIsProcessing(false);
            localStorage.setItem('appointmentData', JSON.stringify(appointmentData));
            navigate('/appointment-success');
        }
    })

    const handlePaymentSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsProcessing(true);
        paymentMutation.mutate()
    };

    const formatAppointmentDate = () => {
        try {
            return new Date(appointmentData.appointment_date).toLocaleDateString();
        } catch (e) {
            return appointmentData.appointment_date;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[50px]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
                    <p className="mt-2 text-gray-600">Please review your appointment details and provide payment information</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-8">
                            <div className="bg-blue-600 px-6 py-4 text-white">
                                <h2 className="text-xl font-semibold">Appointment Summary</h2>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="flex items-start">
                                    <Activity className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Service</p>
                                        <p className="font-medium">{appointmentData.service_needed}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Calendar className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date & Time</p>
                                        <p className="font-medium">{formatAppointmentDate()} at {appointmentData.appointment_time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{appointmentData.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <User className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Patient</p>
                                        <p className="font-medium">{appointmentData.full_name}</p>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Service Fee</span>
                                    <span className="font-medium">${appointmentData.amount.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Processing Fee</span>
                                    <span className="font-medium">$2.50</span>
                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total</span>
                                    <span className="text-xl font-bold text-blue-700">${(appointmentData.amount + 2.50).toFixed(2)}</span>
                                </div>

                                <div className="mt-4 flex items-center text-sm text-gray-500">
                                    <ShieldCheck className="h-4 w-4 text-blue-500 mr-2" />
                                    <p>Secure payment processing</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="px-6 py-6">
                                <form onSubmit={handlePaymentSubmit}>

                                    <div className="mt-8">
                                        <button
                                            type="submit"
                                            disabled={isProcessing}
                                            className={`w-full py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {isProcessing ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing Payment...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center">
                                                    <CreditCard className="h-5 w-5 mr-2" />
                                                    Pay ${(appointmentData.amount + 2.50).toFixed(2)} Now
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
                                    <div className="flex items-center">
                                        <ShieldCheck className="h-5 w-5 text-blue-500 mr-2" />
                                        <span className="text-sm text-gray-600">Secure Payment</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="h-5 w-5 text-blue-500 mr-2" />
                                        <span className="text-sm text-gray-600">Instant Confirmation</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-5 w-5 text-blue-500 mr-2" />
                                        <span className="text-sm text-gray-600">24/7 Customer Support</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayForAppointment;