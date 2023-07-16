import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Stores from "./pages/Stores";
import Store from "./pages/Store";
import Create from "./pages/Create";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path="stores/all" element={<Stores />} />
        <Route path="stores/:id" element={<Store />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </div>
  );
}
export default App;
