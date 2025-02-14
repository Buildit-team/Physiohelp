import { CustomerDetails } from "../../../interface/customer";


const customers: CustomerDetails[] = [
    {
      id: '1',
      name: 'John Doe',
      image: './user.svg',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Main St',
        city: 'Boston',
        state: 'MA',
        zipCode: '02108',
        country: 'USA'
      },
      totalOrders: 15,
      totalSpent: 2499.99,
      abandonedCarts: 3,
      memberSince: '2023-01-15',
      lastPurchase: '2024-01-20',
      transactions: [
        {
          id: 'T1',
          date: '2024-01-20',
          amount: 299.99,
          status: 'completed',
          items: [
            { name: 'Wireless Headphones', quantity: 1, price: 299.99 }
          ]
        },
        {
          id: 'T2',
          date: '2023-12-15',
          amount: 199.99,
          status: 'completed',
          items: [
            { name: 'Smart Watch', quantity: 1, price: 199.99 }
          ]
        }
      ]
    },
    {
      id: '2',
      name: 'Jane Smith',
      image: './user.svg',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 234-5678',
      address: {
        street: '456 Oak Avenue',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'USA'
      },
      totalOrders: 8,
      totalSpent: 1299.99,
      abandonedCarts: 1,
      memberSince: '2023-03-20',
      lastPurchase: '2024-01-15',
      transactions: [
        {
          id: 'T3',
          date: '2024-01-15',
          amount: 399.99,
          status: 'completed',
          items: [
            { name: 'Tablet', quantity: 1, price: 399.99 }
          ]
        },
        {
          id: 'T4',
          date: '2023-11-30',
          amount: 89.99,
          status: 'completed',
          items: [
            { name: 'Wireless Charger', quantity: 1, price: 89.99 }
          ]
        }
      ]
    },
    {
      id: '3',
      name: 'Robert Johnson',
      image: './user.svg',
      email: 'robert.johnson@example.com',
      phone: '+1 (555) 345-6789',
      address: {
        street: '789 Pine Street',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        country: 'USA'
      },
      totalOrders: 12,
      totalSpent: 1899.99,
      abandonedCarts: 2,
      memberSince: '2023-02-10',
      lastPurchase: '2024-01-10',
      transactions: [
        {
          id: 'T5',
          date: '2024-01-10',
          amount: 599.99,
          status: 'completed',
          items: [
            { name: 'Smartphone', quantity: 1, price: 599.99 }
          ]
        },
        {
          id: 'T6',
          date: '2023-12-01',
          amount: 149.99,
          status: 'completed',
          items: [
            { name: 'Gaming Mouse', quantity: 1, price: 149.99 }
          ]
        }
      ]
    },
    {
      id: '4',
      name: 'Sarah Williams',
      image: './user.svg',
      email: 'sarah.williams@example.com',
      phone: '+1 (555) 456-7890',
      address: {
        street: '321 Maple Drive',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      },
      totalOrders: 20,
      totalSpent: 3299.99,
      abandonedCarts: 4,
      memberSince: '2022-12-01',
      lastPurchase: '2024-01-25',
      transactions: [
        {
          id: 'T7',
          date: '2024-01-25',
          amount: 799.99,
          status: 'completed',
          items: [
            { name: 'Laptop', quantity: 1, price: 799.99 }
          ]
        },
        {
          id: 'T8',
          date: '2023-12-20',
          amount: 299.99,
          status: 'completed',
          items: [
            { name: 'Smart Speaker', quantity: 1, price: 299.99 }
          ]
        }
      ]
    }
  ];
  
  export default customers;