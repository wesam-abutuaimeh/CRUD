import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAPI from "../../hooks/useAPI";
import { API_URL } from '../../config/api';
import "./style.css";

function Store(props) {
    let { id } = useParams();
    const { data, isLoading, getItem } = useAPI(API_URL);

    useEffect(() => {
        getItem(id);
    }, [id]);

    return (
        <div>
            {!isLoading && (
                <div className="store__details">
                    <h1>Details:</h1>
                    <p>Store Id: {data.id}</p>
                    <p>Store Name: {data.name}</p>
                    <p>Store Location: {data.cities}</p>
                    {data.error && <span className="error__message">{data.error}</span>}
                </div>
            )}
        </div>
    );
}

export default Store;
