import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import STORES_COLUMNS from "../../constants/stores";
import apiCalls from "../../utilities";
import Table from "../../components/Table";
import "./style.css";

function Stores() {
    const [allStores, setAllStores] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleStoresData = async () => {
        const response = await apiCalls('get', 'https://some-data.onrender.com/stores');
        setAllStores(response);
        setIsLoading(false);
    };

    useEffect(() => {
        handleStoresData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await apiCalls('delete', `https://some-data.onrender.com/stores/${id}`);
            setAllStores((prevStores) => prevStores.filter((store) => store.id !== id));
        } catch (error) {
            throw new Error("Error while deleting the store according to the store id!");
        }
    };

    const handleEdit = (id) => {
        navigate(`/stores/${id}/edit`);
    };

    const handleView = (row) => {
        navigate(`/stores/${row.id}`);
    };

    return (
        <>
            <Table columns={STORES_COLUMNS(allStores, handleEdit, handleDelete)} data={allStores} onRowClick={handleView} />
            {isLoading && <h1>Loading...</h1>}
            <button className="create__btn" onClick={() => navigate("/create")}> Create Post </button>
        </>

    );
}

export default Stores;
