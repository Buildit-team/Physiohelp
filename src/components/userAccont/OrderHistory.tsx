import { useGetCustomerActivity } from '../../hooks/useGetCustomerActivity';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

const OrderHistory = () => {
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

    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return format(date, 'MMMM d, yyyy');
        } catch (e) {
            return dateString;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'text-green-600';
            case 'abandoned':
                return 'text-red-600';
            default:
                return 'text-yellow-600';
        }
    };

    if (data.orders.length === 0) {
        return (
            <div className="px-4 py-8">
                <h1 className="text-2xl font-bold mb-8">Orders History</h1>
                <div className="text-center text-gray-500 py-8">No orders found</div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Orders History</h1>

            {isMobile && (
                <div className="space-y-4">
                    {data.orders.map((order) => (
                        <div
                            key={order.order_id}
                            className="border rounded-lg p-4 shadow-sm"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="font-medium text-gray-700">#{order.order_track_id}</div>
                                <span className={`capitalize font-medium ${getStatusColor(order.order_status)}`}>
                                    {order.order_status}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <div>{formatDate(order.created_at)}</div>
                                <div className="font-medium">{formatPrice(order.total_price)}</div>
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
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Number ID</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Dates</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700">Price</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {data.orders.map((order) => (
                                <tr key={order.order_id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">{order.order_track_id}</td>
                                    <td className="py-3 px-4">{formatDate(order.created_at)}</td>
                                    <td className="py-3 px-4">
                                        <span className={`capitalize ${getStatusColor(order.order_status)}`}>
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-right">{formatPrice(order.total_price)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;