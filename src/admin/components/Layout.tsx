import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../sidebar";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { routeTitleMap } from "../../utils/routeTitle";
import { useQuery } from 'react-query';
import { getAdmin } from '../services/api-service';

const Layout = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const { data } = useQuery('user', () => getAdmin());

    useEffect(() => {
        const title = routeTitleMap[location.pathname] || "Admin";
        document.title = title;
    }, [location.pathname]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const currentTitle = routeTitleMap[location.pathname] || "Admin";
    const adminName = data?.data?.name;

    return (
        <div className="w-full flex h-screen">
            <div
                className={`fixed md:fixed top-0 left-0 w-[22%] max-[650px]:w-[80%] h-screen bg-[#1053D4] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    } z-40`}
            >
                <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
            <div className="flex w-full md:w-[78%] md:ml-[22%] flex-col gap-[20px]">
                <div className="sticky top-0 w-full h-auto min-h-[70px] flex justify-center bg-white shadow-sm z-100">
                    <div className="flex w-full px-4 md:w-[95%] h-full items-center py-3">
                        <span className="md:hidden flex items-center ml-8">
                            <p className="text-lg font-medium">{currentTitle}</p>
                        </span>
                        <span className="hidden md:flex w-[20%] items-center">
                            <p className="text-xl font-medium">{currentTitle}</p>
                        </span>
                        <div className="flex-1 md:w-[80%] flex justify-end gap-3 md:gap-[10px] items-center">
                            <span className="flex items-center justify-center px-3 py-1.5 rounded-[8px] bg-[#E1E6FF]">
                                <p className="text-sm md:text-base">{adminName}</p>
                            </span>
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <IoMdNotificationsOutline className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full h-auto flex justify-center">
                    <div className="flex w-[95%] h-full max-[650px]:w-full">
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="md:hidden fixed top-4 left-2 z-50">
                <button onClick={toggleSidebar} className="p-2 rounded-lg bg-white shadow-md">
                    <RxHamburgerMenu className="text-[#1053D4]" />
                </button>
            </div>
        </div>
    );
};

export default Layout;