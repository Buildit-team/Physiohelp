import { MdDelete } from "react-icons/md";
import { useCart } from "../../context/CartCaontex";


interface CartProps {
    onCheckout: () => void;
}

const Cart = ({ onCheckout }: CartProps) => {
    const { cart, updateQuantity, removeFromCart, getTotalAmount } = useCart();
    const total = getTotalAmount();

    return (
        <div className="w-[100%] flex">
            {
                cart.length > 0 ?
                    <>
                        <div className="w-[70%] flex gap-4 flex-col p-[10px]">
                            <span className="w-[100%] h-[60px] flex justify-between  mt-[40px] border-b border-b-black">
                                <p className="w-[300px] flex items-center">Products</p>
                                <p className="w-[200px] flex items-center justify-center">Quantity</p>
                                <p className="w-[200px] flex items-center justify-center">Price</p>
                                <p className="w-[200px] flex items-center justify-center">Subtotal</p>
                            </span>
                            {
                                cart.map((i) => {
                                    const subtotal = i.product.price * i.quantity;

                                    return (
                                        <div key={i.product.id} className="w-full flex items-center gap-[20px] h-[120px]">
                                            <img src={i?.product?.imageUrl[0]} alt="" className="w-[100px] h-[100px]" />
                                            <span className="flex flex-col w-[200px] gap-[20px] justify-center h-[100px]">
                                                <p>{i?.product?.name}</p>
                                                <p
                                                    className="flex items-center gap-[10px] text-red-500 cursor-pointer"
                                                    onClick={() => removeFromCart(i.product.id)}
                                                >
                                                    <MdDelete /> Remove
                                                </p>
                                            </span>
                                            <span className="flex items-center gap-1 border rounded">
                                                <button
                                                    onClick={() => i.quantity > 1 && updateQuantity(i.product.id, i.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center  disabled:opacity-50"
                                                    disabled={i.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <p className="w-8 text-center">{i.quantity}</p>
                                                <button
                                                    onClick={() => updateQuantity(i.product.id, i.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center "
                                                >
                                                    +
                                                </button>
                                            </span>
                                            <span className="flex gap-[20px] w-[200px] items-center justify-center h-[100px] ">
                                                <p>${i.product.price}</p>
                                            </span>
                                            <span className="flex gap-[20px] w-[200px] items-center justify-center h-[100px] ">
                                                <p>${subtotal.toFixed(2)}</p>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="w-[30%] h-[150px] flex mt-[70px] border rounded flex-col p-[10px]">
                            <p>Cart Summary</p>
                            <span className="h-[70px] flex items-center justify-between">
                                <p>Total</p>
                                <p className="text-[22px] text-[#1053D4]"> ${total}</p>
                            </span>
                            <button 
                                className="w-[100%] h-[40px] rounded bg-[#1053D4] text-white"
                                onClick={onCheckout}
                            >
                                Checkout
                            </button>
                        </div>
                    </>
                    : null
            }
        </div>
    )
}

export default Cart;