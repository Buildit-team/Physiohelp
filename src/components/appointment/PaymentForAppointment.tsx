import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, MapPin, CreditCard, ShieldCheck, Check, User, Activity } from 'lucide-react';
import { completeAppointmentBooking, getSeesionData } from '../../admin/services/api-service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface SessionData {
    session_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    assignee: string | null;
    number_of_times: number;
    service_needed: string;
    where_it_hurts: string;
    customer_id: string;
    admin_id: string | null;
    session_status: string;
    limitaions: string;
    pain_durations: string;
    amount: string;
    price: {
        client_amount: string;
        build_it_amount: number;
    };
    appointment_time: string;
    appointment_date: string;
    discount: string;
    created_at: string;
    updated_at: string;
}

const PayForAppointment = () => {
    const queryClient = useQueryClient()
    const { id } = useParams();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [appointmentData, setAppointmentData] = useState<SessionData>();
    const [iframeUrl, setIframeUrl] = useState<string | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<{
        status: 'idle' | 'processing' | 'success' | 'failed' | 'closed';
        message?: string;
        data?: any;
    }>({ status: 'idle' });

    useQuery(['APPOINTMENT_DATA'], async () => {
        return await getSeesionData(id ?? '');
    }, {
        onSuccess: (data) => {
            setAppointmentData(data);
        }
    });

    const paymentMutation = useMutation(['PAYFOR_APPOINTMENT'], () => completeAppointmentBooking(id ?? ''), {
        onSuccess: (data) => {
            setIsProcessing(false);
            const checkoutUrl = data.data.checkout_url;
            setIframeUrl(checkoutUrl);
            setPaymentStatus({ status: 'processing', message: 'Launching payment modal...' });
        },
        onError: (error) => {
            console.error("Payment initialization failed:", error);
            setIsProcessing(false);
            setPaymentStatus({
                status: 'failed',
                message: 'There was a problem initializing your payment. Please try again.'
            });
        }
    });

    useEffect(() => {
        const handlePaymentEvent = (event: MessageEvent | CustomEvent) => {
            if (event.type === 'message') {
                const rawData = (event as MessageEvent).data;
                try {
                    const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

                    if (parsedData && parsedData.result) {
                        processPaymentResult(parsedData.result);
                    }
                } catch (err) {
                    console.error('Failed to parse payment message:', err);
                }
            }
        };

        const processPaymentResult = (result: string) => {
            switch (result) {
                case 'success':
                    navigate('/appointment-payment-success')
                    localStorage.removeItem('appointmentData');
                    queryClient.invalidateQueries('customerActivity');
                    break;
                case 'failed':
                    setPaymentStatus({
                        status: 'failed',
                        message: 'Payment failed. Please try again.'
                    });
                    setIframeUrl(null);
                    break;
                case 'close':
                    setIframeUrl(null);
                    setPaymentStatus({ status: 'closed', message: 'Payment window was closed.' });
                    break;
                case 'pending':
                    setPaymentStatus({
                        status: 'processing',
                        message: 'Payment is being processed...'
                    });
                    break;
            }
        };

        ['success', 'failed', 'pending', 'close'].forEach(eventType => {
            window.addEventListener(eventType, (event) => handlePaymentEvent(event as MessageEvent | CustomEvent));
        });

        window.addEventListener('message', handlePaymentEvent);

        return () => {
            ['success', 'failed', 'pending', 'close'].forEach(eventType => {
                window.removeEventListener(eventType as string, handlePaymentEvent as EventListener);
            });
            window.removeEventListener('message', handlePaymentEvent);
        };
    }, []);

    const handlePaymentSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setIsProcessing(true);
        paymentMutation.mutate();
    };

    const formatAppointmentDate = () => {
        try {
            return appointmentData?.appointment_date ? new Date(appointmentData.appointment_date).toLocaleDateString() : 'Invalid Date';
        } catch (e) {
            return appointmentData?.appointment_date;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-[50px]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
                    <p className="mt-2 text-gray-600">Please review your appointment details and provide payment information</p>
                </div>

                {/* Payment Status Overlay */}
                {paymentStatus.status !== 'idle' && paymentStatus.status !== 'processing' && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                            {paymentStatus.status === 'success' && (
                                <>
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-green-600">Payment Successful!</h3>
                                    <p className="text-gray-600 mb-4">{paymentStatus.message}</p>
                                    <p className="text-sm text-gray-500 mb-4">Reference: {paymentStatus.data?.reference}</p>
                                    <button
                                        onClick={() => navigate('/appointment-success')}
                                        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Continue
                                    </button>
                                </>
                            )}

                            {paymentStatus.status === 'failed' && (
                                <>
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-red-600">Payment Failed</h3>
                                    <p className="text-gray-600 mb-4">{paymentStatus.message}</p>
                                    {paymentStatus.data?.reference && (
                                        <p className="text-sm text-gray-500 mb-4">Reference: {paymentStatus.data.reference}</p>
                                    )}
                                    <button
                                        onClick={() => setPaymentStatus({ status: 'idle' })}
                                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Try Again
                                    </button>
                                </>
                            )}

                            {paymentStatus.status === 'closed' && (
                                <>
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Payment Window Closed</h3>
                                    <p className="text-gray-600 mb-4">{paymentStatus.message}</p>
                                    <button
                                        onClick={() => setPaymentStatus({ status: 'idle' })}
                                        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Try Again
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

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
                                        <p className="font-medium">{appointmentData?.service_needed}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Calendar className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Date & Time</p>
                                        <p className="font-medium">{formatAppointmentDate()} at {appointmentData?.appointment_time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="font-medium">{appointmentData?.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <User className="h-5 w-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm text-gray-500">Patient</p>
                                        <p className="font-medium">{appointmentData?.full_name}</p>
                                    </div>
                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Service Fee</span>
                                    <span className="font-medium">₦{appointmentData?.amount}</span>
                                </div>
                                <hr className="my-4" />

                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Total</span>
                                    <span className="text-xl font-bold text-blue-700">₦{appointmentData?.amount}</span>
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
                                            className={`w-full py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
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
                                                    Pay ₦{appointmentData?.amount} Now
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

            {/* Payment iframe modal */}
            {iframeUrl && (
                <div className="fixed w-full inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white w-[70%] h-[90vh] rounded-lg shadow-lg max-[650px]:w-full max-[650px]:h-full">
                        <iframe
                            src={iframeUrl}
                            title="Payment"
                            allow="payment"
                            width="100%"
                            height="100%"
                            onLoad={() => console.log("Payment iframe loaded")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PayForAppointment;