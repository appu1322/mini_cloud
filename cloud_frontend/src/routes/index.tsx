import { Navigate, createBrowserRouter } from "react-router-dom";
import PageNotFound from "../components/page-not-found";
import Home from "../screens/Home";
import Layout from "../screens/layout";
import MyDrive from "../screens/layout/my-drive";

export default createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <PageNotFound />
    },
    {
        path: "home",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <MyDrive />,
                errorElement: <PageNotFound />
            }
        ],
        errorElement: <PageNotFound />
    },
    {
        path: "*",
        element: <Navigate to="/" />,
        errorElement: <PageNotFound />
    },
]);  
