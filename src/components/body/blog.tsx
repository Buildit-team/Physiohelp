import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const blogs = [
  {
    image: "blogimg3.svg",
    title: "Health advice",
    description: `Lorem ipsum dolor sit amet consectetur. Ac justo porttitor interdum purus tincidunt mauris sit quam. Amet nisl nullam morbi tristique elementum tristique sed amet amet. Et.`,
    date: "May 19th 2024",
  },
  {
    image: "blogimg4.svg",
    title: "Fitness tips",
    description: `Lorem ipsum dolor sit amet consectetur. Ac justo porttitor interdum purus tincidunt mauris sit quam. Amet nisl nullam morbi tristique elementum tristique sed amet amet. Et.`,
    date: "June 10th 2024",
  },
  {
    image: "blogimg2.svg",
    title: "Mental health",
    description: `Lorem ipsum dolor sit amet consectetur. Ac justo porttitor interdum purus tincidunt mauris sit quam. Amet nisl nullam morbi tristique elementum tristique sed amet amet. Et.`,
    date: "July 5th 2024",
  },
];

const Blog: React.FC = () => {
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
      amount: 0.2, // Changed from "some" to a numeric value
      once: true,
    }} className="w-[100%] h-auto pb-[50px] flex justify-center mt-[30px] gap-[20px] bg-[#F3F5F7]">
      <div className="w-[90%] flex flex-col items-center gap-[10px] max-[650px]:flex-col">
        {/* Blog Header */}
        <div className="w-[90%] flex flex-col gap-[20px] max-[650px]:w-full">
          <p className="text-[18px] font-[300] text-[#D64779] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px] mt-[20px] font-bold">
            Blog
          </p>
          <h1 className="text-[70px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-[#1053D4] font-Cormorant leading-none font-bold">
            Exploring recent <br /> research and findings
          </h1>
        </div>

        {/* Highlighted Blog */}
        <div className="w-[70%] bg-white shadow-sm h-[200px] flex max-[650px]:hidden">
          <span className="w-[60%] p-[20px]">
            <h1 className="text-[25px]">Health advice</h1>
            <p className="text-[12px]">
              Lorem ipsum dolor sit amet consectetur. Ac justo porttitor
              interdum purus tincidunt mauris sit quam. Amet nisl nullam morbi
              tristique elementum tristique sed amet amet. Et.
            </p>
            <span className="w-full flex justify-between mt-[20px] font-light text-[12px]">
              <p>May 19th 2024</p>
              <p className="font-bold cursor-pointer">Read more</p>
            </span>
          </span>
          <span className="w-[40%]">
            <img src="blogimg1.svg" alt="" className="w-full object-cover" />
          </span>
        </div>

        {/* Horizontal Blog Swiper */}
        <div className="w-[70%] mt-8 max-[650px]:w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            loop
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={index}>
                <div className="w-[250px] bg-white shadow-sm flex flex-col h-[380px] mx-auto max-[650px]:w-full max-[650px]:h-[400px]">
                  <span className="w-[100%]">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full object-cover"
                    />
                  </span>
                  <span className="w-[100%] p-[20px] h-[60%]">
                    <h1 className="text-[25px]">{blog.title}</h1>
                    <p className="text-[12px]">{blog.description}</p>
                    <span className="w-full flex justify-between mt-[20px] font-light text-[12px]">
                      <p>{blog.date}</p>
                      <p className="font-bold cursor-pointer">Read more</p>
                    </span>
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;
