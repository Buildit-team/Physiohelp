import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Determine if the current page is "home" or "store"
    const isHomePage = location.pathname === "/";
    const isStorePage = location.pathname === "/shop";

    // Define classes for navigation colors
    const navItemClass = isHomePage
        ? "text-white hover:text-gray-300"
        : isStorePage
        ? "text-black hover:text-gray-700"
        : "text-gray-600 hover:text-gray-800";

    return (
        <div className="w-[100%] absolute z-10 flex justify-center h-[120px] items-center max-[650px]:justify-between max-[650px]:w-[100%] max-[650px]:p-[10px]">
            <div className="w-[30%] max-[650px]:w-[50%]">
                {isHomePage ? (
                    <img src="/newlogo.svg" alt="Logo" />
                ) : (
                    <img src="/logo-dark.svg" alt="Logo" className="w-[400px]" />
                )}
            </div>
            <span className="w-[50%] flex gap-[30px] justify-center items-center max-[650px]:hidden">
                <p
                    className={`cursor-pointer ${navItemClass}`}
                    onClick={() => navigate("/")}
                >
                    Home
                </p>
                <p
                    className={`cursor-pointer ${navItemClass}`}
                    onClick={() => navigate("/shop")}
                >
                    Shop
                </p>
                <p className={`cursor-pointer ${navItemClass}`}>Blog</p>
                <p className={`cursor-pointer ${navItemClass}`}>Contact us</p>
            </span>
            <span className="w-[20%] flex gap-[30px] max-[650px]:w-[50%] justify-end">
                <img src="/search.svg" alt="Search" className="w-[20px]" />
                <img src="/user.svg" alt="User" className="w-[20px]" />
                <img src="/Cart.svg" alt="Cart" className="w-[40px]" />
            </span>
        </div>
    );
};

export default Header;
