import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { products } from '../components/shop/data';

export type CartItem = {
    product: typeof products[0];
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: typeof products[0]) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalAmount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: typeof products[0]) => {
        const existingProductIndex = cart.findIndex(item => item.product.id === product.id);

        if (existingProductIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex] = {
                ...updatedCart[existingProductIndex],
                quantity: updatedCart[existingProductIndex].quantity + 1
            };
            toast.success(`${product.name} quantity increased to ${updatedCart[existingProductIndex].quantity}`);
            setCart(updatedCart);
        } else {
            setCart([...cart, { product, quantity: 1 }]);
            toast.success('Item added to cart successfully');
        }
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.product.id !== productId));
        toast.success('Item removed from cart');
    };

    const updateQuantity = (productId: number, quantity: number) => {
        const updatedCart = cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);
    };

    const clearCart = () => {
        setCart([]);
        toast.success('Cart cleared');
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalAmount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}