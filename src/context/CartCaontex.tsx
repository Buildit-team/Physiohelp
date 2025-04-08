import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Product } from '../interface/addProduct';

export type CartItem = {
    product:  Product;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
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

    const addToCart = (product: Product) => {
        const existingProductIndex = cart.findIndex(item => item.product.product_id === product.id.toString());

        if (existingProductIndex > -1) {
            const updatedCart = [...cart];
            updatedCart[existingProductIndex] = {
                ...updatedCart[existingProductIndex],
                quantity: updatedCart[existingProductIndex].quantity + 1
            };
            toast.success(`${product.product_name} quantity increased to ${updatedCart[existingProductIndex].quantity}`);
            setCart(updatedCart);
        } else {
            setCart([...cart, { product, quantity: 1 }]);
            toast.success('Item added to cart successfully');
        }
    };

    const removeFromCart = (productId: string) => {
        setCart(cart.filter(item => item.product.product_id !== productId));
        toast.success('Item removed from cart');
    };

    const updateQuantity = (productId: string, quantity: number) => {
        const updatedCart = cart.map(item =>
            item.product.product_id === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
    };

    const getTotalAmount = () => {
        return cart.reduce((total, item) => {
            return total + (item.product.price.basic_price * item.quantity);
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