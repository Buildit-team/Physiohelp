import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const SalesPage = () => {
  const navigate = useNavigate();
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
          delay: 0.5,
        }
      }}
      viewport={{
        amount: 0.2,
        once: true,
      }} className="w-[100%] h-auto  flex-col pt-[80px] pb-[50px] flex justify-center mt-[30px] gap-[20px] bg-[#1053D4]">
      <div className="w-[100%] flex justify-center gap-[10px] max-[650px]:flex-col">
        <div className="w-[50%] flex flex-col max-[650px]:w-full pr-4 pb-8">
          <h1 className="text-[100px] max-[1024px]:text-[80px] max-[650px]:text-[50px] max-[425px]:text-[30px] max-[650px]:text-center text-white font-Cormorant">
            What We Do.
          </h1>
          <p className="text-[18px] font-[400] text-[#FFFFFF] font-montserrat max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px]">
            Physiohelp transforms lives by offering a one stop solution for
            physiotherapy needs, including expert treatments and guidance from
            qualified physiotherapists dedicated to helping you overcome pain
            and neurological disability through natural, non-invasive methods,
            and minimizing the need for surgery or medications.
          </p>
          <div className="w-[100%] flex justify-end max-[650px]:hidden mt-[40px]">
            <img src="/helping.png" alt="non" className="w-[400px] flex " />
          </div>
        </div>
        <div className="max-[650px]:w-full flex flex-col items-center max-[650px]:p-[10px]">
          <img
            src="/helping2.png"
            alt="none"
            className="w-[400px] mt-[70px] flex "
          />
          <span className="w-[100%] h-[250px] flex items-end justify-end max-[650px]:h-[50px] max-[650px]:justify-center">
            <button
              className="bg-[white] text-[#1053D4] font-bold rounded-[4px] h-[40px] w-[220px] max-[650px]:w-[150px] max-[650px]:text-[14px]"
              onClick={() => navigate("/shop")}
            >
              Explore shop
            </button>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default SalesPage;
