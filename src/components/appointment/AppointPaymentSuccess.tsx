import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AppointmentPaymentSuccess = () => {
    const navigate = useNavigate();
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-[80px]">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                    <div className="bg-blue-500 py-6 px-8 text-center">
                        <div className="mx-auto h-16 w-16 bg-white rounded-full flex items-center justify-center mb-4">
                            <svg
                                className="h-10 w-10 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-extrabold text-white">
                            Appointment Confirmed!
                        </h2>
                        <p className="mt-2 text-white opacity-90">
                            Your appointment has been successfully booked
                        </p>
                    </div>

                    {/* Appointment Details */}
                    <div className="py-6 px-8">
                        <div className="border-b border-gray-200 pb-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Appointment Summary
                            </h3>
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-sm text-gray-600">Booking Date</div>
                                <div className="text-sm font-medium text-gray-900">
                                    {currentDate}
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-sm text-gray-600">Payment Status</div>
                                <div className="text-sm font-medium text-green-600">
                                    Completed
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">
                                What's Next?
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-800">
                                        <span className="text-sm font-medium">1</span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Appointment Preparation</span> - Our healthcare professional will review your information before your appointment.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-800">
                                        <span className="text-sm font-medium">2</span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-medium">Reminder</span> - You'll
                                            receive a notification 24 hours before your scheduled appointment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
                            >
                                Go Back Home
                            </button>
                            <button
                                onClick={() => navigate("/user/account/appointments")}
                                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
                            >
                                View All Appointments
                            </button>
                        </div>
                    </div>
                    {/* <div className="bg-gray-50 py-4 px-8 flex items-center justify-between border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            Need to reschedule your appointment?
                        </div>
                        <button
                            onClick={() => navigate("/contact")}
                            className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                            Contact Support
                        </button>
                    </div> */}
                </motion.div>
            </div>
        </div>
    );
};

export default AppointmentPaymentSuccess;