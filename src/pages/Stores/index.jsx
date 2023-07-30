import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import STORES_COLUMNS from "../../constants/stores";
import Table from "../../components/Table";
import Swal from "sweetalert2";
import { API_URL } from "../../config/api";
import useAPI from "../../hooks/useAPI";
import "./style.css";

function Stores() {
    const navigate = useNavigate();
    const { data, isLoading, get, deleteItem } = useAPI(API_URL);

    const handleDelete = (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then((result) => {
                result.isConfirmed && deleteItem(id) && Swal.fire("Deleted!", "Your store data has been deleted.", "success");
            });
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/stores/${id}/edit`);
    };
    const handleView = (row) => {
        navigate(`/stores/${row.id}`);
    };

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    <Table columns={STORES_COLUMNS(data, handleEdit, handleDelete)} data={data} onRowClick={handleView} />
                    <button className="create__btn" onClick={() => navigate("/create")}> Create Post </button>
                    {data.error && <span className="error__message">{data.error}</span>}
                </>
            )}
        </>
    );
}

export default Stores;
