import { createHashRouter } from "react-router-dom";
import Body from "./components/body";
import ShopPage from "./components/shop";
import Layout from "./components/layout";

export const Routes = createHashRouter([
    {
        path: '/',
        element: <Layout>
            <Body />
        </Layout>
    },
    {
        path: '/shop',
        element: <Layout>
            <ShopPage />
        </Layout>
    }
])