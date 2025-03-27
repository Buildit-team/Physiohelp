import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ 
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
        amount: 0.2, // Changed from "some" to a numeric value
        once: true,
      }}
      className={`w-full p-2 flex items-center flex-col relative`}
    >
      <div className="w-[90%] h-[100vh] flex max-[650px]:w-full items-end">
        <div className="w-[60%] h-[80%] flex justify-center flex-col gap-[20px] max-[650px]:w-[100%]">
          <h1 className="text-[90px] leading-none font-bold p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-white font-Cormorant">
            Does your body hurt? <br /> Get Physiotherapy for Swift Recovery
          </h1>
          <p className="text-[18px] leading-8 font-[500] text-[white] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px]">
            PhysioHelp is dedicated to guiding you on a journey to rediscover
            your best movement, build lasting strength, and live a pain-free,
            active, and fulfilling life.
          </p>
          <span className="gap-2 flex max-[650px]:justify-center max-[650px]:w-full">
            <button
              className="bg-[white] font-[500] text-[#1053D4] rounded-[4px] h-[50px] w-[180px] max-[650px]:w-[150px] max-[650px]:text-[14px]"
              onClick={() => navigate("/appointment")}
            >
              Schedule a session
            </button>
            <button className="border-[white] font-[500] border rounded-[4px] text-[white] h-[50px] w-[150px] max-[650px]:w-[100px] max-[650px]:text-[14px]">
              Learn more
            </button>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
