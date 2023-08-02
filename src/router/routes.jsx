import PATHS from "./paths";
import HomePage from "../pages/HomePage";
import Stores from "../pages/Stores";
import Store from "../pages/Store";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import NotFoundPage from "../components/NotFoundPage";

const ROUTES = [
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
    {
        path: PATHS.NOT_FOUND["*"],
        element: <NotFoundPage />,
    },
];

export default ROUTES;
