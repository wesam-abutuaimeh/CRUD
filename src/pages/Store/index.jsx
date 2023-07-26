import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { REQUESTS, apiCalls } from "../../utilities";
import { API_URL } from '../../config/api';
import "./style.css";

function Store(props) {
    let { id } = useParams();
    const [store, setStore] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    ;

    useEffect(() => {
        (async () => {
            try {
                const response = await apiCalls(REQUESTS.GET, `${API_URL}/${id}`);
                const data = response;
                setStore(data);
            } catch (error) {
                setError("Error While Fetching Store Data 🙃🙃");
            } finally {
                setIsLoading(false);
            }
        })();
    }, [id, store]);

    return (
        <div>
            {!isLoading && (
                <div className="store__details">
                    <h1>Details:</h1>
                    <p>Store Id: {store.id}</p>
                    <p>Store Name: {store.name}</p>
                    <p>Store Location: {store.cities}</p>
                    <span className="error__message">{error}</span>
                </div>
            )}
        </div>
    );
}

export default Store;
