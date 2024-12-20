
const SalesPage = () => {
    return (
        <div className="w-[100%] h-auto pt-[80px] pb-[50px] flex justify-center mt-[30px] gap-[20px] bg-[#1053D4]">
            <div className="w-[100%] flex justify-center gap-[10px] max-[650px]:flex-col">
                <div className="w-[50%] flex flex-col gap-[20px] max-[650px]:w-full">
                    <p className="text-[18px] font-[300] text-[white] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px] mt-[20px]">Physiohelp shop</p>
                    <h1 className="text-[70px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-white font-Cormorant">
                        Quality equipment <br></br> for care, offered <br></br >with pride
                    </h1>
                    <p className="text-[18px] font-[300] text-[white] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px] mt-[20px]">Explore premium care equipment designed to support <br></br> recovery, mobility, and well-being.</p>
                    <div className="w-[100%] flex justify-end max-[650px]:hidden">
                        <img src="/helping.png" alt="non" className="w-[400px] flex " />
                    </div>
                </div>
                <div className="max-[650px]:w-full flex flex-col items-center max-[650px]:p-[10px]">
                    <img src="/helping2.png" alt="none" className="w-[400px] mt-[70px] flex " />
                    <span className="w-[100%] h-[250px] flex items-end justify-end max-[650px]:h-[50px] max-[650px]:justify-center">
                        <button className="bg-[white] text-[#1053D4] rounded-[4px] h-[40px] w-[220px] max-[650px]:w-[150px] max-[650px]:text-[14px]">Explore shop</button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SalesPage