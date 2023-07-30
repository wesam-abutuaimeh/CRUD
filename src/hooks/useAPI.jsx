import { useState } from "react";
import axios from "axios";

const useAPI = (API_URL) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const get = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(API_URL);
            setData(response?.data?.data || response?.data);
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const getItem = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setData(response?.data?.data || response?.data);
            setIsLoading(true);
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setData((prevState) => prevState.filter((itemId) => itemId !== id));
            setIsLoading(true);
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const post = async (body) => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${API_URL}`, body);
            setData((prevState) => [...prevState, response.data.data]);
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsLoading(false); // Set loading state to false after the API call is complete
        }
    };

    const put = async (url, data) => {
        try {
            const response = await axios.put(url, data);
            setIsLoading(true);
            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { data, isLoading, get, getItem, deleteItem, post, put };
}

export default useAPI;
