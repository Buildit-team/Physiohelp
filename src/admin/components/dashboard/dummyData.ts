import { Order, SalesDataPoint } from '../../../interface/dashboard';


export const orders: Order[] = [
    { id: 1, product: 'Massage Chair', price: 126000, status: 'Pending', date: '23 Feb 2024', image: 'chair-black' },
    { id: 2, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-controller' },
    { id: 3, product: 'Massage Chair', price: 126000, status: 'Pending', date: '23 Feb 2024', image: 'chair-black' },
    { id: 4, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-round' },
    { id: 5, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-controller' },
    { id: 6, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-controller' },
    { id: 7, product: 'Massage Chair', price: 126000, status: 'Pending', date: '23 Feb 2024', image: 'chair-round' },
    { id: 8, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-black' },
    { id: 9, product: 'Massage Chair', price: 126000, status: 'Pending', date: '23 Feb 2024', image: 'chair-round' },
];

export const salesData: SalesDataPoint[] = [
    { day: 'Sept 10', value: 50 },
    { day: 'Sept 11', value: 65 },
    { day: 'Sept 12', value: 70 },
    { day: 'Sept 13', value: 30 },
    { day: 'Sept 14', value: 25 },
    { day: 'Sept 15', value: 35 },
    { day: 'Sept 16', value: 50 },
];