import { createHashRouter } from "react-router-dom";
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


export const Routes = createHashRouter([
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
                path: '/admin/add-product',
                element: <AddProduct />
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
                path: '/admin/report',
                element: <ReportManagement />
            },
            {
                path: '/admin/blog',
                element: <BlogManagment />
            },
        ]
    },

])