import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const AccountLayout = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-full mt-[100px] mb-[30px] flex flex-col items-center pb-10">
            <h1 className="text-4xl font-bold mb-8 text-center">My Account</h1>

            <div className="flex w-[100%] justify-center flex-wrap gap-10 max-[650px]:w-[90%]">
                <div className="w-[20%] bg-gray-50 p-6 rounded-lg h-[500px] max-[650px]:hidden">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <img
                                src="/path-to-profile-image.jpg"
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-xl font-bold mt-4">Sofia Havertz</h2>
                    </div>

                    <div className="space-y-2">
                        <NavLink
                            to="/user/account"
                            end
                            className={({ isActive }) =>
                                `block p-2 w-full text-left ${isActive ? 'font-bold border-b-2 border-black' : ''}`
                            }
                        >
                            Account
                        </NavLink>

                        <NavLink
                            to="/user/account/orders"
                            className={({ isActive }) =>
                                `block p-2 w-full text-left ${isActive ? 'font-bold border-b-2 border-black' : ''}`
                            }
                        >
                            Orders
                        </NavLink>

                        <NavLink
                            to="/user/account/appointments"
                            className={({ isActive }) =>
                                `block p-2 w-full text-left ${isActive ? 'font-bold border-b-2 border-black' : ''}`
                            }
                        >
                            Appointment
                        </NavLink>

                        <NavLink
                            to="/user/account/address"
                            className={({ isActive }) =>
                                `block p-2 w-full text-left ${isActive ? 'font-bold border-b-2 border-black' : ''}`
                            }
                        >
                            Address
                        </NavLink>
                        <button className="block p-2 w-full text-left text-gray-600">
                            Log Out
                        </button>
                    </div>
                </div>

                <div className="hidden max-[650px]:flex max-[650px]:flex-col max-[650px]:items-center w-full bg-gray-50 p-6 rounded-lg mb-4">
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <img
                                src="/path-to-profile-image.jpg"
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-xl font-bold mt-4">Sofia Havertz</h2>
                    </div>

                    <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-between w-full p-3 bg-white rounded-lg shadow"
                    >
                        <span className="font-medium">Account Menu</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="w-full mt-2 bg-white rounded-lg shadow p-2">
                            <div className="space-y-2">
                                <NavLink
                                    to="/user/account"
                                    end
                                    className={({ isActive }) =>
                                        `block p-2 w-full text-left ${isActive ? 'font-bold border-b-2 border-black' : ''}`
                                    }
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Account
                                </NavLink>

                                <NavLink
                                    to="/user/account/orders"
                                    className={({ isActive }) =>
                                        `block p-2 w-full text-left ${isActive ? 'font-bold border-b-2 border-black' : ''}`
                                    }
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Orders
                                </NavLink>

                                <NavLink
                                    to="/user/account/appointments"
                                    className={({ isActive }) =>
                                        `block p-2 w-full text-left ${isActive ? 'font-bold border-b-2 border-black' : ''}`
                                    }
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Appointment
                                </NavLink>

                                <NavLink
                                    to="/user/account/address"
                                    className={({ isActive }) =>
                                        `block p-2 w-full text-left ${isActive ? 'font-bold border-b-2 border-black' : ''}`
                                    }
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Address
                                </NavLink>
                                <button className="block p-2 w-full text-left text-gray-600">
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main content area */}
                <div className="w-[60%] bg-white p-6 rounded-lg shadow max-[650px]:w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AccountLayout;