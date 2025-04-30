import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { ArrowLeft, Package, User, Clock, CreditCard, AlertCircle, CheckCircle, XCircle, ShoppingCart } from "lucide-react";
import { getOrderDetails } from "../../services/api-service";
// import { OrderDetailsResponse } from "../../../interface/order";



const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error } = useQuery(
        [`ORDER_${id}`],
        () => getOrderDetails(id ?? ''),
        {
            enabled: !!id,
            retry: false,
        }
    );
    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(Number(amount));
    };

    const formatDate = (dateString: string | number | Date) => {
        return format(new Date(dateString), 'PPP p');
    };

    const OrderStatusBadge = ({ status }: { status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'abandoned' }) => {
        const statusConfig = {
            pending: { color: "bg-yellow-100 text-yellow-800", icon: <Clock size={16} className="mr-1" /> },
            processing: { color: "bg-blue-100 text-blue-800", icon: <Package size={16} className="mr-1" /> },
            completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle size={16} className="mr-1" /> },
            cancelled: { color: "bg-red-100 text-red-800", icon: <XCircle size={16} className="mr-1" /> },
            abandoned: { color: "bg-gray-100 text-gray-800", icon: <AlertCircle size={16} className="mr-1" /> },
        };

        const config = statusConfig[status] || statusConfig.pending;

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                {config.icon}
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="text-red-500 mb-4">
                    <AlertCircle size={48} />
                </div>
                <h1 className="text-2xl font-bold mb-2">Error Loading Order</h1>
                <p className="text-gray-600 mb-4">We couldn't load the order details. Please try again.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                    <ArrowLeft size={16} className="mr-2" /> Go Back
                </button>
            </div>
        );
    }

    const { order, customer, cartItems } = data || {};

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft size={18} className="mr-2" /> Back to Orders
                </button>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{order?.order_track_id}</h1>
                        <p className="text-gray-500">Placed on {order ? formatDate(order.created_at) : ''}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <OrderStatusBadge status={order?.order_status} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <Package size={20} className="mr-2" /> Order Summary
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Order ID:</span>
                                <span className="font-medium">{order?.order_track_id}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Order Date:</span>
                                <span className="font-medium">{order ? formatDate(order.created_at) : ''}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Last Updated:</span>
                                <span className="font-medium">{order ? formatDate(order.updated_at) : ''}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Status:</span>
                                <OrderStatusBadge status={order?.order_status} />
                            </div>
                            {order?.order_note && (
                                <div className="pt-3 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 font-medium mb-1">Order Note:</p>
                                    <p className="text-sm text-gray-800">{order.order_note}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <User size={20} className="mr-2" /> Customer Information
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Name:</span>
                                <span className="font-medium">{customer?.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Email:</span>
                                <span className="font-medium">{customer?.email}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Phone:</span>
                                <span className="font-medium">{customer?.phone_number}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-600 font-medium mb-1">Shipping Address:</p>
                                <p className="text-sm text-gray-800">{customer?.address}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center">
                            <CreditCard size={20} className="mr-2" /> Payment Summary
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="font-medium">{formatCurrency(order?.total_price)}</span>
                            </div>
                            <div className="flex justify-between items-center font-bold text-lg pt-3 border-t border-gray-200">
                                <span>Total:</span>
                                <span>{formatCurrency(order?.total_price)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold flex items-center">
                                <ShoppingCart size={20} className="mr-2" /> Order Items ({cartItems?.length || 0})
                            </h2>
                        </div>

                        <div className="divide-y divide-gray-200">
                            {cartItems?.map((item: {
                                product_id: string;
                                product: {
                                    product_image: { image_url: string }[];
                                    product_name: string;
                                    description: string;
                                    price: {
                                        payment_price: number;
                                        basic_price: number;
                                        discounted_rate: number;
                                    };
                                };
                                quantity: number;
                                sub_total: number;
                            }) => (
                                <div key={item.product_id} className="p-6 flex flex-col md:flex-row">
                                    <div className="flex-shrink-0 w-24 h-24 mb-4 md:mb-0">
                                        <img
                                            src={item.product.product_image[0]?.image_url}
                                            alt={item.product.product_name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>

                                    <div className="md:ml-6 flex-grow">
                                        <h3 className="text-lg font-medium text-gray-900">{item.product.product_name}</h3>
                                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.product.description}</p>

                                        <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-6">
                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-500">Quantity:</span>
                                                <span className="ml-2 text-sm text-gray-900">{item.quantity}</span>
                                            </div>

                                            <div className="flex items-center">
                                                <span className="text-sm font-medium text-gray-500">Unit Price:</span>
                                                <span className="ml-2 text-sm text-gray-900">
                                                    {formatCurrency(item.product.price.payment_price || item.product.price.basic_price)}
                                                </span>
                                            </div>

                                            {item.product.price.discounted_rate > 0 && (
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium text-gray-500">Discount:</span>
                                                    <span className="ml-2 text-sm text-green-600">{item.product.price.discounted_rate}% off</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 flex items-start justify-end">
                                        <span className="text-lg font-medium text-gray-900">{formatCurrency(item.sub_total)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {cartItems?.length === 0 && (
                            <div className="p-6 text-center text-gray-500">
                                <p>No items in this order</p>
                            </div>
                        )}

                        <div className="p-6 bg-gray-50 rounded-b-lg">
                            <div className="flex justify-between items-center text-xl font-bold">
                                <span>Order Total:</span>
                                <span>{formatCurrency(order?.total_price)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;