import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";
import { REQUESTS, apiCalls } from "../../utilities";
import { API_URL } from '../../config/api';
import "./style.css";

function EditStorePage(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [cities, setCities] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await apiCalls(REQUESTS.GET, `${API_URL}/${id}`);
                const storeData = response;
                setName(storeData.name);
                setCities(storeData.cities);
            } catch (error) {
                setError("Error while fetching store details!");
            }
        })();
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
            await apiCalls(REQUESTS.UPDATE, `${API_URL}/${id}`, data);
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
