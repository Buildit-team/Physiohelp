import { useNavigate } from "react-router-dom"

const Hero = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full p-2 flex items-center flex-col relative">
            <div className="w-[90%] h-[90vh] flex max-[650px]:w-full items-end">
                <div className="w-[60%] h-[80%] flex justify-center  flex-col gap-[20px] max-[650px]:w-[100%] ">
                    <h1 className="text-[70px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-white font-Cormorant">
                    Are you in pains? <br></br>Or you can't move your limbs?
                    </h1>
                    <p className="text-[18px] font-[300] text-[white] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px]">
                        Physiohelp will help you with expert treatment From Highly Qualified Physiotherapist.
                        Get your self booked now!!!
                    </p>
                    <span className="gap-2 flex max-[650px]:justify-center max-[650px]:w-full">
                        <button className="bg-[white] text-[#1053D4] rounded-[4px] h-[50px] w-[180px] max-[650px]:w-[150px] max-[650px]:text-[14px]" onClick={()=> navigate('/appointment')}>Schedule a session</button>
                        <button className="border-[white] border  rounded-[4px] text-[white] h-[50px] w-[150px] max-[650px]:w-[100px] max-[650px]:text-[14px]">Learn more</button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Hero