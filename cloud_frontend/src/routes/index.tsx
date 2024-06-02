import { Navigate, createBrowserRouter } from "react-router-dom";
import PageNotFound from "../components/page-not-found";
import Home from "../screens/Home";


export default createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <PageNotFound />
    },
    {
        path: "*",
        element: <Navigate to="/" />,
        errorElement: <PageNotFound />
    },
]);  
