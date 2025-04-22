import { useGetCustomerActivity } from '../../hooks/useGetCustomerActivity';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

const UserAppointment = () => {
    const [isMobile, setIsMobile] = useState(false);
    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetCustomerActivity();

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 640);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;
    if (!data) return <div>No data available</div>;

    const formatPrice = (price: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'NGN',
        }).format(parseFloat(price));
    };

    const formatDate = (dateString: string | number | Date) => {
        try {
            const date = new Date(dateString);
            return format(date, 'MMM d, yyyy');
        } catch (e) {
            return String(dateString);
        }
    };

    const formatTime = (dateString: string | number | Date) => {
        try {
            const date = new Date(dateString);
            return format(date, 'h:mm a');
        } catch (e) {
            return String(dateString);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
            case 'active':
                return 'text-green-600';
            case 'abandoned':
                return 'text-red-600';
            case 'pending':
                return 'text-yellow-600';
            default:
                return '';
        }
    };

    if (data?.sessions?.length === 0) {
        return (
            <div className="px-4 py-8">
                <h1 className="text-2xl font-bold mb-8">Appointment History</h1>
                <div className="text-center text-gray-500 py-8">No appointments found</div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Appointment History</h1>

            {isMobile && (
                <div className="space-y-4">
                    {data?.sessions?.map((appointment) => (
                        <div
                            key={appointment.session_id}
                            className="border rounded-lg p-4 shadow-sm"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="font-medium">{formatDate(appointment.appointment_date)}</div>
                                <span className={`capitalize font-medium ${getStatusColor(appointment.session_status)}`}>
                                    {appointment.session_status}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <div>{formatTime(appointment.appointment_time)}</div>
                                <div className="font-medium">{formatPrice(appointment.amount)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isMobile && (
                <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Appointment Date</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Appointment Time</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {data?.sessions?.map((appointment) => (
                                <tr key={appointment.session_id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{formatDate(appointment.appointment_date)}</td>
                                    <td className="py-3 px-4">{formatTime(appointment.appointment_time)}</td>
                                    <td className="py-3 px-4">
                                        <span className={`capitalize ${getStatusColor(appointment.session_status)}`}>
                                            {appointment.session_status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">{formatPrice(appointment.amount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserAppointment;