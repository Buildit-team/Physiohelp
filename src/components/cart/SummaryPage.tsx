import React from "react";
import { CartItem } from "../../context/CartCaontex";
import { motion } from "framer-motion";


interface SummaryPageProps {
  orderDetails: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    homePhone: string;
  };
  cart: CartItem[];
  total: number;
}

const SummaryPage: React.FC<SummaryPageProps> = ({
  orderDetails,
  cart,
  total,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
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
        },
      }}
      viewport={{
        amount: 0.2, // Changed from "some" to a numeric value
        once: true,
      }}
      className="container mx-auto px-4 py-6 w-[100%] flex justify-center gap-[10px]"
    >
      {cart?.length > 0 ? (
        <>
          <div className="bg-white shadow-lg rounded-lg w-[50%] overflow-hidden">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Customer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                <div>
                  <p className="font-medium">First Name</p>
                  <p>{orderDetails?.firstName}</p>
                </div>
                <div>
                  <p className="font-medium">Last Name</p>
                  <p>{orderDetails?.lastName}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="truncate">{orderDetails?.email}</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p>{orderDetails?.homePhone}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-medium">Address</p>
                  <p>{orderDetails?.address}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-4 sm:p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Order Items
              </h3>
              <div className="space-y-4">
                {cart?.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.imageUrl[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.product.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          ${item.product.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-700">
                        {item.quantity} × $
                        {(item.quantity * item.product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="sticky top-4 border p-6 space-y-4">
              <h2 className="text-xl font-semibold">Payment Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-bold text-gray-800">Total</p>
                <p className="text-2xl font-bold text-blue-700">
                  ${total.toFixed(2)}
                </p>
              </div>
              <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Proceed to Payment
              </button>
            </div>
          </div>
        </>
      ) : null}
    </motion.div>
  );
};

export default SummaryPage;
