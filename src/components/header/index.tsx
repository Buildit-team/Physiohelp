import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartCaontex";
import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cart } = useCart();
    const isHomePage = location.pathname === "/";
    const isStorePage = location.pathname === "/shop";
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const headerClass = `w-full z-10 flex justify-center h-[80px] items-center 
            max-[650px]:justify-between max-[650px]:w-full max-[650px]:p-[10px] fixed 
            transition-all duration-300 ${hasScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className={headerClass}>
            <div className="w-[30%] max-[650px]:w-[45%]">
                {(isHomePage && !hasScrolled) ? (
                    <img src="/newlogo.svg" onClick={() => navigate("/")} alt="Logo" />
                ) : (
                    <img src="/logo-dark.svg" onClick={() => navigate("/")} alt="Logo" className="w-[320px]" />
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
            </span>
            <span className="w-[20%] flex gap-[30px] max-[650px]:w-[55%] justify-center items-center max-[650px]:justify-end max-[650px]:gap-[10px]">
                {
                    (isHomePage && !hasScrolled) ?
                        <>
                            <img src="/Vector.svg" alt="User" className="w-[20px]" />
                            <div className="relative">
                                <img src="/headericonBag.svg" alt="Cart" className="w-[20px] cursor-pointer" onClick={() => navigate('/cart')} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-6 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                            <CiMenuBurger onClick={toggleMenu} className="cursor-pointer hidden max-[650px]:flex"  />
                        </>
                        :
                        <>
                            <img src="/user.svg" alt="User" className="w-[20px]" />
                            <div className="relative">
                                <img src="/Cart.svg" alt="Cart" className="w-[40px] cursor-pointer" onClick={() => navigate('/cart')} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                            <CiMenuBurger onClick={toggleMenu} className="cursor-pointer hidden max-[650px]:flex" />
                        </>
                }
            </span>
            {isMenuOpen && (
                <div className="md:hidden absolute top-[100px] right-0 bg-white shadow-lg w-full">
                    <div className="flex flex-col p-4">
                        <p
                            className={`cursor-pointer ${navItemClass} p-2`}
                            onClick={() => { navigate("/"); toggleMenu(); }}
                        >
                            Home
                        </p>
                        <p
                            className={`cursor-pointer ${navItemClass} p-2`}
                            onClick={() => { navigate("/shop"); toggleMenu(); }}
                        >
                            Shop
                        </p>
                        <p className={`cursor-pointer ${navItemClass} p-2`}>Blog</p>
                        {/* <p className={`cursor-pointer ${navItemClass} p-2`}>Contact us</p> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;