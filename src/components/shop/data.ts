export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    inStock: boolean;
    imageUrl: string;
};

export const products: Product[] = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 59.99,
        description: "High-quality wireless headphones with noise cancellation.",
        category: "Electronics",
        inStock: true,
        imageUrl: "/cyclace.svg",
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 89.99,
        description: "Comfortable and durable running shoes for all terrains.",
        category: "Sportswear",
        inStock: true,
        imageUrl: "/dynamogrip.svg",
    },
    {
        id: 3,
        name: "Smartphone",
        price: 699.99,
        description: "Latest smartphone with advanced features and sleek design.",
        category: "Electronics",
        inStock: false,
        imageUrl: "/gunMassage.svg",
    },
    {
        id: 4,
        name: "Cooking Set",
        price: 39.99,
        description: "Non-stick cooking set, perfect for home chefs.",
        category: "Home & Kitchen",
        inStock: true,
        imageUrl: "/dynamogrip.svg",
    },
    {
        id: 5,
        name: "Graphic T-Shirt",
        price: 19.99,
        description: "100% cotton t-shirt with stylish graphic design.",
        category: "Apparel",
        inStock: true,
        imageUrl: "/massagechair.svg",
    },
    {
        id: 6,
        name: "Wireless Headphones",
        price: 59.99,
        description: "High-quality wireless headphones with noise cancellation.",
        category: "Electronics",
        inStock: true,
        imageUrl: "/cyclace.svg",
    },
    {
        id: 7,
        name: "Running Shoes",
        price: 89.99,
        description: "Comfortable and durable running shoes for all terrains.",
        category: "Sportswear",
        inStock: true,
        imageUrl: "/dynamogrip.svg",
    },
    {
        id: 8,
        name: "Smartphone",
        price: 699.99,
        description: "Latest smartphone with advanced features and sleek design.",
        category: "Electronics",
        inStock: false,
        imageUrl: "/gunMassage.svg",
    },
    {
        id: 9,
        name: "Cooking Set",
        price: 39.99,
        description: "Non-stick cooking set, perfect for home chefs.",
        category: "Home & Kitchen",
        inStock: true,
        imageUrl: "/dynamogrip.svg",
    },
    {
        id: 10,
        name: "Graphic T-Shirt",
        price: 19.99,
        description: "100% cotton t-shirt with stylish graphic design.",
        category: "Apparel",
        inStock: true,
        imageUrl: "/massagechair.svg",
    },
];

