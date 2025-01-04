import { useState } from "react";
import { products } from "./data";

const ShopPage = () => {
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [sortOrder, setSortOrder] = useState(""); // 'asc' for ascending, 'desc' for descending
    const [priceFilter, setPriceFilter] = useState(""); // Selected price range

    // Price ranges for dropdown
    const priceRanges = [
        { label: "All Price", min: 0, max: Infinity },
        { label: "$0 - $50", min: 0, max: 50 },
        { label: "$51 - $100", min: 51, max: 100 },
        { label: "$101 - $200", min: 101, max: 200 },
        { label: "$201 and above", min: 201, max: Infinity },
    ];

    // Handle sorting
    const handleSort = (order: string) => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (order === "asc") return a.price - b.price;
            if (order === "desc") return b.price - a.price;
            return 0;
        });
        setFilteredProducts(sortedProducts);
        setSortOrder(order);
    };

    // Handle price filtering
    const handlePriceFilter = (range: string) => {
        const selectedRange = priceRanges.find((rangeObj) => rangeObj.label === range);
        if (selectedRange) {
            const { min, max } = selectedRange;
            const filtered = products.filter(
                (product) => product.price >= min && product.price <= max
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products); // Default to all products
        }
        setPriceFilter(range);
    };

    return (
        <div className="w-full flex flex-col items-center justify-center gap-[20px]">
            {/* Header Section */}
            <div className="w-full flex justify-center items-center mt-[100px]">
                <div className="flex ml-[30px] w-[80%] flex-col items-center bg-[url('/shop-page.svg')] h-[60vh] max-[650px]:object-contain bg-no-repeat max-[650px]:ml-0 max-[650px]:w-[90%]">
                    <span className="flex flex-col items-center justify-center h-[70%] text-center max-[650px]:p-2">
                        <h1 className="text-[45px]">Shop Page</h1>
                        <p>Experience the care and comfort you've always imagined</p>
                    </span>
                </div>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex w-[77%] justify-between mb-[20px] gap-4 max-[650px]:flex-col max-[650px]:w-[90%]">
                {/* Price Filter Dropdown */}
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
                        className="border p-2 max-[650px]:w-full"
                    >
                        <option value="">Sort by</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <div className="flex w-[80%] justify-center flex-wrap mb-[30px] gap-2 max-[650px]:w-[100%]">
                {filteredProducts.map((i) => (
                    <div
                        key={i.id}
                        className="w-[140px] flex flex-col p-[10px] gap-[10px] max-[650px]:p-0"
                    >
                        <div
                            className="h-[250px] max-[650px]:h-[200px] w-[100%] flex items-center bg-[#F3F5F7] p-[20px] relative group"
                        >
                            <img src={i.imageUrl} alt={i.name} />
                            <div className="flex absolute inset-0 w-full h-[90%] justify-center items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button className="w-[90%] h-[40px] bg-white rounded-[4px]">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                        <p className="text-[14px]">{i.name}</p>
                        <span className="w-full flex gap-2 items-center">
                            <p className="text-[14px]">${i.price.toFixed(2)}</p>
                            <p className="text-[14px] line-through text-[#6C7275]">
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
