import React from 'react';

interface SummaryPageProps {
    orderDetails: any;
}

const SummaryPage: React.FC<SummaryPageProps> = ({ orderDetails }) => {
    return (
        <div className="max-w-lg mx-auto p-4 space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div>
                <p><strong>First Name:</strong> {orderDetails.firstName}</p>
                <p><strong>Last Name:</strong> {orderDetails.lastName}</p>
                <p><strong>Email:</strong> {orderDetails.email}</p>
                <p><strong>Address:</strong> {orderDetails.address}</p>
                <p><strong>Phone:</strong> {orderDetails.homePhone}</p>
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={() => alert('Proceed to Payment')}
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default SummaryPage;