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
import { useNavigate } from "react-router-dom";

const Blog: React.FC = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  const { isLoading, isError } = useQuery('user_blogs', getBlogs, {
    onSuccess: (fetchedData) => {
      setBlogs(fetchedData);
    },
    onError: (error: any) => {
      toast.error('Failed to fetch blogs');
      console.error('Error fetching blogs:', error);
    }
  });

  const FeaturedBlogSkeleton = () => (
    <div className="w-[70%] bg-white shadow-sm h-[200px] flex animate-pulse max-[650px]:hidden">
      <span className="w-[60%] p-[20px]">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="mt-[20px] flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </span>
      <span className="w-[40%] bg-gray-200"></span>
    </div>
  );

  const BlogCardSkeleton = () => (
    <div className="w-[250px] bg-white shadow-sm flex flex-col h-[380px] mx-auto max-[650px]:w-full max-[650px]:h-[400px] animate-pulse">
      <span className="w-[100%] h-[100px] bg-gray-200"></span>
      <span className="w-[100%] p-[20px] h-[60%]">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="mt-[20px] flex justify-between">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </span>
    </div>
  );

  const ErrorState = () => (
    <div className="w-[70%] bg-white shadow-sm py-8 px-4 text-center rounded max-[650px]:w-full">
      <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Failed to Load Blogs</h3>
      <p className="text-gray-600 mb-4">We couldn't load the blog posts at this time.</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

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
        amount: 0.2,
        once: true,
      }}
      className="w-[100%] h-auto pb-[50px] flex justify-center mt-[30px] gap-[20px] bg-[#F3F5F7]"
    >
      <div className="w-[90%] flex flex-col items-center gap-[10px] max-[650px]:flex-col">
        <div className="w-[90%] flex flex-col gap-[20px] max-[650px]:w-full">
          <p className="text-[18px] font-[300] text-[#D64779] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px] mt-[20px]">
            Blog
          </p>
          <h1 className="text-[70px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-[#1053D4] font-Cormorant leading-none font-bold">
            Exploring recent <br /> research and findings
          </h1>
        </div>

        {isError ? (
          <ErrorState />
        ) : isLoading ? (
          <FeaturedBlogSkeleton />
        ) : blogs.length > 0 ? (
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
                    <p className="font-bold cursor-pointer" onClick={() => navigate(`/blog/${blogs[0]?.blog_id}`)}>Read more</p>
              </span>
            </span>
            <span className="w-[40%]">
              <img src={blogs[0]?.cover_image?.image_url || "blogimg1.svg"} alt="" className="w-full h-full object-cover" />
            </span>
          </div>
        ) : (
          <div className="w-[70%] bg-white shadow-sm py-8 px-4 text-center rounded max-[650px]:w-full">
            <p className="text-gray-600">No blog posts available at the moment.</p>
          </div>
        )}

        <div className="w-[70%] mt-8 max-[650px]:w-full">
          {isError ? null : isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            blogs.length > 0 ? (
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
                          src={blog?.cover_image?.image_url || "blogimg1.svg"}
                          alt={blog?.blog_topic}
                          className="w-full object-cover h-[100%]"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "blogimg1.svg";
                          }}
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
                          <p className="font-bold cursor-pointer" onClick={() => navigate(`/blog/${blogs[0]?.blog_id}`)}>Read more</p>
                        </span>
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Blog;