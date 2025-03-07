import { RxDashboard } from "react-icons/rx";
import { SiHackthebox } from "react-icons/si";
import { IoBagRemoveOutline } from "react-icons/io5";
import { SlPeople } from "react-icons/sl";
import { HiOutlineFolderMinus } from "react-icons/hi2";
import { IoReaderOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { CiWallet } from "react-icons/ci";

const Sidebar = ({ onClose }: { onClose: () => void }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full flex bg-[#1053D4] h-full">
            <div className="w-[90%] mt-[20px] relative">
                <button
                    onClick={onClose}
                    className="md:hidden absolute top-0 right-4 text-white text-2xl"
                >
                    <RxCross2 />
                </button>

                <span>
                    <img src="/newlogo.svg" alt="Logo" />
                </span>
                <div className="w-full mt-[40px] flex flex-col items-center gap-[30px]">
                    <span
                        className="w-[80%] h-[60px] cursor-pointer flex gap-[10px] items-center text-white"
                        onClick={() => {
                            navigate("/admin")
                            onClose()
                        }}
                    >
                        <RxDashboard />
                        <p>Dashboard</p>
                    </span>
                    <span
                        className="w-[80%] h-[60px] cursor-pointer flex gap-[10px] items-center text-white"
                        onClick={() => {
                            navigate("/admin")
                            onClose()
                        }}
                    >
                        <CiWallet />
                        <p>Wallet</p>
                    </span>
                    <span
                        className="w-[80%] h-[60px] cursor-pointer flex gap-[10px] items-center text-white"
                        onClick={() => {
                            navigate("/admin/product")
                            onClose()
                        }}
                    >
                        <SiHackthebox />
                        <p>Product Management</p>
                    </span>
                    <span
                        className="w-[80%] h-[60px] cursor-pointer flex gap-[10px] items-center text-white"
                        onClick={() => {
                            navigate("/admin/order")
                            onClose()
                        }}
                    >
                        <IoBagRemoveOutline />
                        <p>Order Management</p>
                    </span>
                    <span
                        className="w-[80%] h-[60px] cursor-pointer flex gap-[10px] items-center text-white"
                        onClick={() => {
                            navigate("/admin/customer")
                            onClose()
                        }}
                    >
                        <SlPeople />
                        <p>Customer Management</p>
                    </span>
                    <span
                        className="w-[80%] h-[60px] cursor-pointer flex gap-[10px] items-center text-white"
                        onClick={() => {
                            navigate("/admin/report")
                            onClose()
                        }}
                    >
                        <HiOutlineFolderMinus />
                        <p>Reports</p>
                    </span>
                    <span
                        className="w-[80%] h-[60px] cursor-pointer flex gap-[10px] items-center text-white"
                        onClick={() => {
                            navigate("/admin/blog")
                            onClose()
                        }}
                    >
                        <IoReaderOutline />
                        <p>Blog</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;