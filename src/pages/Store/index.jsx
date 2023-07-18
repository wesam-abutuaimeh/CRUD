import React, { useState, useEffect } from "react";
import axios from "axios";
import WithParams from "../../WithParams";
import "./style.css";

function Store(props) {
    const [store, setStore] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://some-data.onrender.com/stores/${props.params.id}`);
            const data = response.data;
            setStore(data);
        } catch (error) {
            setError('Error While Fetching Store Data 🙃🙃')
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.params.id]);

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

export default WithParams(Store);
