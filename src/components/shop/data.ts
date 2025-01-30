export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    inStock: boolean;
    imageUrl: string[];
    quantity: number;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Egonormic chair",
        price: 700.99,
        description: "100% cotton t-shirt with stylish graphic design.",
        category: "Apparel",
        inStock: true,
        imageUrl: ["/chair2.jpg", "/table1.jpg", "/chair2.jpg"],
        quantity: 10,
    },
    {
        id: 2,
        name: "Running Shoes",
        price: 89.99,
        description: "Comfortable and durable running shoes for all terrains.",
        category: "Sportswear",
        inStock: true,
        imageUrl: ["/dynamogrip.svg", "/dynamogrip.svg"],
        quantity: 20,
    },
    {
        id: 3,
        name: "Smartphone",
        price: 699.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Electronics",
        inStock: false,
        imageUrl: ["/gunMassage.svg", 'table1.jpg'],
        quantity: 0,
    },
    {
        id: 4,
        name: "Cooking Set",
        price: 39.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Home & Kitchen",
        inStock: true,
        imageUrl: ["/dynamogrip.svg", "/table1.jpg"],
        quantity: 15,
    },
    {
        id: 5,
        name: "Graphic T-Shirt",
        price: 19.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Apparel",
        inStock: true,
        imageUrl: ["/massagechair.svg", "/table1.jpg"],
        quantity: 25,
    },
    {
        id: 6,
        name: "Wireless Headphones",
        price: 59.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Electronics",
        inStock: true,
        imageUrl: ["/cyclace.svg", "/table1.jpg"],
        quantity: 18,
    },
    {
        id: 7,
        name: "Running Shoes",
        price: 89.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Sportswear",
        inStock: true,
        imageUrl: ["/dynamogrip.svg", "/gunMassage.svg"],
        quantity: 12,
    },
    {
        id: 8,
        name: "Smartphone",
        price: 699.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Electronics",
        inStock: false,
        imageUrl: ["/gunMassage.svg"],
        quantity: 0,
    },
    {
        id: 9,
        name: "Cooking Set",
        price: 39.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Home & Kitchen",
        inStock: true,
        imageUrl: ["/dynamogrip.svg", "/gunMassage.svg"],
        quantity: 10,
    },
    {
        id: 10,
        name: "Graphic T-Shirt",
        price: 19.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Apparel",
        inStock: true,
        imageUrl: ["/massagechair.svg", "/gunMassage.svg"],
        quantity: 30,
    },
    {
        id: 11,
        name: "Egonormic chair",
        price: 700.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Apparel",
        inStock: true,
        imageUrl: ["/chair2.jpg", "/chair2.jpg", "/table1.jpg"],
        quantity: 8,
    },
    {
        id: 12,
        name: "Office table",
        price: 900.99,
        description:
            "Lorem ipsum dolor sit amet consectetur. Suspendisse lorem felis ornare lorem iaculis amet cursus. Eu mauris commodo maecenas curabitur id. At tincidunt ornare sagittis tellus a. Ornare volutpat.",
        category: "Apparel",
        inStock: true,
        imageUrl: ["/table1.jpg", "/table1.jpg"],
        quantity: 5,
    },
];
