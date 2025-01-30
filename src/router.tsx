import { createHashRouter } from "react-router-dom";
import Body from "./components/body";
import ShopPage from "./components/shop";
import Layout from "./components/layout";
import Detailspage from "./components/shop/index[id]";
import Carting from "./components/cart";
import ScrollToTop from "./utils/ScrollToTop";


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
])