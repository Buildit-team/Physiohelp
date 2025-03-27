import { useState } from "react";
import Cart from "./Cart";
import Checkout from "./Checkout";
import SummaryPage from "./SummaryPage";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartCaontex";

const Carting = () => {
  const [activeTab, setActiveTab] = useState<
    "Shopping Cart" | "checkout" | "order"
  >("Shopping Cart");
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { cart, getTotalAmount } = useCart();
  const total = getTotalAmount();

  const handleCheckoutSubmit = (formData: any) => {
    setOrderDetails(formData);
    setActiveTab("order");
    localStorage.setItem("orderDetails", JSON.stringify(formData));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", JSON.stringify(total));
  };

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
      className="w-[100%] mt-[100px] flex flex-col items-center bg-white slideInRight"
    >
      <span className="w-full flex justify-between p-[10px] h-[100px] items-center">
        <p className="w-full flex justify-center text-[30px]">Cart</p>
      </span>
      <span className="w-full flex justify-center gap-[30px] p-[10px] items-center">
        <button
          className={`font-bold ${
            activeTab === "Shopping Cart"
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          } md:block hidden`}
          onClick={() => setActiveTab("Shopping Cart")}
        >
          Shopping Cart
        </button>
        <button
          className={`font-bold ${
            activeTab === "checkout"
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          } md:block hidden`}
          onClick={() => setActiveTab("checkout")}
        >
          Checkout details
        </button>
        <button
          className={`font-bold ${
            activeTab === "order"
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          } md:block hidden`}
          onClick={() => setActiveTab("order")}
        >
          Order Summary
        </button>
      </span>
      <div className="md:hidden w-full flex justify-center gap-[30px] p-[10px] items-center">
        <button
          className={`font-bold ${
            activeTab === "Shopping Cart"
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("Shopping Cart")}
        >
          Cart
        </button>
        <button
          className={`font-bold ${
            activeTab === "checkout"
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("checkout")}
        >
          Checkout
        </button>
        <button
          className={`font-bold ${
            activeTab === "order"
              ? "text-black border-b-2 border-black"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("order")}
        >
          Summary
        </button>
      </div>
      <div className="w-[80%] max-[650px]:w-[100%]">
        {activeTab === "Shopping Cart" && (
          <Cart onCheckout={() => setActiveTab("checkout")} />
        )}
        {activeTab === "checkout" && (
          <Checkout onCheckoutSubmit={handleCheckoutSubmit} />
        )}
        {activeTab === "order" && (
          <SummaryPage orderDetails={orderDetails} cart={cart} total={total} />
        )}
      </div>
    </motion.div>
  );
};

export default Carting;
