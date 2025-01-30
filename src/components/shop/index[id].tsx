import { useParams } from "react-router-dom";
import { products } from "./data";
import { useState } from "react";
import { useCart } from "../../context/CartCaontex";

const Detailspage = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find((p) => p.id === Number(id));
    const { addToCart, updateQuantity } = useCart();
    const [selectedImage, setSelectedImage] = useState<string>(
        product?.imageUrl[0] || ""
    );
    const [quantity, setQuantity] = useState<number>(1);

    if (!product) {
        return <div>Product not found</div>;
    }
    
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
        updateQuantity(product.id, quantity + 1);
    };

    const decreaseQuantity = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1;
        setQuantity(newQuantity);
        updateQuantity(product.id, newQuantity);
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="w-full flex items-center justify-center mt-8 pt-20 pb-12 px-4">
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-3/5 flex flex-col items-center">
                    <div className="w-full max-w-lg">
                        <img
                            src={selectedImage}
                            alt={product.name}
                            className="w-full h-auto object-contain mb-4"
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-lg">
                        {product.imageUrl.map((image, index) => (
                            <button
                                key={index}
                                className={`aspect-square p-2 flex items-center justify-center cursor-pointer border rounded-md 
                                    ${selectedImage === image ? 'border-black' : 'border-gray-300'}`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full md:w-2/5 flex flex-col">
                    <h1 className="text-xl md:text-2xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">{product.description}</p>
                    <p className="text-sm text-gray-500 mb-2">
                        Category: <span className="font-medium">{product.category}</span>
                    </p>
                    <p className="text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
                    <p className={`mb-4 ${product.inStock ? "text-green-500" : "text-red-500"}`}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                    <div className="flex items-center mb-6">
                        <div className="flex items-center space-x-4 bg-gray-100 rounded-md">
                            <button
                                onClick={decreaseQuantity}
                                className="px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                -
                            </button>
                            <span className="text-xl">{quantity}</span>
                            <button
                                onClick={increaseQuantity}
                                className="px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="w-full px-6 py-3 bg-[#141718] text-white rounded-md hover:bg-black transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Detailspage;