import Blog from "./blog"
import Carousel from "./carousel"
import Discount from "./Discount"
import Hero from "./Hero"
import SalesPage from "./SalesPage"
import Testimonial from "./Testimonials"
import VelocityScroll from "./VelocityScroll"
import Whyus from "./Whyus"


const Body = () => {
    return (
        <div className="w-full flex flex-col items-center  bg-no-repeats max-[650px]:object-contain ">
            <div className="w-full  h-full bg-[url('/osteopathy-patoient-getting-tretment-massage.svg')] relative">
                <div className="flex w-full absolute inset-0 bg-[#00000072]"></div>

                <Hero />
            </div>
            <Carousel />
            <SalesPage />
            <Whyus />
            <Discount />
            <Testimonial />
            <VelocityScroll />
            <Blog />
        </div>
    )
}

export default Body