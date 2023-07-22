import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container";
import "./style.css";

function EditStorePage(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [cities, setCities] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchStoreDetails = async () => {
        try {
            const response = await axios.get(`https://some-data.onrender.com/stores/${id}`);
            const storeData = response.data;
            setName(storeData.name);
            setCities(storeData.cities);
        } catch (error) {
            setError("Error while fetching store details!");
        }
    };
    useEffect(() => {
        fetchStoreDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
            setName(value);
        } else if (name === "cities") {
            if (typeof value === "string") {
                setCities(value.trim());
            } else {
                setCities(value);
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { name, cities };
        setIsLoading(true);
        setError(null);
        try {
            await axios.put(`https://some-data.onrender.com/stores/${id}`, data);
            setIsLoading(false);
            navigate("/stores/all");
        } catch (error) {
            setIsLoading(false);
            setError("Error while updating store");
        }
    };

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
