import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getBlogs } from "../../admin/services/api-service";
import { IBlog } from "../../interface/blog";

const Blog: React.FC = () => {


  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useQuery('user_blogs', getBlogs, {
    onSuccess: (fetchedData) => {
      console.log("Fetched products:", fetchedData);
      setBlogs(fetchedData);
    },
    onError: (error: any) => {
      toast.error('Failed to fetch blogs');
      console.error('Error fetching blogs:', error);
    }
  });
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
      }} className="w-[100%] h-auto pb-[50px] flex justify-center mt-[30px] gap-[20px] bg-[#F3F5F7]">
      <div className="w-[90%] flex flex-col items-center gap-[10px] max-[650px]:flex-col">

        <div className="w-[90%] flex flex-col gap-[20px] max-[650px]:w-full">
          <p className="text-[18px] font-[300] text-[#D64779] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px] mt-[20px] ">
            Blog
          </p>
          <h1 className="text-[70px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-[#1053D4] font-Cormorant leading-none font-bold">
            Exploring recent <br /> research and findings
          </h1>
        </div>
        <div className="w-[70%] bg-white shadow-sm h-[200px] flex max-[650px]:hidden">
          <span className="w-[60%] p-[20px]">
            <h1 className="text-[25px]">{blogs[0]?.blog_topic}</h1>
            <p className="text-[12px] prose" dangerouslySetInnerHTML={{ __html: blogs[0]?.blog_content.slice(0, 240) }} />
            <span className="w-full flex justify-between mt-[20px] font-light text-[12px]">
              <p>{new Date(blogs[0]?.created_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).replace(/(\d+)(?=\s)/, (day) => {
                const suffix = ["th", "st", "nd", "rd"][(+day % 10 > 3 || Math.floor(+day % 100 / 10) === 1) ? 0 : +day % 10];
                return day + suffix;
              })}
              </p>
              <p className="font-bold cursor-pointer">Read more</p>
            </span>
          </span>
          <span className="w-[40%]">
            <img src="blogimg1.svg" alt="" className="w-full object-cover" />
          </span>
        </div>
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
                  <span className="w-[100%] h-[100px]">
                    <img
                      src={blog?.cover_image?.image_url}
                      alt={blog?.blog_topic}
                      className="w-full object-cover h-[100%]"
                    />
                  </span>
                  <span className="w-[100%] p-[20px] h-[60%]">
                    <h1 className="text-[25px]">{blog?.blog_topic}</h1>
                    <p className="text-[12px] prose" dangerouslySetInnerHTML={{ __html: blog?.blog_content.slice(0, 240) }} />
                    <span className="w-full flex justify-between mt-[20px] font-light text-[12px]">
                      <p>{new Date(blog?.created_at).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).replace(/(\d+)(?=\s)/, (day) => {
                        const suffix = ["th", "st", "nd", "rd"][(+day % 10 > 3 || Math.floor(+day % 100 / 10) === 1) ? 0 : +day % 10];
                        return day + suffix;
                      })}
                      </p>
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
