import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import STORES_COLUMNS from "../../constants/stores";
import { REQUESTS, apiCalls } from "../../utilities";
import { API_URL } from '../../config/api';
import Table from "../../components/Table";
import "./style.css";

function Stores() {
    const [allStores, setAllStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleStoresData = async () => {
        try {
            const data = await apiCalls(REQUESTS.GET, API_URL);
            setAllStores(data);
            setIsLoading(true);
        } catch (error) {
            setError(`Error While Fetching Store Data 🙃🙃 ==> ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (id) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                result.isConfirmed && (apiCalls(REQUESTS.DELETE, `${API_URL}/${id}`) && setAllStores((prevStores) => prevStores.filter((store) => store.id !== id)) && Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                ))
            }
            )
        } catch (error) {
            setError(`Error while deleting the store according to the store id! ==> ${error}`);
        }
    };

    const handleEdit = (id) => { navigate(`/stores/${id}/edit`); };
    const handleView = (row) => { navigate(`/stores/${row.id}`); };

    useEffect(() => {
        handleStoresData();
    }, [allStores]);

    return (
        <>
            <Table columns={STORES_COLUMNS(allStores, handleEdit, handleDelete)} data={allStores} onRowClick={handleView} />
            {isLoading && <h1>Loading...</h1>}
            <button className="create__btn" onClick={() => navigate("/create")}> Create Post </button>
            {error && <span className="error__message">{error}</span>}
        </>
    );
}

export default Stores;
