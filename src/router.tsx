import { createBrowserRouter } from "react-router-dom";
import Body from "./components/body";
import ShopPage from "./components/shop";
import Layout from "./components/layout";
import Detailspage from "./components/shop/index[id]";
import Carting from "./components/cart";
import ScrollToTop from "./utils/ScrollToTop";
import Appointment from "./components/appointment";
import BookAppointment from "./components/appointment/BookAppointment";
import AppointmentPreview from "./components/appointment/AppointmentPreview";
import Admin from "./admin";
import CustomerManagement from "./admin/components/customer";
import OrderManagement from "./admin/components/order";
import Products from "./admin/components/products";
import ReportManagement from "./admin/components/report";
import BlogManagment from "./admin/components/blog";
import AddProduct from "./admin/components/products/AddProduct";
import CustomerDetailsPage from "./admin/components/customer/index[id]";
import BlogUploadPage from "./admin/components/blog/AddBlog";
import BlogPreviewPage from "./admin/components/blog/BlogPreview";
import BlogPostSuccess from "./admin/components/blog/UploadSuccess";
import SignUp from "./admin/auth/Signup";
import Login from "./admin/auth/login";
import VerifyEmail from "./admin/auth/verify";
import UploadImage from "./admin/components/products/uploadImage";
import ProductDetails from "./admin/components/products/index[id]";
import BlogPage from "./components/blog";
import BlogDetailsPage from "./components/blog/index[id]";
import Sessions from "./admin/components/session";
import EditProduct from "./admin/components/products/EditProduct";
import OrderSuccessPage from "./components/cart/orderSuccessPage";
import AppointmentSuccess from "./components/appointment/AppoinntmentSuccess";
import PayForAppointment from "./components/appointment/PaymentForAppointment";
import AppointmentPaymentSuccess from "./components/appointment/AppointPaymentSuccess";

import AccountLayout from "./components/userAccont";
import OrderHistory from "./components/userAccont/OrderHistory";
import AccountOverview from "./components/userAccont/AccountOverview";
import UserAppointment from "./components/userAccont/UserAppointment";
import UserAddress from "./components/userAccont/UserAddress";
import Dashboard from "./admin/components/dashboard";
import Wallet from "./admin/components/wallet";
import OrderDetails from "./admin/components/order/index[id]";
import SessionDetails from "./admin/components/session/index[id]";
import CompleteWithdrawal from "./admin/components/wallet/CompleteWithdrawal";
export const Routes = createBrowserRouter([
    {
        path: '/',
        element:
            <ScrollToTop>
                <Layout>
                    <Body />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/shop',
        element:
            <ScrollToTop>
                <Layout>
                    <ShopPage />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/order-success',
        element:
            <ScrollToTop>
                <Layout>
                    <OrderSuccessPage />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/blog',
        element:
            <ScrollToTop>
                <Layout>
                    <BlogPage />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/blog/:id',
        element:
            <ScrollToTop>
                <Layout>
                    <BlogDetailsPage />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/shop/:id',
        element:
            <ScrollToTop>
                <Layout>
                    <Detailspage />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/cart',
        element:
            <ScrollToTop>
                <Layout>
                    <Carting />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/appointment',
        element:
            <ScrollToTop>
                <Layout>
                    <Appointment />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/book-appointment',
        element:
            <ScrollToTop>
                <Layout>
                    <BookAppointment />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/appointment-preview',
        element:
            <ScrollToTop>
                <Layout>
                    <AppointmentPreview />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/appointment-success',
        element:
            <ScrollToTop>
                <Layout>
                    <AppointmentSuccess />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/appointment-payment/:id',
        element:
            <ScrollToTop>
                <Layout>
                    <PayForAppointment />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/appointment-payment-success',
        element:
            <ScrollToTop>
                <Layout>
                    <AppointmentPaymentSuccess />
                </Layout>
            </ScrollToTop>
    },
    {
        path: '/user',
        element:
            <ScrollToTop>
                <Layout>
                    <AccountLayout />
                </Layout>
            </ScrollToTop>,
        children: [
            {
                path: 'account',
                element: <AccountOverview />
            },
            {
                path: 'account/orders',
                element: <OrderHistory />
            },
            {
                path: 'account/appointments',
                element: <UserAppointment />
            },
            {
                path: 'account/address',
                element: <UserAddress />
            },
        ]
    },
    {
        path: '/admin',
        element: <Admin />,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'wallet',
                element: <Wallet />
            },
            {
                path: 'withdraw/complete/:email/:token',
                element: <CompleteWithdrawal />
            },
            {
                path: 'product',
                element: <Products />
            },
            {
                path: 'product/:id',
                element: <ProductDetails />
            },
            {
                path: 'add-product',
                element: <AddProduct />
            },
            {
                path: 'add-product-image/:id',
                element: <UploadImage />
            },
            {
                path: 'products/:id/edit',
                element: <EditProduct />
            },
            {
                path: 'order',
                element: <OrderManagement />
            },
            {
                path: 'order/:id',
                element: <OrderDetails />
            },
            {
                path: 'customer',
                element: <CustomerManagement />
            },
            {
                path: 'customer/:id',
                element: <CustomerDetailsPage />
            },
            {
                path: 'report',
                element: <ReportManagement />
            },
            {
                path: 'blog',
                element: <BlogManagment />
            },
            {
                path: 'add-blog',
                element: <BlogUploadPage />
            },
            {
                path: 'preview-blog',
                element: <BlogPreviewPage />
            },
            {
                path: 'blog-upload-success',
                element: <BlogPostSuccess />
            },
            {
                path: 'session',
                element: <Sessions />
            },
            {
                path: 'session/:id',
                element: <SessionDetails />
            },

        ]
    },
    {
        path: '/admin/signup',
        element: <SignUp />
    },
    {
        path: '/admin/login',
        element: <Login />
    },
    {
        path: '/admin/verify',
        element: <VerifyEmail />
    },
])