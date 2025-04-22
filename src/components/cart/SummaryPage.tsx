import React, { useState, useEffect } from "react";
import { CartItem, useCart } from "../../context/CartCaontex";
import { motion } from "framer-motion";
import { formatNumber } from "../../utils/formatNumbers";
import { useMutation, useQueryClient } from "react-query";
import { completeOrder } from "../../admin/services/api-service";
import { useNavigate } from "react-router-dom";

interface SummaryPageProps {
  orderDetails: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone_number: string;
  };
  cart: CartItem[];
  total: number;
}


const SummaryPage: React.FC<SummaryPageProps> = ({
  orderDetails,
  cart,
  total,
}) => {
  const queryClient = useQueryClient()
  const {clearCart} = useCart()
  const navigate = useNavigate()
  const [iframeUrl, setIframeUrl] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{
    status: 'idle' | 'processing' | 'success' | 'failed' | 'closed';
    message?: string;
    data?: any;
  }>({ status: 'idle' });

  const orderId = localStorage.getItem("orderId");
  const completeOrderMutation = useMutation(
    () => completeOrder(orderId || ""),
    {
      onSuccess: (data) => {
        const checkoutUrl = data.data.payment.checkout_url;
        setIsRedirecting(false);
        setIframeUrl(checkoutUrl);
        setPaymentStatus({ status: 'processing', message: 'Launching payment modal...' });
      },
      onError: (error) => {
        console.error("Payment initialization failed:", error);
        setPaymentStatus({
          status: 'failed',
          message: 'There was a problem initializing your payment. Please try again.'
        });
      }
    }
  );

  useEffect(() => {
    const handlePaymentEvent = (event: MessageEvent | CustomEvent) => {
      if (event.type === 'message') {
        const rawData = (event as MessageEvent).data;
        try {
          const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;

          if (parsedData && parsedData.result) {
            processPaymentResult(parsedData.result);
          }
        } catch (err) {
          console.error('Failed to parse payment message:', err);
        }
      }
    };

    const processPaymentResult = (result: string) => {
      switch (result) {
        case 'success':
          navigate('/order-success')
          localStorage.removeItem('orderId');
          localStorage.removeItem('cartId');
          localStorage.removeItem('cart')
          queryClient.invalidateQueries('customerActivity')
          clearCart()
          break;
        case 'failed':
          
          break;

        case 'close':
          navigate('/shop')
          break;

        case 'pending':
          break;
      }
    };
    ['success', 'failed', 'pending', 'close'].forEach(eventType => {
      window.addEventListener(eventType, (event) => handlePaymentEvent(event as MessageEvent | CustomEvent));
    });

    window.addEventListener('message', handlePaymentEvent);

    return () => {
      ['success', 'failed', 'pending', 'close'].forEach(eventType => {
        window.removeEventListener(eventType as string, handlePaymentEvent as EventListener);
      });
      window.removeEventListener('message', handlePaymentEvent);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 30,
          stiffness: 180,
          mass: 1,
          delay: 0.2,
        },
      }}
      viewport={{ amount: 0.2, once: true }}
      className="container mx-auto px-4 py-6 w-full flex flex-col md:flex-row justify-center gap-6"
    >
      {paymentStatus.status !== 'idle' && paymentStatus.status !== 'processing' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            {paymentStatus.status === 'success' && (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-green-600">Payment Successful!</h3>
                <p className="text-gray-600 mb-4">{paymentStatus.message}</p>
                <p className="text-sm text-gray-500 mb-4">Reference: {paymentStatus.data?.reference}</p>
                <button
                  onClick={() => window.location.href = "/thank-you"}
                  className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Continue
                </button>
              </>
            )}

            {paymentStatus.status === 'failed' && (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-red-600">Payment Failed</h3>
                <p className="text-gray-600 mb-4">{paymentStatus.message}</p>
                {paymentStatus.data?.reference && (
                  <p className="text-sm text-gray-500 mb-4">Reference: {paymentStatus.data.reference}</p>
                )}
                <button
                  onClick={() => setPaymentStatus({ status: 'idle' })}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </>
            )}

            {paymentStatus.status === 'closed' && (
              <>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Payment Window Closed</h3>
                <p className="text-gray-600 mb-4">{paymentStatus.message}</p>
                <button
                  onClick={() => setPaymentStatus({ status: 'idle' })}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {isRedirecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Redirecting to Payment Gateway</h3>
            <div className="w-16 h-16 border-4 border-t-blue-600 border-r-blue-600 border-b-gray-200 border-l-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Please wait while we redirect you to complete your payment...</p>
          </div>
        </div>
      )}

      {cart?.length > 0 ? (
        <>
          <div className="bg-white shadow-lg rounded-lg w-full md:w-3/5 overflow-hidden">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Customer Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                <div>
                  <p className="font-medium">First Name</p>
                  <p>{orderDetails?.firstName}</p>
                </div>
                <div>
                  <p className="font-medium">Last Name</p>
                  <p>{orderDetails?.lastName}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="truncate">{orderDetails?.email}</p>
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p>{orderDetails?.phone_number}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="font-medium">Address</p>
                  <p>{orderDetails?.address}</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
                Order Items
              </h3>
              <div className="space-y-4">
                {cart?.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.product_image?.[0]?.image_url || "/api/placeholder/80/80"}
                        alt={item.product.product_name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {item.product.product_name}
                        </p>
                        <p>₦{formatNumber(item.product.price.basic_price)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-700">
                        {item.quantity} ×{" "}
                        <span>₦{formatNumber(item.product.price.basic_price)}</span>
                      </p>
                      <p className="font-bold text-blue-700">
                        ₦{formatNumber(item.quantity * item.product.price.basic_price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 lg:w-1/3">
            <div className="sticky top-4 border p-6 space-y-4 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold border-b pb-3">Payment Summary</h2>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">₦{formatNumber(total)}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">₦0</p>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-gray-800">Total</p>
                    <p className="text-2xl font-bold text-blue-700">
                      ₦{formatNumber(total)}
                    </p>
                  </div>
                </div>
              </div>

              {completeOrderMutation.isLoading ? (
                <button
                  disabled
                  className="w-full py-3 px-4 bg-gray-400 text-white rounded-lg flex items-center justify-center space-x-2"
                >
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </button>
              ) : (
                <button
                  onClick={() => completeOrderMutation.mutate()}
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">Proceed to Payment</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}

              <div className="text-sm text-gray-500 text-center mt-4">
                <p>Your payment information is secure and encrypted</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-10 w-full">
          <h3 className="text-xl font-medium text-gray-700 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-6">Add some items to your cart to continue shopping</p>
          <button
            onClick={() => window.location.href = '/shop'}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      )}
      {iframeUrl && (
        <div className="fixed w-full inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-[40%] h-[90vh] rounded-lg shadow-lg max-[650px]:w-full max-[650px]:h-full">
            <iframe
              src={iframeUrl}
              title="Payment"
              allow="payment"
              width="100%"
              height="100%"
              onLoad={() => console.log("Payment iframe loaded")}
            />
          </div>
        </div>
      )}

    </motion.div>
  );
};

export default SummaryPage;