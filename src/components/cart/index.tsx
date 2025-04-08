import { useState } from "react";
import Cart from "./Cart";
import Checkout from "./Checkout";
import SummaryPage from "./SummaryPage";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartCaontex";

const Carting = () => {
  const [activeTab, setActiveTab] = useState<
    "Shopping Cart" | "checkout" | "order" | "processing-payment"
  >("Shopping Cart");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { cart, getTotalAmount } = useCart();
  const total = getTotalAmount();


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
        amount: 0.2,
        once: true,
      }}
      className="w-full mt-20 flex flex-col items-center bg-white slideInRight"
    >
      <span className="w-full flex justify-between p-2.5 h-24 items-center">
        <p className="w-full flex justify-center text-3xl">Cart</p>
      </span>
      
      <div className="w-full flex justify-center gap-8 p-2.5 items-center border-b">
        <button
          className={`font-bold pb-2 relative ${
            activeTab === "Shopping Cart" ? "text-black" : "text-gray-500"
          } md:block hidden`}
          onClick={() => setActiveTab("Shopping Cart")}
        >
          Shopping Cart
          {activeTab === "Shopping Cart" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
        <button
          className={`font-bold pb-2 relative ${
            activeTab === "checkout" ? "text-black" : "text-gray-500"
          } md:block hidden`}
          onClick={() => setActiveTab("checkout")}
          disabled={cart.length === 0}
        >
          Checkout Details
          {activeTab === "checkout" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
        <button
          className={`font-bold pb-2 relative ${
            activeTab === "order" ? "text-black" : "text-gray-500"
          } md:block hidden`}
          onClick={() => setActiveTab("order")}
          disabled={!orderDetails}
        >
          Order Summary
          {activeTab === "order" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
      </div>
      
      <div className="md:hidden w-full flex justify-center gap-8 p-2.5 items-center border-b">
        <button
          className={`font-bold pb-2 relative ${
            activeTab === "Shopping Cart" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Shopping Cart")}
        >
          Cart
          {activeTab === "Shopping Cart" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
        <button
          className={`font-bold pb-2 relative ${
            activeTab === "checkout" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("checkout")}
          disabled={cart.length === 0}
        >
          Checkout
          {activeTab === "checkout" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
        <button
          className={`font-bold pb-2 relative ${
            activeTab === "order" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("order")}
          disabled={!orderDetails}
        >
          Summary
          {activeTab === "order" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />
          )}
        </button>
      </div>
      
      <div className="w-4/5 max-[650px]:w-full">
        {activeTab === "Shopping Cart" && (
          <Cart setActiveTab={setActiveTab} />
        )}
        {activeTab === "checkout" && (
          <Checkout setOrderDetails={setOrderDetails} setActiveTab={setActiveTab} />
        )}
        {activeTab === "order" && (
          <SummaryPage orderDetails={orderDetails} cart={cart} total={total} />
        )}
      </div>
    </motion.div>
  );
};

export default Carting;