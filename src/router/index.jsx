import { useRoutes } from "react-router-dom";
import PATHS from "./paths";
import HomePage from "../pages/HomePage";
import Stores from "../pages/Stores";
import Store from "../pages/Store";
import Create from "../pages/Create";
import Edit from "../pages/Edit";

const Router = () => {
    return useRoutes([
        {
            path: PATHS.HOME,
            element: <HomePage />,
        },
        {
            path: PATHS.CRUD.STORES,
            element: <Stores />,
        },
        {
            path: PATHS.CRUD.STORE,
            element: <Store />,
        },
        {
            path: PATHS.CRUD.CREATE,
            element: <Create />,
        },
        {
            path: PATHS.CRUD.EDIT,
            element: <Edit />,
        },
    ]);
};

export default Router;
