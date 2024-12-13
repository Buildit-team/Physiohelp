import { createHashRouter } from "react-router-dom";
import Body from "./components/body";

export const Routes = createHashRouter([
    {
        path: '/',
        element: <Body/>
    }
])