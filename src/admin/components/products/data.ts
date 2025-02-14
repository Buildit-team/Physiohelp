import { Product } from "../../../interface/addProduct";

export const products: Product[] = [
    {
        id: '1',
        name: 'Massage Chair',
        sku: '302012',
        stock: 10,
        price: 121.00,
        status: 'Low Stock',
        added: '29 Dec 2022',
        productImage: '/chair2.jpg',
        customer: { // Add customer details
            name: 'John Doe',
            email: 'john.doe@example.com',
        },
    },
    {
        id: '2',
        name: 'Hand Grip',
        sku: '302011',
        stock: 204,
        price: 590.00,
        status: 'Published',
        added: '24 Dec 2022',
        productImage: '/dynamogrip.svg',
        customer: { // Add customer details
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
        },
    },
    {
        id: '3',
        name: 'Facial Gun',
        sku: '302002',
        stock: 48,
        price: 125.00,
        status: 'Published',
        added: '12 Dec 2022',
        productImage: 'table1.jpg',
        customer: { // Add customer details
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
        },
    },
    {
        id: '4',
        name: 'Mini exercise bicycle',
        sku: '301901',
        stock: 401,
        price: 348.00,
        status: 'Published',
        added: '21 Oct 2022',
        productImage: '/massagechair.svg',
        customer: { // Add customer details
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
        },
    }
];