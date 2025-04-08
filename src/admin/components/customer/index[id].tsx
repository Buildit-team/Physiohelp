import { MapPin, Phone, Mail, Package, PieChartIcon, ShoppingCartIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { ColumnT } from "../../../interface/addProduct";
import { Customer, CustomerOrderStats, CustomerOrderTransactionHistory } from "../../../interface/customer";
import Table from "../../../utils/Table";
import { useState } from "react";
import { useQuery } from "react-query";
import { getCustomerById, getCustomerSummaryById, getCustomerTransactionById } from "../../services/api-service";

const CustomerDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomers] = useState<Customer>();
    const [summary, setSummary] = useState<CustomerOrderStats>();
    const [transactions, setTransactions] = useState<CustomerOrderTransactionHistory[]>([]);
    const [selectedTab, setSelectedTab] = useState<'payments' | 'orders' | 'transactions'>('payments');

    useQuery(`CUSTOMER_${id}`, () => getCustomerById(id!), {
        onSuccess: (data) => {
            setCustomers(data);
        }
    });

    useQuery(`CUSTOMER_${id}_SUMMARY`, () => getCustomerSummaryById(id!), {
        onSuccess: (data) => {
            setSummary(data);
        }
    });

    useQuery([`CUSTOMER_${id}_TRANSACTION`, selectedTab], () => getCustomerTransactionById(id!, selectedTab), {
        onSuccess: (data) => {
            setTransactions(data);
        },
        staleTime: 0,
        keepPreviousData: false,
    });

    const columns: ColumnT<any>[] = selectedTab === 'payments'
        ? [
            { key: 'payment_id', header: 'Payment ID', render: (value) => `#${value}` },
            { key: 'total_price', header: 'Total', render: (value) => `$${value}` },
            {
                key: 'payment_status', header: 'Status',
                render: (value: string) => {
                    const status = typeof value === "string" ? value : "unknown";

                    return (
                        <span className={`inline-block px-2 py-1 text-sm rounded-full 
            ${status === 'completed' ? 'bg-green-100 text-green-800' :
                                status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                    );
                }
            },
            { key: 'created_at', header: 'Date', render: (value) => new Date(value).toLocaleDateString() }
        ]
        : selectedTab === 'orders'
            ? [
                { key: 'order_id', header: 'Order ID', render: (value) => `#${value}` },
                { key: 'total_price', header: 'Amount', render: (value) => `$${value}` },
                {
                    key: 'order_status', header: 'Status',
                    render: (value: string) => {
                        const status = typeof value === "string" ? value : "unknown";

                        return (
                            <span className={`inline-block px-2 py-1 text-sm rounded-full 
            ${status === 'completed' ? 'bg-green-100 text-green-800' :
                                    status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'}`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                        );
                    }
                },
                { key: 'created_at', header: 'Date', render: (value) => new Date(value).toLocaleDateString() }
            ]
            : [
                { key: 'transaction_id', header: 'Transaction ID', render: (value) => `#${value}` },
                { key: 'transaction_price', header: 'Amount', render: (value) => `$${value}` },
                {
                    key: 'transaction_status', header: 'Status',
                    render: (value: string) => {
                        const status = typeof value === "string" ? value : "unknown";

                        return (
                            <span className={`inline-block px-2 py-1 text-sm rounded-full 
            ${status === 'completed' ? 'bg-green-100 text-green-800' :
                                    status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'}`}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </span>
                        );
                    }
                },
                { key: 'created_at', header: 'Date', render: (value) => new Date(value).toLocaleDateString() }
            ];

    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' }
    ];
    return (
        <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-6 px-4 md:px-6">
            <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="w-full bg-blue-50 h-36 relative">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                        <img
                            src='/user.svg'
                            alt={customer?.name}
                            className="w-24 h-24 rounded-full object-cover border-4 border-white"
                        />
                    </div>
                </div>
                <div className="pt-16 pb-8 px-6">
                    <div className="text-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">{customer?.name}</h2>
                    </div>
                    <div className="space-y-4 flex flex-col gap-5">
                        <div className="flex items-center space-x-3 text-gray-600">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded-lg">
                                <Package className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Customer ID</p>
                                <p className="font-medium">{id}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-600">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded-lg">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">E-mail</p>
                                <p className="font-medium break-words">{customer?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-600">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded-lg">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium">
                                    {customer?.address}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3 text-gray-600">
                            <div className="flex items-center justify-center w-8 h-8 bg-gray-50 rounded-lg">
                                <Phone className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Phone Number</p>
                                <p className="font-medium">{customer?.phone_number}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-2/3 flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <span className="w-9 h-9 flex items-center justify-center bg-blue-50 rounded-lg mb-3">
                            <PieChartIcon color="blue" size={20} />
                        </span>
                        <p className="text-sm font-medium text-gray-500 mb-2">Total Orders</p>
                        <div className="text-2xl font-medium">{summary?.total_orders}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <span className="w-9 h-9 flex items-center justify-center bg-amber-50 rounded-lg mb-3">
                            <ShoppingCartIcon color="black" size={20} />
                        </span>
                        <p className="text-sm font-medium text-red-600 mb-2">Abandoned Carts</p>
                        <div className="text-2xl font-medium">
                            {summary?.abandoned_orders}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-sm font-medium text-gray-500 mb-2">Completed Order</p>
                        <div className="text-2xl font-medium">
                            {summary?.completed_orders}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <p className="text-sm font-medium text-gray-500 mb-2">Pending Order</p>
                        <div className="text-2xl font-medium">
                            {summary?.pending_orders}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">Transaction History</h2>
                    </div>
                    <div className="p-4">
                        <div className="flex flex-wrap gap-4 mb-4 border-b">
                            <button
                                onClick={() => setSelectedTab('payments')}
                                className={`pb-2 px-1 ${selectedTab === 'payments' ?
                                    'text-blue-600 border-b-2 border-blue-600 font-medium' :
                                    'text-gray-500'}`}
                            >
                                Payments
                            </button>
                            <button
                                onClick={() => setSelectedTab('orders')}
                                className={`pb-2 px-1 ${selectedTab === 'orders' ?
                                    'text-blue-600 border-b-2 border-blue-600 font-medium' :
                                    'text-gray-500'}`}
                            >
                                Orders
                            </button>
                            <button
                                onClick={() => setSelectedTab('transactions')}
                                className={`pb-2 px-1 ${selectedTab === 'transactions' ?
                                    'text-blue-600 border-b-2 border-blue-600 font-medium' :
                                    'text-gray-500'}`}
                            >
                                Transactions
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <Table
                                data={transactions}
                                columns={columns}
                                searchPlaceholder="Search transactions..."
                                filterOptions={filterOptions}
                                filterKey="payment_status"
                                dateFilterKey="created_at"
                                itemsPerPage={5}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetailsPage;