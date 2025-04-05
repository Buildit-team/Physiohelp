import { useNavigate } from "react-router-dom"
import {motion} from 'framer-motion'


const Discount = () => {
    const navigate = useNavigate()
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
          }} className="w-[100%] h-auto pt-[80px] pb-[50px] flex flex-col justify-center mt-[30px] gap-[20px] bg-[#F3F5F7]">
            <div className="w-full h-auto flex flex-col gap-[30px]">
                <div className="w-[100%] flex justify-center gap-[30px] max-[650px]:flex-col">
                    <div className="w-[350px] h-[200px] bg-[#1053D4] rounded-[10px] max-[650px]:rounded-[0px] flex flex-col gap-[10px] items-center justify-center max-[650px]:w-full">
                        <p className="text-[25px] text-white">Enjoy discounts</p>
                        <p className="text-[35px] text-white font-bold">15% OFF </p>
                        <p className="text-center text-white">Get 15% off every product purchase <br />above $500</p>
                    </div>
                    <div className="w-[550px] h-[200px] bg-[white] rounded-[10px] max-[650px]:rounded-[0px] flex max-[650px]:flex-col justify-center max-[650px]:w-full max-[650px]:h-auto max-[650px]:items-center">
                        <span className="w-[45%] flex justify-center flex-col max-[650px]:w-full max-[650px]:items-center">
                            <h1 className="w-[100%] text-[#1053D4] font-bold max-[650px]:text-center">Ankle Weights</h1>
                            <p className="w-[100%] text-[#BCBCBC] max-[650px]:w-[90%] max-[650px]:text-center">
                                Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet suscipit nulla. Nullam vitae sit tempus diam.
                            </p>
                        </span>
                        <img src="/bangles.png" alt="" className="max-[650px]:w-[200px]" />
                    </div>
                </div>
                <div className="w-[100%] flex justify-center gap-[30px] max-[650px]:flex-col-reverse">
                    <div className="w-[550px] h-[200px] bg-[white] rounded-[10px] max-[650px]:rounded-[0px] flex max-[650px]:flex-col justify-center max-[650px]:w-full max-[650px]:h-auto max-[650px]:items-center">
                        <span className="w-[50%] flex justify-center flex-col max-[650px]:w-full max-[650px]:items-center">
                            <h1 className="w-[100%] text-[#1053D4] font-bold max-[650px]:text-center">Electric <br /> Muscle Stimulator</h1>
                            <p className="w-[100%] text-[#BCBCBC] max-[650px]:w-[90%] max-[650px]:text-center">
                                Libero diam auctor tristique hendrerit in eu vel id. Nec leo amet suscipit nulla. Nullam vitae sit tempus diam.
                            </p>
                        </span>
                        <img src="/stimulator.png" alt="" className="max-[650px]:w-[200px]" />
                    </div>
                    <div className="w-[350px] h-[200px] bg-[url('/drugs.png')] rounded-[10px] max-[650px]:rounded-[0px] relative max-[650px]:w-full">
                        <div className="w-full h-full absolute inset-0  bg-[#15008996] rounded-[10px] max-[650px]:rounded-[0px] p-[10px]">
                            <span className="w-[90%] flex justify-end h-[60px]">
                                <img src="/Elipse.svg" alt="" className="w-[40px]" />
                            </span>
                            <span className="w-[90%] ">
                                <p className="text-white text-[20px] mb-[20px]">Pain Relievers</p>
                                <p className="text-[#BCBCBC] text-[14px]">Libero diam auctor tristique <br></br> hendrerit in eu vel id nec leo amet</p>
                                <p className="text-[18px] mt-[10px] text-[#BCBCBC] underline">Explore Category </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[100%] flex pt-6 justify-center max-[650px]:w-full">
                <button className="w-[150px] h-[40px] bg-[#1053D4] text-white rounded-[8px]" onClick={()=> navigate('/shop')}>See Shop</button>
            </div>
        </motion.div>
    )
}

export default Discount