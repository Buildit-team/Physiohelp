
const carousel = () => {
  return (
    <div className="w-[95%] flex justify-center items-center gap-[30px] max-[650px]:flex-col max-[650px]:h-[400px] scrollbar-hide">
    <div className="w-[100%] flex justify-center gap-[30px] overflow-x-auto whitespace-nowrap ">
        <div className="bg-white w-[280px] h-[280px] shadow-lg p-[30px] overflow-y-hidden flex-shrink-0 flex flex-col gap-[20px] max-[650px]:w-[100%]">
            <span className="w-[60px] h-[60px] rounded-[50%] bg-[#1053D4] flex p-[10px] items-center justify-center">
                <img src="/cool.svg" alt="" className="w-[30px] h-[30px]" />
            </span>
            <p className="font-montserrat">Online Appointment</p>
            <span className="w-[60px] h-[2px] flex bg-[#1053d4]"></span>
            <p className="text-[14px] font-[300] text-[grey] font-montserrat leading-[20px]">
                The gradual accumulation of<br></br>
                information about atomic and<br></br>
                small-scale behaviour...</p>
        </div>
        <div className="bg-white w-[280px] h-[280px] shadow-lg p-[30px] overflow-y-hidden flex-shrink-0 flex flex-col gap-[20px] max-[650px]:w-[100%]">
            <span className="w-[60px] h-[60px] rounded-[50%] bg-[#1053D4] flex p-[10px] items-center justify-center">
                <img src="/rope.svg" alt="" className="w-[40px] h-[30px]" />
            </span>
            <p className="font-montserrat">Medical E-commerce</p>
            <span className="w-[60px] h-[2px] flex bg-[#1053d4]"></span>
            <p className="text-[14px] font-[300] text-[grey] font-montserrat leading-[20px]">
                The gradual accumulation of<br></br>
                information about atomic and<br></br>
                small-scale behaviour...</p>
        </div>
        <div className="bg-white w-[280px] h-[280px] shadow-lg p-[30px] overflow-y-hidden flex-shrink-0 flex flex-col gap-[20px] max-[650px]:w-[100%]">
            <span className="w-[60px] h-[60px] rounded-[50%] bg-[#1053D4] flex p-[10px] items-center justify-center">
                <img src="/history.svg" alt="" className="w-[30px] h-[30px]" />
            </span>
            <p className="font-montserrat">Care Care</p>
            <span className="w-[60px] h-[2px] flex bg-[#1053d4]"></span>
            <p className="text-[14px] font-[300] text-[grey] font-montserrat leading-[20px]">
                The gradual accumulation of<br></br>
                information about atomic and<br></br>
                small-scale behaviour...</p>
        </div>
    </div>
</div>
  )
}

export default carousel