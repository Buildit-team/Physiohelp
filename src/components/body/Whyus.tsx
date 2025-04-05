import { motion } from "framer-motion";

const Whyus = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
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
        },
      }}
      viewport={{
        amount: 0.2, 
        once: true,
      }}
      className="w-[90%] h-auto pt-[80px] pb-[50px] flex justify-center mt-[30px] gap-[20px]"
    >
      <div className="w-[90%] flex justify-center gap-[10px] max-[650px]:flex-col">
        <div className="w-[50%] flex flex-col gap-[20px] max-[650px]:w-full">
          <p className="text-[18px] font-[300] text-[#D64779] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px] mt-[20px]">
            Why Us?
          </p>
          <h1 className="text-[70px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-[#1053D4] font-Cormorant leading-none font-bold">
            Exceptional <br></br>physiotherapy for <br></br>your wellness.
          </h1>
          <div className="w-full mt-[20px] flex flex-col gap-[30px]">
            <div className="w-[100%] flex gap-[15px] items-center max-[650px]:flex-col">
              <span className="w-[70px] h-[70px] rounded-[8px] bg-[#1053D4] flex items-center justify-center">
                <img src="/supplement.png" alt="" />
              </span>
              <span className=" flex gap-[10px] flex-col max-[650px]:items-center">
                <h1 className="p-0 m-0 font-[400] text-[18px]">
                  Wide Product Range
                </h1>
                <p className="font-light max-[650px]:text-center">
                  A diverse selection of products tailored to all <br></br> your
                  recovery and wellness needs.
                </p>
              </span>
            </div>
            <div className="w-[100%] flex gap-[15px] items-center max-[650px]:flex-col">
              <span className="w-[70px] h-[70px] rounded-[8px] bg-[#1053D4] flex items-center justify-center">
                <img src="/shield.png" alt="" />
              </span>
              <span className=" flex gap-[10px] flex-col  max-[650px]:items-center">
                <h1 className="p-0 m-0 font-[400] text-[18px]">
                  Quality Assurance
                </h1>
                <p className="font-light max-[650px]:text-center">
                  A diverse selection of products tailored to all <br></br> your
                  recovery and wellness needs.
                </p>
              </span>
            </div>
            <div className="w-[100%] flex gap-[15px] items-center max-[650px]:flex-col">
              <span className="w-[70px] h-[70px] rounded-[8px] bg-[#1053D4] flex items-center justify-center">
                <img src="/herbal.png" alt="" />
              </span>
              <span className=" flex gap-[10px] flex-col  max-[650px]:items-center">
                <h1 className="p-0 m-0 font-[400] text-[18px]">
                  Eco-Friendly Practices
                </h1>
                <p className="font-light max-[650px]:text-center">
                  A diverse selection of products tailored to all <br></br> your
                  recovery and wellness needs.
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex justify-center max-[650px]:hidden">
          <img src="/worker.png" alt="" className="h-[600px] mt-[70px]" />
        </div>
      </div>
    </motion.div>
  );
};

export default Whyus;
