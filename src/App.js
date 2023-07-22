import { Route, Routes } from "react-router-dom";
import Router from "./routers";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Stores from "./pages/Stores";
import Store from "./pages/Store";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={Router.HOME} element={<HomePage />} />
        <Route path={Router.CRUD.STORES} element={<Stores />} />
        <Route path={Router.CRUD.STORE} element={<Store />} />
        <Route path={Router.CRUD.CREATE} element={<Create />} />
        <Route path={Router.CRUD.EDIT} element={<Edit />} />
      </Routes>
    </div>
  );
}
export default App;
