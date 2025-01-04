function VelocityScroll() {
    return (
        <div className="h-[200px] w-full relative flex justify-center">
            <div className="w-[100%] overflow-hidden whitespace-nowrap">
                <div className="flex gap-[30px] h-[100px] animate-marquee max-[650px]:w-full max-[650px]:h-[60px]">
                    <span className="flex items-center w-[50%] gap-[10px] max-[650px]:w-full">
                        <img src="/logo.png" alt="logo" className="w-[450px] " />
                        <img src="/logodot.png" alt="logodot" />
                    </span>
                    <span className="flex items-center w-[50%] gap-[10px] max-[650px]:w-full">
                        <img src="/logo.png" alt="logo" className="w-[450px]" />
                        <img src="/logodot.png" alt="logodot" />
                    </span>
                </div>
                <div className="flex gap-[30px] h-[100px] animate-marquee-reverse max-[650px]:w-full max-[650px]:h-[60px]">
                    <span className="flex items-center w-[50%] gap-[10px] max-[650px]:w-full">
                        <img src="/logoreverse.png" alt="logo" className="w-[400px]" />
                        <img src="/logodot.png" alt="logodot" />
                    </span>
                    <span className="flex items-center w-[50%] gap-[10px] max-[650px]:w-full">
                        <img src="/logoreverse.png" alt="logo" className="w-[400px]" />
                        <img src="/logodot.png" alt="logodot" />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default VelocityScroll;
