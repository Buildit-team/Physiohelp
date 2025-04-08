import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { CustomerInfo } from '../../interface/addProduct';
import { createOrder } from '../../admin/services/api-service';


interface CheckoutProps {
    setOrderDetails: (details: { firstName: string; lastName: string; address: string; email: string; phone_number: string; }) => void;
    setActiveTab: React.Dispatch<React.SetStateAction<"Shopping Cart" | "checkout" | "order" | "processing-payment">>;
}

const Checkout: React.FC<CheckoutProps> = ({ setOrderDetails, setActiveTab }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phone_number: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const cartId = localStorage.getItem("cartId");
    const createOrderMutation = useMutation(({ customer_info }: { customer_info: CustomerInfo; }) => createOrder(customer_info, cartId || ''),{
        onSuccess: (data) =>{
            setOrderDetails(formData)
            console.log(data);
            localStorage.setItem("orderId", data.data.order.order_id);
            setActiveTab("order");
        }
    } )
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createOrderMutation.mutate({
            customer_info: {
                ...formData,
                name: `${formData.firstName} ${formData.lastName}`,
            }
        });
    };

    return (
        <motion.form initial={{ 
            opacity: 0, 
            y: 10 
          }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring",
              damping: 30,
              stiffness: 180,
              mass: 1,
              delay: 0.2,
            }
          }}
          viewport={{
            amount: 0.2, // Changed from "some" to a numeric value
            once: true,
          }} onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">First name *</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                        placeholder='John'
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Last name *</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                        placeholder='Doe'
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                    placeholder='johndoe@gmail.com'
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Address for delivery *</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                    placeholder='No 11 example street, Lagos Nigeria'
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone number *</label>
                <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none"
                    placeholder='0900000000'
                />
            </div>
            <div className='w-full flex justify-end'>
                <button
                    type="submit"
                    className="w-[] bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                   {createOrderMutation.isLoading ? "Processing..." : "Continue to Order Summary"}
                </button>
            </div>
        </motion.form>
    );
};

export default Checkout;