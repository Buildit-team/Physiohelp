// src/components/OrderCard.tsx

import React from 'react';
import { Order } from '../../../interface/dashboard';

interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const getProductImage = () => {
        switch (order.image) {
            case 'chair-black':
                return (
                    <div className="w-10 h-10 bg-gray-800 rounded flex items-center justify-center"></div>
                );
            case 'chair-controller':
                return (
                    <div className="w-10 h-6 bg-gray-200 rounded flex items-center justify-center"></div>
                );
            case 'chair-round':
                return (
                    <div className="w-10 h-5 bg-gray-700 rounded-full"></div>
                );
            default:
                return <div className="w-10 h-10 bg-gray-300 rounded"></div>;
        }
    };

    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                    {getProductImage()}
                </div>
                <div>
                    <div className="font-medium">{order.product}</div>
                    <div className="text-sm text-gray-600">₦{order.price.toLocaleString()}.00 x 1</div>
                </div>
            </div>
            <div className="text-right">
                <div className="text-sm text-gray-500">{order.date}</div>
                <div
                    className={`text-xs mt-1 px-3 py-1 rounded-full ${order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                        }`}
                >
                    {order.status}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;