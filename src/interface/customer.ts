// Basic interfaces for nested objects
interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface OrderItem {
    name: string;
    quantity: number;
    price: number;
}

export interface Transaction {
    id: string;
    date: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed';
    items: OrderItem[];
}

export interface CustomerDetails {
    id: string;
    name: string;
    image: string;
    email: string;
    phone: string;
    address: Address;
    totalOrders: number;
    totalSpent: number;
    abandonedCarts: number;
    memberSince: string;
    lastPurchase: string;
    transactions: Transaction[];
}