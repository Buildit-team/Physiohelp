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
import CustomerDetailsPage from "./admin/components/customer/DetailsPage";
import BlogUploadPage from "./admin/components/blog/AddBlog";
import BlogPreviewPage from "./admin/components/blog/BlogPreview";
import BlogPostSuccess from "./admin/components/blog/UploadSuccess";
import SignUp from "./admin/auth/Signup";
import Login from "./admin/auth/login";
import VerifyEmail from "./admin/auth/verify";
import UploadImage from "./admin/components/products/uploadImage";
import ProductDetails from "./admin/components/products/index[id]";


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
        path: '/admin',
        element: <Admin />,
        children: [
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
                path: '/admin/order',
                element: <OrderManagement />
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