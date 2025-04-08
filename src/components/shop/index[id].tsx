import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartCaontex";
import { useQuery } from "react-query";
import { getUserProductDetails } from "../../admin/services/api-service";
import { ProductImgae } from "../../interface/addProduct";

const DetailsSkeleton = () => {
    return (
        <div className="w-full flex items-center justify-center mt-8 pt-20 pb-12 px-4">
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 animate-pulse">
                <div className="w-full md:w-3/5 flex flex-col items-center">
                    <div className="w-full max-w-lg h-80 bg-gray-200 rounded mb-4"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full max-w-lg">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="aspect-square p-2 bg-gray-200 rounded-md"></div>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-2/5 flex flex-col">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-24 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
            </div>
        </div>
    );
};

const DetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart, updateQuantity } = useCart();
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedImageUrl, setSelectedImageUrl] = useState<string>("");

    const { data: productData, isLoading, error } = useQuery(
        [`PRODUCT_${id}`],
        () => getUserProductDetails(id!),
        {
            enabled: !!id,
            retry: 1,
        }
    );

    const product = productData

    useEffect(() => {
        if (product?.product_image?.length > 0) {
            setSelectedImageUrl(product.product_image[0].image_url);
        }
    }, [product]);

    if (isLoading) {
        return <DetailsSkeleton />;
    }

    if (error || !product) {
        return (
            <div className="w-full flex items-center justify-center mt-8 pt-20 pb-12 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate("/shop")}
                        className="px-6 py-3 bg-[#141718] text-white rounded-md hover:bg-black transition-colors"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
        updateQuantity(product.product_id, quantity + 1);
    };

    const decreaseQuantity = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1;
        setQuantity(newQuantity);
        updateQuantity(product.product_id, newQuantity);
    };

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="w-full flex items-center justify-center mt-8 pt-20 pb-12 px-4">
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-3/5 flex flex-col items-center">
                    <div className="w-full max-w-lg bg-[#F3F5F7] rounded-lg p-4">
                        {selectedImageUrl && (
                            <img
                                src={selectedImageUrl}
                                alt={product.product_name}
                                className="w-full h-auto object-contain aspect-square"
                            />
                        )}
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2 w-full max-w-lg mt-4">
                        {product.product_image?.map((image: ProductImgae, index: number) => (
                            <button
                                key={index}
                                className={`aspect-square p-2 flex items-center justify-center cursor-pointer border rounded-md transition-all
                                    ${selectedImageUrl === image.image_url ? 'border-black shadow-md' : 'border-gray-300'}`}
                                onClick={() => setSelectedImageUrl(image.image_url)}
                                aria-label={`View image ${index + 1}`}
                            >
                                <img
                                    src={image.image_url}
                                    alt={`${product.product_name} ${index + 1}`}
                                    className="w-full h-full object-contain"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-2/5 flex flex-col">
                    <h1 className="text-xl md:text-2xl font-bold mb-4">{product.product_name}</h1>
                    <p className="text-gray-600 mb-4 text-sm md:text-base">{product.description}</p>

                    <p className="text-sm text-gray-500 mb-2">
                        Category: <span className="font-medium">{product.category}</span>
                    </p>
                    <p className="text-lg font-semibold mb-2">${product.price.basic_price}</p>

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

export default DetailsPage;