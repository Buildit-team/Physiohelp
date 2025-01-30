import { useState } from "react";
import Cart from "./Cart";
import Checkout from "./Checkout";

const Carting = () => {
    const [activeTab, setActiveTab] = useState<'Shopping Cart' | 'checkout' | 'order'>('Shopping Cart');

    return (
        <div className="w-[100%] mt-[100px] flex flex-col items-center  bg-white slideInRight">
            <span className="w-full flex justify-between p-[10px] h-[100px] items-center">
                <p className="w-full flex justify-center text-[30px]">Cart </p>
            </span>
            <span className="w-full flex justify-center gap-[30px] p-[10px] items-center">
                <button
                    className={`font-bold ${activeTab === 'Shopping Cart' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('Shopping Cart')}
                >
                    Shopping Cart
                </button>
                <button
                    className={`font-bold ${activeTab === 'checkout' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('checkout')}
                >
                    Checkout details
                </button>
                <button
                    className={`font-bold ${activeTab === 'order' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('order')}
                >
                    Make Payment
                </button>
                <button
                    className={`font-bold ${activeTab === 'order' ? 'text-black border-b-2 border-black' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('order')}
                >
                    Order Complete
                </button>
            </span>
            <div className="w-[80%]">
                {activeTab === 'Shopping Cart' && <Cart onCheckout={() => setActiveTab('checkout')} />}
                {activeTab === 'checkout' && <Checkout />}
                {activeTab === 'order' && 'Order page'}
            </div>
        </div>
    )
}

export default Carting;