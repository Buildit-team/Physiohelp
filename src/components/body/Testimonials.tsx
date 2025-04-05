import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Testimonial {
    image: string;
    review: string;
    author: string;
}

const testimonials: Testimonial[] = [
    {
        image: 'https://via.placeholder.com/150',
        review: `PhysioHelp Store is my go-to for over-the-counter medications and therapy products. They have a wide selection, and their website makes it easy to order online.`,
        author: 'Theresa J. Jones',
    },
    {
        image: 'https://via.placeholder.com/150',
        review: `Amazing customer service and quick delivery! Highly recommend PhysioHelp for therapy products.`,
        author: 'John D. Smith',
    },
    {
        image: 'https://via.placeholder.com/150',
        review: `Great experience shopping online with PhysioHelp. They have a user-friendly website and a fantastic range of products.`,
        author: 'Alice R. Brown',
    },
    {
        image: 'https://via.placeholder.com/150',
        review: `Great experience shopping online with PhysioHelp. They have a user-friendly website and a fantastic range of products.`,
        author: 'Alice R. Brown',
    },
    {
        image: 'https://via.placeholder.com/150',
        review: `Great experience shopping online with PhysioHelp. They have a user-friendly website and a fantastic range of products.`,
        author: 'Alice R. Brown',
    },
];

const TestimonialCarousel: React.FC = () => {
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
          }} className="bg-pink-500 text-white py-12 w-[100%] flex justify-center">
            <div className='w-[90%]'>
                <span>
                    <p className="text-[18px] font-[500] text-[white] font-montserrat leading-[30px] p-0 max-[650px]:text-center max-[650px]:text-[14px] max-[650px]:leading-[20px] mt-[20px]">Reviews</p>
                    <h2 className="text-[70px] p-0 m-0 max-[650px]:text-[50px] max-[425px]:text-[40px] max-[650px]:text-center text-[white] leading-none font-Cormorant">
                        Testimonials that <br />inspire us.
                    </h2>
                </span>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation={false}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index} >
                            <div className='w-full flex justify-center'>
                                <div className="flex flex-col  w-[80%] px-6 h-[220px] mt-[20px] max-[650px]:h-[300px] max-[650px]:items-center">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.author}
                                        className="w-16 h-16 rounded-full border-2 border-white mb-4"
                                    />
                                    <p className="italic max-[650px]:text-center">{testimonial.review}</p>
                                    <p className="font-light mt-4 flex justify-end underline text-[18px]">{testimonial.author}</p>
                                </div>
                                <span className='mt-[20px] max-[650px]:hidden'>
                                    <img src="/qoute.png" alt="" />
                                </span>
                            </div>

                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.div>
    );
};

export default TestimonialCarousel;
