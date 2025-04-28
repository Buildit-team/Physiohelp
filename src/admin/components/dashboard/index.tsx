import React, { useState } from 'react';
import { ChevronDown, ShoppingCart, Users, ShoppingBag } from 'lucide-react';
import StatCard from './StatCard';
import OrderCard from './OrderCard';
import SalesBarChart from './SalesChart';
import { Order, SalesDataPoint } from '../../../interface/dashboard';


const Dashboard: React.FC = () => {
    const [timeFrame] = useState('This Week');
    const [activeTab, setActiveTab] = useState('Sales');
    const [daysRange] = useState('Last 7 Days');
    const [orderFilter, setOrderFilter] = useState('All');

    const orders: Order[] = [
        { id: 1, product: 'Massage Chair', price: 126000, status: 'Pending', date: '23 Feb 2024', image: 'chair-black' },
        { id: 2, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-controller' },
        { id: 3, product: 'Massage Chair', price: 126000, status: 'Pending', date: '23 Feb 2024', image: 'chair-black' },
        { id: 4, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-round' },
        { id: 5, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-controller' },
        { id: 6, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-controller' },
        { id: 7, product: 'Massage Chair', price: 126000, status: 'Pending', date: '23 Feb 2024', image: 'chair-round' },
        { id: 8, product: 'Massage Chair', price: 126000, status: 'Completed', date: '23 Feb 2024', image: 'chair-black' },
        { id: 9, product: 'Massage Chair', price: 126000, status: 'Pending', date: '23 Feb 2024', image: 'chair-round' },
    ];

    const salesData: SalesDataPoint[] = [
        { day: 'Sept 10', value: 50 },
        { day: 'Sept 11', value: 65 },
        { day: 'Sept 12', value: 70 },
        { day: 'Sept 13', value: 30 },
        { day: 'Sept 14', value: 25 },
        { day: 'Sept 15', value: 35 },
        { day: 'Sept 16', value: 50 },
    ];

    const filteredOrders = orderFilter === 'All'
        ? orders
        : orders.filter(order => order.status === orderFilter);

    return (
        <div className="bg-gray-50 min-h-screen p-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Cart"
                    icon={<ShoppingCart className="text-blue-600" size={20} />}
                    mainStat={{
                        label: "Abandoned Cart",
                        value: "20%",
                        change: "+0.00%"
                    }}
                    secondaryStat={{
                        label: "Customers",
                        value: 30
                    }}
                    timeFrame={timeFrame}
                />

                <StatCard
                    title="Customers"
                    icon={<Users className="text-blue-600" size={20} />}
                    mainStat={{
                        label: "Customers",
                        value: "1,250",
                        change: "+15.80%"
                    }}
                    secondaryStat={{
                        label: "Active",
                        value: "1,180",
                        change: "-4.90%"
                    }}
                    timeFrame={timeFrame}
                />

                <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <ShoppingBag className="text-blue-600" size={20} />
                            </div>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm">
                            <span>{timeFrame}</span>
                            <ChevronDown size={16} />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="text-gray-500 text-sm">All Orders</div>
                            <div className="text-2xl font-semibold mt-1">10</div>
                        </div>
                        <div>
                            <div className="text-gray-500 text-sm">Pending</div>
                            <div className="text-2xl font-semibold mt-1">3</div>
                        </div>
                        <div>
                            <div className="text-gray-500 text-sm">Completed</div>
                            <div className="flex items-end mt-1">
                                <div className="text-2xl font-semibold">7</div>
                                <div className="text-green-500 text-xs ml-1">+0.00%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-white rounded-lg p-6 shadow-sm lg:col-span-2">
                    <div className="flex justify-between mb-6">
                        <div className="flex space-x-6">
                            <button
                                className={`${activeTab === 'Summary' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'} pb-2`}
                                onClick={() => setActiveTab('Summary')}
                            >
                                Summary
                            </button>
                            <button
                                className={`${activeTab === 'Sales' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'} pb-2`}
                                onClick={() => setActiveTab('Sales')}
                            >
                                Sales
                            </button>
                        </div>
                        <div className="flex items-center text-gray-400 text-sm border rounded-md px-3 py-1">
                            <span>{daysRange}</span>
                            <ChevronDown size={16} className="ml-2" />
                        </div>
                    </div>

                    <div className="h-64">
                        <SalesBarChart data={salesData} />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="font-semibold text-lg">Recent Orders</h3>
                        <div className="flex items-center text-gray-400 text-sm">
                            <span
                                className="cursor-pointer"
                                onClick={() => setOrderFilter('All')}
                            >
                                All
                            </span>
                            <ChevronDown size={16} className="ml-2" />
                        </div>
                    </div>
                    <div className="max-h-[500px] overflow-y-auto">
                        {filteredOrders.map((order) => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

