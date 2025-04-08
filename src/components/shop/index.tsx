import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartCaontex";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getUserProduct } from "../../admin/services/api-service";
import { Product } from "../../interface/addProduct";
import { formatNumber } from "../../utils/formatNumbers";

const ProductSkeleton = () => {
    return (
        <div className="flex flex-col p-2 gap-2 bg-white animate-pulse">
            <div className="h-[250px] max-[650px]:h-[160px] w-full flex items-center bg-gray-200 p-4">
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="w-full flex gap-2 items-center">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/5"></div>
            </div>
        </div>
    );
};

const ShopPage = () => {
    const navigate = useNavigate()
    const [product, setAllProduct] = useState<Product[]>([])
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(product || []);
    const [sortOrder, setSortOrder] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const { addToCart } = useCart();

    const { isLoading } = useQuery('ALL_USER_PRODUCTS', () => getUserProduct(0, 20), {
        onSuccess: (data) => {
            setAllProduct(data?.data?.products)
            setFilteredProducts(data.data.products)
        }
    })

    const priceRanges = [
        { label: "All Price", min: 0, max: Infinity },
        { label: "$0 - $50", min: 0, max: 50 },
        { label: "$51 - $100", min: 51, max: 100 },
        { label: "$101 - $200", min: 101, max: 200 },
        { label: "$201 and above", min: 201, max: Infinity },
    ];

    const handleSort = (order: string) => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (order === "asc") return Number(a.price) - Number(b.price);
            if (order === "desc") return Number(b.price) - Number(a.price);
            return 0;
        });
        setFilteredProducts(sortedProducts);
        setSortOrder(order);
    };

    const handlePriceFilter = (range: string) => {
        const selectedRange = priceRanges.find((rangeObj) => rangeObj.label === range);
        if (selectedRange) {
            const { min, max } = selectedRange;
            const filtered = product.filter(
                (product) => product.price.basic_price >= min && product.price.basic_price <= max
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(product);
        }
        setPriceFilter(range);
    };

    const skeletonArray = Array(4).fill(0);

    return (
        <motion.div initial={{
            opacity: 0,
            y: 10
        }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    type: "spring",
                    damping: 30,
                    stiffness: 180,
                    mass: 1,
                    delay: 0.2,
                }
            }}
            viewport={{
                amount: 0.2,
                once: true,
            }} className="w-full flex flex-col items-center justify-center gap-5">
            <div className="w-full flex justify-center items-center mt-24">
                <div className="flex ml-8 w-4/5 flex-col items-center bg-[url('/shop-page.svg')] h-[60vh] max-[650px]:h-[40vh] bg-no-repeat max-[650px]:ml-0 max-[650px]:w-[90%]">
                    <span className="flex flex-col items-center justify-center h-[100%] text-center max-[650px]:p-2">
                        <h1 className="text-4xl">Shop Page</h1>
                        <p>Experience the care and comfort you've always imagined</p>
                    </span>
                </div>
            </div>
            <div className="flex w-4/5 justify-between mb-5 gap-4 max-[650px]:flex-col max-[650px]:w-[90%]">
                <div className="max-[650px]:w-full">
                    <select
                        value={priceFilter}
                        onChange={(e) => handlePriceFilter(e.target.value)}
                        className="border p-2 max-[650px]:w-full"
                        disabled={isLoading}
                    >
                        {priceRanges.map((range) => (
                            <option key={range.label} value={range.label}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <select
                        value={sortOrder}
                        onChange={(e) => handleSort(e.target.value)}
                        className="border p-2 max-[650px]:w-full outline-none"
                        disabled={isLoading}
                    >
                        <option value="">Sort by</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-4 w-4/5 gap-4 mb-8 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[650px]:w-[90%] max-[650px]:gap-2">
                {isLoading ? (
                    skeletonArray.map((_, index) => (
                        <ProductSkeleton key={`skeleton-${index}`} />
                    ))
                ) : (
                    filteredProducts.map((i) => (
                        <div
                            key={i.product_id}
                            className="flex flex-col p-2 gap-2 bg-white"
                        >
                            <div
                                className="h-[250px] max-[650px]:h-[160px] w-full flex items-center bg-[#F3F5F7] p-4 relative group"
                            >
                                <img src={i.product_image?.[0]?.image_url || ""} alt={i.product_name} className="w-full h-full object-contain" />
                                <div className="flex flex-col absolute inset-0 w-full h-[90%] justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="flex w-full h-[80%]" onClick={() => navigate(`/shop/${i.product_id}`)} />
                                    <button
                                        onClick={() => {
                                            addToCart(i)
                                            console.log(i)
                                        }}
                                        className="w-[90%] h-10 bg-white rounded max-[650px]:h-8 max-[650px]:text-xs">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm max-[650px]:text-xs">{i.product_name}</p>
                            <span className="w-full flex gap-2 items-center">
                                <p className="text-sm max-[650px]:text-xs">₦{formatNumber(i.price.basic_price)}</p>
                                <p className="text-sm line-through text-[#6C7275] max-[650px]:text-xs">
                                    ₦{formatNumber(i.price?.basic_price) || (formatNumber(i.price.basic_price * 1.5))}
                                </p>
                            </span>
                        </div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default ShopPage;