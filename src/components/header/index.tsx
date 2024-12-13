
const Header = () => {
    return (
        <div className="w-[90%] flex max-[650px]:justify-between max-[650px]:w-[100%] max-[650px]:p-[10px]">
            <div className="w-[30%] max-[650px]:w-[50%]">
                <img src="/Logo.svg" alt="" />
            </div>
            <span className="w-[50%] flex gap-[30px] justify-center items-center max-[650px]:hidden">
                <p className="cursor-pointer">Home</p>
                <p className="cursor-pointer">Shop</p>
                <p className="cursor-pointer">Blog</p>
                <p className="cursor-pointer">Contact us</p>
            </span>
            <span className="w-[20%] flex gap-[30px] max-[650px]:w-[50%] max-[650px]:justify-end">
                <img src="/search.svg" alt="" className="w-[20px]" />
                <img src="/user.svg" alt="" className="w-[20px]" />
                <img src="/Cart.svg" alt="" className="w-[40px]" />
            </span>
        </div>
    )
}

export default Header