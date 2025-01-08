import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Carousel = () => {
    return (
        <div className="w-[100%] flex justify-center items-center max-[650px]:h-[300px]">
            <div className='w-[90%] flex items-center justify-center h-[300px]'>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={10}
                    // navigation
                    // pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    breakpoints={{
                        650: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                    }}
                >
                    <SwiperSlide>
                        <div className="bg-white w-[280px] h-[280px] shadow-lg p-[30px] overflow-y-hidden flex flex-col gap-[20px] max-[650px]:w-[100%]">
                            <span className="w-[60px] h-[60px] rounded-[50%] bg-[#1053D4] flex p-[10px] items-center justify-center">
                                <img src="/cool.svg" alt="cool" className="w-[30px] h-[30px]" />
                            </span>
                            <p className="font-montserrat">Online Appointment</p>
                            <span className="w-[60px] h-[2px] flex bg-[#1053d4]"></span>
                            <p className="text-[14px] font-[300] text-[grey] font-montserrat leading-[20px]">
                                The gradual accumulation of<br />
                                information about atomic and<br />
                                small-scale behaviour...
                            </p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="bg-white w-[280px] h-[280px] shadow-lg p-[30px] overflow-y-hidden flex flex-col gap-[20px] max-[650px]:w-[100%]">
                            <span className="w-[60px] h-[60px] rounded-[50%] bg-[#1053D4] flex p-[10px] items-center justify-center">
                                <img src="/health.svg" alt="rope" className="w-[40px] h-[30px]" />
                            </span>
                            <p className="font-montserrat">Health Care</p>
                            <span className="w-[60px] h-[2px] flex bg-[#1053d4]"></span>
                            <p className="text-[14px] font-[300] text-[grey] font-montserrat leading-[20px]">
                                The gradual accumulation of<br />
                                information about atomic and<br />
                                small-scale behaviour...
                            </p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="bg-white w-[280px] h-[280px] shadow-lg p-[30px] overflow-y-hidden flex flex-col gap-[20px] max-[650px]:w-[100%]">
                            <span className="w-[60px] h-[60px] rounded-[50%] bg-[#1053D4] flex p-[10px] items-center justify-center">
                                <img src="/care.svg" alt="history" className="w-[30px] h-[30px]" />
                            </span>
                            <p className="font-montserrat">Counselling</p>
                            <span className="w-[60px] h-[2px] flex bg-[#1053d4]"></span>
                            <p className="text-[14px] font-[300] text-[grey] font-montserrat leading-[20px]">
                                The gradual accumulation of<br />
                                information about atomic and<br />
                                small-scale behaviour...
                            </p>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="bg-white w-[280px] h-[280px] shadow-lg p-[30px] overflow-y-hidden flex flex-col gap-[20px] max-[650px]:w-[100%]">
                            <span className="w-[60px] h-[60px] rounded-[50%] bg-[#1053D4] flex p-[10px] items-center justify-center">
                                <img src="/counsel.svg" alt="history" className="w-[30px] h-[30px]" />
                            </span>
                            <p className="font-montserrat">Free Shipping</p>
                            <span className="w-[60px] h-[2px] flex bg-[#1053d4]"></span>
                            <p className="text-[14px] font-[300] text-[grey] font-montserrat leading-[20px]">
                                The gradual accumulation of<br />
                                information about atomic and<br />
                                small-scale behaviour...
                            </p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Carousel;
