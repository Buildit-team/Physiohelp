import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartCaontex";
import { useState, useEffect } from "react";


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useCart()
    const isHomePage = location.pathname === "/";
    const isStorePage = location.pathname === "/shop";
    const [hasScrolled, setHasScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setHasScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const navItemClass = isHomePage
        ? `${hasScrolled ? 'text-black' : 'text-white'} hover:text-gray-600`
        : isStorePage
            ? "text-black hover:text-gray-700"
            : "text-gray-600 hover:text-gray-800";

    const headerClass = `w-full z-10 flex justify-center h-[100px] items-center 
            max-[650px]:justify-between max-[650px]:w-full max-[650px]:p-[10px] fixed 
            transition-all duration-300 ${hasScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`;

    return (
        <div className={headerClass}>
            <div className="w-[30%] max-[650px]:w-[50%]">
                {(isHomePage && !hasScrolled) ? (
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
                {/* <p className={`cursor-pointer ${navItemClass}`}>Contact us</p> */}
            </span>
            <span className="w-[20%] flex gap-[30px] max-[650px]:w-[50%] justify-center items-center">
                {
                    (isHomePage && !hasScrolled) ?
                        <>
                            <img src="/headericon1.svg" alt="Search" className="w-[20px]" />
                            <img src="/Vector.svg" alt="User" className="w-[20px]" />
                            <div className="relative">
                                <img src="/headericonBag.svg" alt="Cart" className="w-[20px] cursor-pointer" onClick={() => navigate('/cart')} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-6 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                        </>
                        :
                        <>
                            <img src="/search.svg" alt="Search" className="w-[20px]" />
                            <img src="/user.svg" alt="User" className="w-[20px]" />
                            <div className="relative">
                                <img src="/Cart.svg" alt="Cart" className="w-[40px] cursor-pointer" onClick={() => navigate('/cart')} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                        </>
                }
            </span>
        </div>
    );
};

export default Header;
