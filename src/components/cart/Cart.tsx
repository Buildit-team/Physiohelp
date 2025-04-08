import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartCaontex";
import { useMutation } from "react-query";
import { createCart } from "../../admin/services/api-service";
import { CartItems } from "../../interface/addProduct";
import { formatNumber } from "../../utils/formatNumbers";
import { useNavigate } from "react-router-dom";


interface CartProps {
    setActiveTab: React.Dispatch<React.SetStateAction<"Shopping Cart" | "checkout" | "order" | "processing-payment">>;
}

const Cart = ({ setActiveTab }: CartProps) => {
    const navigate = useNavigate()
    const { cart, updateQuantity, removeFromCart, getTotalAmount } = useCart();
    const total = getTotalAmount();

    const createCartMutation = useMutation(({ items, totalPrice }: { items: CartItems[]; totalPrice: number }) => createCart(items, totalPrice), {
        onSuccess: (data) => {
            localStorage.setItem("cartId", data.data.cart.cart_id);
            setActiveTab("checkout");
        }
    });
    const cartData = cart.map((product) => {
        const productId = product.product.product_id;
        const quantity = product.quantity;
        return {
            product_id: productId,
            quantity: quantity,
            sub_total: product.product.price.basic_price * quantity
        }

    })

    const handleCheckout = () => {
        createCartMutation.mutate({ items: cartData, totalPrice: total });
    }

    const handleContinueShopping = () => {
       navigate("/shop");
    }

    return (
        <motion.div initial={{
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
                amount: 0.2,
                once: true,
            }}
            className="w-full">
            {cart.length > 0 ? (
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
                                const subtotal = item.product.price.basic_price * item.quantity;
                                return (
                                    <div key={item.product.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border rounded-lg">
                                        <div className="flex gap-4 md:w-1/3">
                                            <img
                                                src={item.product.product_image?.[0]?.image_url || ""}
                                                alt={item.product.product_name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                            <div className="flex flex-col justify-between">
                                                <p className="font-medium">{item.product.product_name}</p>
                                                <button
                                                    onClick={() => removeFromCart(item.product.product_id)}
                                                    className="flex items-center gap-2 text-red-500 text-sm"
                                                >
                                                    <MdDelete /> Remove
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between md:justify-center md:w-1/5">
                                            <span className="md:hidden">Quantity:</span>
                                            <div className="flex items-center border rounded">
                                                <button
                                                    onClick={() => item.quantity > 1 && updateQuantity(item.product.product_id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center disabled:opacity-50"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <p className="w-8 text-center">{item.quantity}</p>
                                                <button
                                                    onClick={() => updateQuantity(item.product.product_id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between md:justify-center md:w-1/5">
                                            <span className="md:hidden">Price:</span>
                                            <p>₦{formatNumber(item.product.price.basic_price)}</p>
                                        </div>
                                        <div className="flex justify-between md:justify-center md:w-1/5">
                                            <span className="md:hidden">Subtotal:</span>
                                            <p className="font-medium">₦{formatNumber(subtotal)}</p>
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
                                <p className="text-2xl text-blue-600">₦{formatNumber(total)}</p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {createCartMutation.isLoading ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg> : "Checkout"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="text-center max-w-md">
                        <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <h2 className="mt-2 text-2xl font-semibold text-gray-900">Your cart is empty</h2>
                        <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
                        <div className="mt-6">
                            <button
                                onClick={handleContinueShopping}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default Cart;