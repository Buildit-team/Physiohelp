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
            <div className="w-full bg-[#00000089] h-full bg-[url('/osteopathy-patoient-getting-tretment-massage.svg')]">
                <Hero />
            </div>
            <Carousel/>
            <SalesPage />
            <Whyus />
            <Discount />
            <Testimonial />
            <VelocityScroll/>
            <Blog/>
        </div>
    )
}

export default Body