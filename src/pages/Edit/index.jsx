import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Container from "../../components/Container";
import { API_URL } from "../../config/api";
import useAPI from "../../hooks/useAPI";
import "./style.css";

function EditStorePage(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [cities, setCities] = useState("");
    const { data, isLoading, error, put, getItem } = useAPI(API_URL);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "cities":
                setCities(value.trim());
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name, cities };
        put(`${API_URL}/${id}`, data);
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        }).then((result) => {
            result.isConfirmed &&
                Swal.fire("Saved!", "", "success") &&
                navigate("/stores/all");
            result.isDenied && Swal.fire("Changes are not saved", "", "info");
        });
    };

    useEffect(() => {
        getItem(id);
    }, []);

    useEffect(() => {
        setName(data.name);
        setCities(data.cities);
    }, [data]);

    return (
        <div>
            <Container>
                <h1 className="hero__text">Update Store {id}</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <form className="form__container" onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input className="input" type="text" name="name" value={name} onChange={handleInputChange} />
                        </label>
                        <label>
                            Cities:
                            <input className="input" type="text" name="cities" value={cities} onChange={handleInputChange} />
                        </label>
                        <button type="submit">Update Store</button>
                    </form>
                )}
                {error && <p className="error__message">Error: {error}</p>}
            </Container>
        </div>
    );
}

export default EditStorePage;
