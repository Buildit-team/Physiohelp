import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../sidebar";
import { IoMdNotificationsOutline } from "react-icons/io";

const Layout = () => {
    const location = useLocation();
    const [currentTitle, setCurrentTitle] = useState("Dashboard");
    const routeTitleMap: { [key: string]: string } = {
        "/admin": "Dashboard",
        "/admin/product": "Product",
        "/admin/order": "Order",
        "/admin/customer": 'Customer',
        "/admin/report": 'Report',
        "/admin/blog": 'Blog'
    };

    useEffect(() => {
        const title = routeTitleMap[location.pathname] || "Admin";
        setCurrentTitle(title)
        document.title = title;
    }, [location.pathname]);

    return (
        <div className="w-full flex h-screen">
            <div className="flex w-[20%]">
                <Sidebar />
            </div>
            <div className="flex w-[80%] flex-col">
                <div className="w-full h-[8%] flex justify-center">
                    <div className="flex w-[95%] h-full">
                        <span className="flex w-[20%] items-center">
                            <p className="text-[20px]">{currentTitle}</p>
                        </span>
                        <div className="w-[80%] flex justify-end gap-[10px] items-center">
                            <span className="w-[120px] h-[30px] flex items-center justify-center rounded-[8px] bg-[#E1E6FF]">
                                <p>Admin Yusuf</p>
                            </span>
                            <IoMdNotificationsOutline size={25} />
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto flex justify-center">
                    <div className="flex w-[95%] h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;