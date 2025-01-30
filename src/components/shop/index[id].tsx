import { useParams } from "react-router-dom";
import { products } from "./data";
import { useState } from "react";

const Detailspage = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find((p) => p.id === Number(id));

    const [selectedImage, setSelectedImage] = useState<string>(
        product?.imageUrl[0] || ""
    );
    const [quantity, setQuantity] = useState<number>(1);

    if (!product) {
        return <div>Product not found</div>;
    }

    // Function to handle adding to cart
    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
        };
        console.log("Added to cart:", cartItem);
        // alert("Product added to cart!");
    };

    // Function to increase quantity
    const increaseQuantity = () => setQuantity((prev) => prev + 1);

    // Function to decrease quantity
    const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="w-full flex items-center justify-center mt-[30px] pt-[80px] pb-[50px]">
            <div className="w-[90%] flex mt-[30px]">
                {/* Main Image Section */}
                <div className="w-[60%] flex flex-col items-center">
                    <img
                        src={selectedImage}
                        alt={product.name}
                        className="w-[400px] mb-4"
                    />
                    {/* Other Images */}
                    <div className="flex space-x-4">
                        {product.imageUrl.map((image, index) => (
                            <span className="w-[200px] h-[250px] object-cover p-[10px] flex items-center justify-center cursor-pointer border border-gray-300 rounded-md">
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    className=""
                                    onClick={() => setSelectedImage(image)}
                                />
                            </span>
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="w-[40%]">
                    <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="text-sm text-gray-500 mb-2">
                        Category: <span className="font-medium">{product.category}</span>
                    </p>
                    <p className="text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
                    <p className={`mb-4 ${product.inStock ? "text-green-500" : "text-red-500"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    <div className="flex items-center space-x-4 mb-4 bg-gray-200 w-[120px] rounded-md" >
                        <button
                            onClick={decreaseQuantity}
                            className="px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            -
                        </button>
                        <span className="text-xl ">{quantity}</span>
                        <button
                            onClick={increaseQuantity}
                            className="px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className= " w-[90%] px-6 py-3 bg-[#141718] text-white rounded-md"
                    >
                        Add to Cart
                    </button>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    );
};

export default Detailspage;
