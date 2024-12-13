import Header from "../header"
import Discount from "./Discount"
import Hero from "./Hero"
import SalesPage from "./SalesPage"
import Testimonial from "./Testimonials"
// import VelocityScroll from "./VelocityScroll"
import Whyus from "./Whyus"


const Body = () => {
    return (
        <div className="w-full  flex flex-col items-center bg-[url('/osteopathy-patoient-getting-tretment-massage.svg')] h-[80vh] max-[650px]:object-contain">
            <div className="w-full bg-[#0000007f] h-full">
                <Header />
                <Hero />
            </div>
            <SalesPage />
            <Whyus />
            <Discount />
            <Testimonial />
            {/* <VelocityScroll/> */}
        </div>
    )
}

export default Body