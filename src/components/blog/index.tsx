import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { getBlogs } from "../../admin/services/api-service";
import { IBlog } from "../../interface/blog";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogPage: React.FC = () => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>([]);

    const { isLoading, data } = useQuery('user_blogs', getBlogs, {
        onSuccess: (fetchedData) => {
            console.log("Fetched products:", fetchedData);
            setBlogs(fetchedData);
        },
        onError: (error: any) => {
            toast.error('Failed to fetch blogs');
            console.error('Error fetching blogs:', error);
        }
    });

    useEffect(() => {
        if (data) {
            setFilteredBlogs(data);
        }
    }, [data, searchQuery]);

    const handleSearchClick = () => {
        const filtered = blogs.filter((blog) =>
            blog.blog_topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.blog_content.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBlogs(filtered);
    };

    if (isLoading) {
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
                className="w-[100%] mt-[100px] h-auto pb-[50px] flex justify-center gap-[20px] bg-[#F3F5F7]"
            >
                <div className="w-[90%] flex flex-col items-center gap-[10px] max-[650px]:flex-col">
                    <div className="w-[90%] flex flex-col items-center gap-[20px] max-[650px]:w-full pt-[30px]">
                        <h1 className="text-[50px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] text-center max-[650px]:text-center text-[#1053D4] font-Cormorant leading-none font-bold">
                            Exploring recent <br /> research and findings
                        </h1>
                        <span className="flex gap-[20px] flex-wrap">
                            <input
                                type="text"
                                placeholder="What are you looking for "
                                className="w-[350px] py-3 px-2 outline-none rounded-[4px] bg-transparent border border-[lightgray]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button onClick={handleSearchClick} className="py-3 w-[100px] text-white bg-blue-500">Search</button>
                        </span>
                    </div>
                    <div className="w-[90%] mt-8 flex justify-center flex-wrap max-[650px]:w-full gap-[20px]" >
                        {Array(4).fill(0).map((_, index) => ( // Render a few skeletons while loading
                            <div key={index} className="w-[250px] bg-white shadow-sm flex flex-col h-[380px] mx-auto max-[650px]:w-full max-[650px]:h-[400px]">
                                <span className="w-[100%] h-[150px]">
                                    <Skeleton height="100%" width="100%" />
                                </span>
                                <span className="w-[100%] p-[20px] h-[60%] flex flex-col justify-between">
                                    <div>
                                        <Skeleton height={25} width="80%" />
                                        <Skeleton height={12} count={3} className="mt-2" />
                                    </div>
                                    <Skeleton height={20} width="40%" />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        );
    }

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
            className="w-[100%] mt-[100px] h-auto pb-[50px] flex justify-center gap-[20px] bg-[#F3F5F7]"
        >
            <div className="w-[90%] flex flex-col items-center gap-[10px] max-[650px]:flex-col">
                <div className="w-[90%] flex flex-col items-center gap-[20px] max-[650px]:w-full pt-[30px]">
                    <h1 className="text-[50px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] text-center max-[650px]:text-center text-[#1053D4] font-Cormorant leading-none font-bold">
                        Exploring recent <br /> research and findings
                    </h1>
                    <span className="flex gap-[20px] flex-wrap">
                        <input
                            type="text"
                            placeholder="What are you looking for "
                            className="w-[350px] py-3 px-2 outline-none rounded-[4px] bg-transparent border border-[lightgray]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button onClick={handleSearchClick} className="py-3 w-[100px] text-white bg-blue-500">Search</button>
                    </span>
                </div>
                <div className="w-[90%] mt-8 flex justify-center flex-wrap max-[650px]:w-full gap-[20px]" >
                    {filteredBlogs.map((blog, index) => (
                        <div key={index} className="w-[250px] bg-white shadow-sm flex flex-col h-[380px] mx-auto max-[650px]:w-full max-[650px]:h-[400px]">
                            <span className="w-[100%] h-[150px]">
                                <img
                                    src={blog?.cover_image?.image_url}
                                    alt={blog?.blog_topic}
                                    className="w-full object-cover h-[100%]"
                                />
                            </span>
                            <span className="w-[100%] p-[20px] h-[60%]">
                                <h1 className="text-[25px]">{blog?.blog_topic}</h1>
                                <p className="text-[12px] prose" dangerouslySetInnerHTML={{ __html: blog?.blog_content.slice(0, 240) as string }} />
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
                                    <Link to={`/blog/${blog?.blog_id}`} className="font-bold cursor-pointer">
                                        Read more
                                    </Link>
                                </span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPage;