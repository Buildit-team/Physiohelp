import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { AddAppointmentType } from '../../services/api-service';
import toast from 'react-hot-toast';
import { LiaTimesSolid } from 'react-icons/lia';


interface AddsessiontypeProps {
    setShowAddAppointmentType: (value: boolean) => void;
}

const Addsessiontype: React.FC<AddsessiontypeProps> = ({ setShowAddAppointmentType }) => {
    const queryClient = useQueryClient();
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');

    const { mutate, isLoading } = useMutation(({ type, amount }: { type: string; amount: string }) => AddAppointmentType(type, amount), {
        onSuccess: () => {

            setType('');
            setAmount('');

            toast.success('Appointment type added successfully');

            queryClient.invalidateQueries('appointmentTypes');
            setShowAddAppointmentType(false)
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || 'Failed to add appointment type');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!type.trim() || !amount.trim()) {
            toast.error('Please fill in all fields');
            return;
        }

        mutate({ type, amount });
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[500px] max-[650px]:w-[95%] p-5 rounded shadow-lg relative">
                <h2 className="text-xl font-bold">Add Service Type</h2>
                <button
                    onClick={() => setShowAddAppointmentType(false)}
                    className="text-gray-800 right-4 top-4 font-semibold  absolute  rounded focus:outline-none focus:shadow-outline"
                >
                    <LiaTimesSolid />
                </button>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4 flex flex-col gap-[10px]">
                        <label className="block text-gray-700">Service Type</label>
                        <input
                            type="text"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border rounded w-full py-2 px-3 outline-none"
                            placeholder="Enter appointment type"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-[10px]">
                        <label className="block text-gray-700">Amount</label>
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="border rounded w-full py-2 px-3 outline-none"
                            placeholder="Amount of appointment"
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className={`mt-4 px-4 py-2 rounded text-white ${isLoading
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Appointment Type'}
                    </button>
                </form>
            </div>
        </div>

    );
};

export default Addsessiontype;