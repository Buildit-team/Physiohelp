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
                path: '/user/account',
                element: <AccountOverview />
            },
            {
                path: '/user/account/orders',
                element: <OrderHistory />
            },
            {
                path: '/user/account/appointments',
                element: <UserAppointment />
            },
            {
                path: '/user/account/address',
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
                path: '/admin/wallet',
                element: <Wallet />
            },
            {
                path: '/admin/product',
                element: <Products />
            },
            {
                path: '/admin/product/:id',
                element: <ProductDetails />
            },
            {
                path: '/admin/add-product',
                element: <AddProduct />
            },
            {
                path: '/admin/add-product-image/:id',
                element: <UploadImage />
            },
            {
                path: '/admin/products/:id/edit',
                element: <EditProduct />
            },
            {
                path: '/admin/order',
                element: <OrderManagement />
            },
            {
                path: '/admin/order/:id',
                element: <OrderDetails />
            },
            {
                path: '/admin/customer',
                element: <CustomerManagement />
            },
            {
                path: '/admin/customer/:id',
                element: <CustomerDetailsPage />
            },
            {
                path: '/admin/report',
                element: <ReportManagement />
            },
            {
                path: '/admin/blog',
                element: <BlogManagment />
            },
            {
                path: '/admin/add-blog',
                element: <BlogUploadPage />
            },
            {
                path: '/admin/preview-blog',
                element: <BlogPreviewPage />
            },
            {
                path: '/admin/blog-upload-success',
                element: <BlogPostSuccess />
            },
            {
                path: '/admin/session',
                element: <Sessions />
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