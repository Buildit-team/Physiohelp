
const Blog = () => {
    return (
        <div className="w-[100%] h-auto  pb-[50px] flex justify-center mt-[30px] gap-[20px] bg-[#F3F5F7]">
            <div className="w-[90%] flex flex-col items-center gap-[10px] max-[650px]:flex-col">
                <div className="w-[100%] flex flex-col gap-[20px] max-[650px]:w-full">
                    <p className="text-[18px] font-[300] text-[#D64779] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px] mt-[20px]">Blog</p>
                    <h1 className="text-[70px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-[#1053D4] font-Cormorant">
                        Exploring recent<br></br>research and findings
                    </h1>
                </div>
                <div className="w-[70%] bg-white shadow-sm h-[200px] flex ">
                    <span className="w-[60%] p-[20px]">
                        <h1 className="text-[25px]">Health advice </h1>
                        <p className="text-[12px]">
                            Lorem ipsum dolor sit amet consectetur. Ac justo porttitor interdum purus tincidunt mauris sit quam. Amet nisl nullam morbi tristique elementum tristique sed amet amet. Et.
                        </p>
                        <span className="w-full flex justify-between mt-[20px] font-light text-[12px]">
                            <p>May 19th 2024</p>
                            <p className="font-bold cursor-pointer">Read more </p>
                        </span>
                    </span>
                    <span className="w-[40%]">
                        <img src="blogimg1.svg" alt="" className="w-full object-cover" />
                    </span>
                </div>
                <div className="w-[70%] flex justify-between">
                    <div className="w-[250px] bg-white shadow-sm flex flex-col h-[350px] ">
                        <span className="w-[100%]">
                            <img src="blogimg3.svg" alt="" className="w-full object-cover" />
                        </span>
                        <span className="w-[100%] p-[20px] h-[60%]">
                            <h1 className="text-[25px]">Health advice </h1>
                            <p className="text-[12px]">
                                Lorem ipsum dolor sit amet consectetur. Ac justo porttitor interdum purus tincidunt mauris sit quam. Amet nisl nullam morbi tristique elementum tristique sed amet amet. Et.
                            </p>
                            <span className="w-full flex justify-between mt-[20px] font-light text-[12px]">
                                <p>May 19th 2024</p>
                                <p className="font-bold cursor-pointer">Read more </p>
                            </span>
                        </span>
                    </div>
                    <div className="w-[250px] bg-white shadow-sm flex flex-col h-[350px] ">
                        <span className="w-[100%]">
                            <img src="blogimg4.svg" alt="" className="w-full object-cover" />
                        </span>
                        <span className="w-[100%] p-[20px] h-[60%]">
                            <h1 className="text-[25px]">Health advice </h1>
                            <p className="text-[12px]">
                                Lorem ipsum dolor sit amet consectetur. Ac justo porttitor interdum purus tincidunt mauris sit quam. Amet nisl nullam morbi tristique elementum tristique sed amet amet. Et.
                            </p>
                            <span className="w-full flex justify-between mt-[20px] font-light text-[12px]">
                                <p>May 19th 2024</p>
                                <p className="font-bold cursor-pointer">Read more </p>
                            </span>
                        </span>
                    </div>
                    <div className="w-[250px] bg-white shadow-sm flex flex-col h-[350px] ">
                        <span className="w-[100%]">
                            <img src="blogimg2.svg" alt="" className="w-full object-cover" />
                        </span>
                        <span className="w-[100%] p-[20px] h-[60%]">
                            <h1 className="text-[25px]">Health advice </h1>
                            <p className="text-[12px]">
                                Lorem ipsum dolor sit amet consectetur. Ac justo porttitor interdum purus tincidunt mauris sit quam. Amet nisl nullam morbi tristique elementum tristique sed amet amet. Et.
                            </p>
                            <span className="w-full flex justify-between mt-[20px] font-light text-[12px]">
                                <p>May 19th 2024</p>
                                <p className="font-bold cursor-pointer">Read more </p>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog