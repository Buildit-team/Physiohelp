/* eslint-disable @typescript-eslint/no-explicit-any */
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
    let type = 'payments'
    useQuery(`CUSTOMER_${id}`, () => getCustomerById(id!), {
        onSuccess: (data) => {
            console.log("Customer", data)
            setCustomers(data);

        }
    });

    useQuery(`CUSTOMER_${id}_SUMMARY`, () => getCustomerSummaryById(id!), {
        onSuccess: (data) => {
            console.log("Summary", data)
            setSummary(data);

        }
    });

    useQuery(`CUSTOMER_${id}_TRANSACTION`, () => getCustomerTransactionById(id!, type), {
        onSuccess: (data) => {
            console.log("trnasaction", data)
            setTransactions(data);

        }
    });

    const columns: ColumnT<CustomerOrderTransactionHistory>[] = [
        {
            key: 'payment_id',
            header: 'Order ID',
            sortable: false,
            searchable: true,
            render: (value) => `#${value}`
        },
        {
            key: 'total_price',
            header: 'Total',
            sortable: false,
            searchable: false,
            render: (value) => `$${value}`
        },
        {
            key: 'payment_status',
            header: 'Status',
            sortable: false,
            searchable: true,
            render: (value) => (
                <span className={`inline-block px-2 py-1 text-sm rounded-full
                    ${value === 'completed' ? 'bg-green-100 text-green-800' :
                        value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'}`}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
            )
        },
        {
            key: 'created_at',
            header: 'Date',
            sortable: false,
            searchable: false,
            render: (value) => new Date(value).toLocaleDateString()
        }
    ];

    const filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Completed', value: 'completed' },
        { label: 'Pending', value: 'pending' }
    ];
    return (
        <div className=" w-full justify-between flex ">
            <div className="w-[30%] bg-white rounded-lg shadow-sm overflow-hidden">
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
                    <div className="space-y-4 flex flex-col gap-[20px]">
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
                                <p className="font-medium">{customer?.email}</p>
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
            <div className="w-[70%]">
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="bg-white p-4 rounded-lg shadow-md w-[350px] ">
                        <span className="w-[35px] h-[35px] flex items-center justify-center bg-[#E1E7FF] rounded-[8px] mb-[10px]">
                            <PieChartIcon color="blue" size={24} />
                        </span>
                        <p className="text-sm font-medium text-gray-500 mb-2">Total Orders</p>
                        <div className="text-2xl font-medium">{summary?.total_orders}</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md w-[350px] ">
                        <span className="w-[35px] h-[35px] flex items-center justify-center bg-[#FFF5EA] rounded-[8px] mb-[10px]">
                            <ShoppingCartIcon color="black" size={24} />
                        </span>
                        <p className="text-sm font-medium text-[#CC5F5F] mb-2">Abandoned Carts</p>
                        <div className="text-2xl font-medium">
                            {summary?.abandoned_orders}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md w-[350px] ">
                        <p className="text-sm font-medium text-gray-500 mb-2">Completed Order</p>
                        <div className="text-2xl font-medium">
                            {summary?.completed_orders}
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md w-[350px] ">
                        <p className="text-sm font-medium text-gray-500 mb-2">Pending Order</p>
                        <div className="text-2xl font-medium">
                            {summary?.pending_orders}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm w-[100%]">
                    <div className="p-4">
                        <h2 className="text-lg font-semibold">Transaction History</h2>
                    </div>
                    <div className="p-4">
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
    );
};

export default CustomerDetailsPage;