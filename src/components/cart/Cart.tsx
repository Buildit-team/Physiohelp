import { MdDelete } from "react-icons/md";
import { useCart } from "../../context/CartCaontex";

interface CartProps {
    onCheckout: () => void;
}

const Cart = ({ onCheckout }: CartProps) => {
    const { cart, updateQuantity, removeFromCart, getTotalAmount } = useCart();
    const total = getTotalAmount();

    return (
        <div className="w-full">
            {cart.length > 0 && (
                <div className="flex flex-col lg:flex-row gap-6 p-4">
                    <div className="w-full lg:w-2/3">
                        <div className="hidden md:flex justify-between border-b border-black py-4 mb-6">
                            <p className="w-1/3">Products</p>
                            <p className="w-1/5 text-center">Quantity</p>
                            <p className="w-1/5 text-center">Price</p>
                            <p className="w-1/5 text-center">Subtotal</p>
                        </div>
                        <div className="space-y-6">
                            {cart.map((item) => {
                                const subtotal = item.product.price * item.quantity;

                                return (
                                    <div key={item.product.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg">
                                        <div className="flex gap-4 md:w-1/3">
                                            <img 
                                                src={item.product.imageUrl[0]} 
                                                alt={item.product.name} 
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <p className="font-medium">{item.product.name}</p>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id)}
                                                    className="flex items-center gap-2 text-red-500 text-sm"
                                                >
                                                    <MdDelete /> Remove
                                                </button>
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between md:justify-center md:w-1/5">
                                            <span className="md:hidden">Quantity:</span>
                                            <div className="flex items-center border rounded">
                                                <button
                                                    onClick={() => item.quantity > 1 && updateQuantity(item.product.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <p className="w-8 text-center">{item.quantity}</p>
                                                <button
                                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between md:justify-center md:w-1/5">
                                            <span className="md:hidden">Price:</span>
                                            <p>${item.product.price}</p>
                                        </div>
                                        <div className="flex justify-between md:justify-center md:w-1/5">
                                            <span className="md:hidden">Subtotal:</span>
                                            <p className="font-medium">${subtotal.toFixed(2)}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3">
                        <div className="sticky top-4 border rounded-lg p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Cart Summary</h2>
                            <div className="flex justify-between items-center py-4 border-t">
                                <p className="font-medium">Total</p>
                                <p className="text-2xl text-blue-600">${total}</p>
                            </div>
                            <button 
                                onClick={onCheckout}
                                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;