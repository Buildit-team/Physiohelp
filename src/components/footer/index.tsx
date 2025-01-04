

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <div className='w-full bg-[#1053D4] h-[500px] flex items-center justify-center pb-[10px]'>
            <div className='w-[90%] flex flex-col items-center gap-[20px] max-[650px]:w-full '>
                <div className="flex items-center justify-between w-[100%] max-[650px]:justify-center">
                    <img src="/footerlogo.svg" alt="" />
                    <span className="w-[40px] h-[40px] rounded-full bg-white flex items-center justify-center cursor-pointer max-[650px]:hidden">
                        <img src="/Lineup.svg" alt="" />
                    </span>
                </div>
                <span className="flex w-[95%] h-[2px] bg-[#3C7FFF] "></span>
                <div className="flex justify-between  pt-[30px] pb-[30px] w-full max-[650px]:flex-col max-[650px]:items-center max-[650px]:gap-[30px]">
                    <span className="text-white flex flex-col gap-[10px] ml-[40px] max-[650px]:items-center max-[650px]:ml-0" >
                        <p className="text-[20px] cursor-pointer">Company</p>
                        <p className="text-[12px] cursor-pointer">About us</p>
                        <p className="text-[12px] cursor-pointer">Products</p>
                        <p className="text-[12px] cursor-pointer">Services</p>
                        <p className="text-[12px] cursor-pointer">Blog & News</p>
                    </span>
                    <div className="flex flex-col gap-[10px]">
                        <p className="text-[20px] text-white max-[650px]:hidden">Follow our social media</p>
                        <span className="flex items-center gap-[10px]">
                            <img src="/insta.svg" alt="" className="w-[30px]" />
                            <img src="/x.svg" alt="" className="w-[30px]" />
                            <img src="/face.svg" alt="" className="w-[30px]" />
                            <img src="/youtube.svg" alt="" className="w-[30px]" />
                            <img src="/linkedin.svg" alt="" className="w-[30px]" />
                        </span>
                    </div>
                </div>
                <span className="flex w-[95%] h-[2px] bg-[#3C7FFF] "></span>
                <div className="w-full flex items-center justify-center text-white gap-[10px] max-[650px]:text-[12px] max-[650px]:flex-col">
                    <p>Copyright © {date} PhysioHelp Store</p>
                    <span className="flex w-[2px] h-[10px] bg-[#3C7FFF] "></span>
                    <p>Design by <strong>buildit</strong></p>
                </div>
            </div>
        </div>
    )
}

export default Footer