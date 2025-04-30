import { useMemo, useState, useEffect } from "react";
import Table from "../../../utils/Table";
import { ColumnT } from "../../../interface/addProduct";
import { getAllOrder } from "../../services/api-service";
import { useQuery } from "react-query";
import { Order } from "../../../interface/order";
import { formatNumber } from "../../../utils/formatNumbers";

const OrderManagement = () => {
    const [order, setOrder] = useState<Order[]>([]);
    const baseLimit = 10;
    const [pagination, setPagination] = useState({
        currentPage: 1,
        limit: baseLimit,
        totalItems: 0
    })

    const calculateOffset = (page: number) => (page - 1) * baseLimit;

    const offset = calculateOffset(pagination.currentPage);
    const limit = offset + baseLimit;

    const { isLoading, data: apiResponse } = useQuery(
        ["ORDER", offset, pagination.limit],
        () => getAllOrder(offset, limit),
        {
            keepPreviousData: true
        }
    );

    useEffect(() => {
        if (apiResponse) {
            if (Array.isArray(apiResponse)) {
                setOrder(apiResponse);
                setPagination(prev => ({
                    ...prev,
                    totalItems: apiResponse.length
                }));
            } else if (apiResponse.data) {
                setOrder(apiResponse.data);
                const totalItems = apiResponse.total || apiResponse.totalItems || apiResponse.data.length;
                setPagination(prev => ({
                    ...prev,
                    totalItems: totalItems
                }));
            } else {
                console.error("Unexpected API response structure:", apiResponse);
                setOrder([]);
            }
        }
    }, [apiResponse]);

    useEffect(() => {
        console.log("Current order data:", order);
        console.log("Pagination state:", pagination);
    }, [order, pagination]);

    const handlePageChange = (newPage: number) => {
        setPagination(prev => ({
            ...prev,
            currentPage: newPage,
            limit: baseLimit * newPage
        }));
    };

    const columns: ColumnT<Order>[] = useMemo(() => [
        {
            key: 'order_track_id',
            header: 'Order ID',
            sortable: false,
            searchable: true
        },
        {
            key: 'total_price',
            header: 'Total',
            sortable: true,
            render: (value) => `₦${formatNumber(value)}`,
        },
        {
            key: 'order_status',
            header: 'Status',
            searchable: true,
            render: (value) => (
                <span
                    className={`px-2 py-1 rounded-full text-xs ${value === 'pending'
                        ? 'bg-red-100 text-red-800'
                        : value === 'abandoned'
                            ? 'bg-yellow-100 text-yellow-800'
                            : value === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : value === 'Cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                        }`}
                >
                    {value}
                </span>
            ),
        },
    ], []);

    const filterOptions = useMemo(() => [
        { label: 'All Order', value: 'all' },
        { label: 'Processing', value: 'Processing' },
        { label: 'Delivered', value: 'Delivered' },
        { label: 'Cancelled', value: 'Cancelled' }
    ], []);

    return (
        <div className="p-4 w-full">
            <Table
                data={order || []}
                columns={columns}
                searchPlaceholder="Search Orders..."
                filterOptions={filterOptions}
                filterKey="order_status"
                isLoading={isLoading}
                rowUrl={(order) => `/admin/order/${order.order_track_id}`}
                currentPage={pagination.currentPage}
                onPageChange={handlePageChange}
                emptyStateMessage="No orders found. Orders will appear here once they are created."
            />
        </div>
    );
};

export default OrderManagement;