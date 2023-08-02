import { useRoutes } from "react-router-dom";
import ROUTES from "./routes";

const Router = () => {
    const router = useRoutes(ROUTES);
    return router;
}

export default Router;
