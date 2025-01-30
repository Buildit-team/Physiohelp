import { useState } from "react";
import { products } from "./data";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartCaontex";

const ShopPage = () => {
    const navigate = useNavigate()
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [sortOrder, setSortOrder] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const { addToCart } = useCart();
    
    const priceRanges = [
        { label: "All Price", min: 0, max: Infinity },
        { label: "$0 - $50", min: 0, max: 50 },
        { label: "$51 - $100", min: 51, max: 100 },
        { label: "$101 - $200", min: 101, max: 200 },
        { label: "$201 and above", min: 201, max: Infinity },
    ];

    const handleSort = (order: string) => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (order === "asc") return a.price - b.price;
            if (order === "desc") return b.price - a.price;
            return 0;
        });
        setFilteredProducts(sortedProducts);
        setSortOrder(order);
    };

    const handlePriceFilter = (range: string) => {
        const selectedRange = priceRanges.find((rangeObj) => rangeObj.label === range);
        if (selectedRange) {
            const { min, max } = selectedRange;
            const filtered = products.filter(
                (product) => product.price >= min && product.price <= max
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
        setPriceFilter(range);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center gap-5">
            <div className="w-full flex justify-center items-center mt-24">
                <div className="flex ml-8 w-4/5 flex-col items-center bg-[url('/shop-page.svg')] h-[60vh] bg-no-repeat max-[650px]:ml-0 max-[650px]:w-[90%]">
                    <span className="flex flex-col items-center justify-center h-[70%] text-center max-[650px]:p-2">
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
                    >
                        <option value="">Sort by</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-4 w-4/5 gap-4 mb-8 max-[1024px]:grid-cols-3 max-[768px]:grid-cols-2 max-[650px]:w-[90%] max-[650px]:gap-2">
                {filteredProducts.map((i) => (
                    <div
                        key={i.id}
                        className="flex flex-col p-2 gap-2 bg-white"
                    >
                        <div
                            className="h-[250px] max-[650px]:h-[160px] w-full flex items-center bg-[#F3F5F7] p-4 relative group"
                        >
                            <img src={i.imageUrl[0]} alt={i.name} className="w-full h-full object-contain" />
                            <div className="flex flex-col absolute inset-0 w-full h-[90%] justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="flex w-full h-[80%]" onClick={() => navigate(`/shop/${i.id}`)} />
                                <button
                                    onClick={() => addToCart(i)}
                                    className="w-[90%] h-10 bg-white rounded max-[650px]:h-8 max-[650px]:text-xs">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                        <p className="text-sm max-[650px]:text-xs">{i.name}</p>
                        <span className="w-full flex gap-2 items-center">
                            <p className="text-sm max-[650px]:text-xs">${i.price.toFixed(2)}</p>
                            <p className="text-sm line-through text-[#6C7275] max-[650px]:text-xs">
                                ${i.price?.toFixed(2) || (i.price * 1.5).toFixed(2)}
                            </p>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopPage;