import { useReducer } from "react";
import axios from "axios";

const initalState = {
    data: [],
    isLoading: false,
    error: null,
};

const ACTIONS_TYPE = {
    FETCH__START: "FETCH__START",
    FETCH__SUCCESSFUL: "FETCH__SUCCESSFUL",
    FETCH__ERROR: "FETCH__ERROR",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
};

const apiReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS_TYPE.FETCH__START:
            return { ...state, isLoading: true };
        case ACTIONS_TYPE.FETCH__SUCCESSFUL:
            return { ...state, data: action.payload, isLoading: false };
        case ACTIONS_TYPE.FETCH__ERROR:
            return { ...state, isLoading: false, error: action.payload };
        case ACTIONS_TYPE.POST:
            return { ...state, data: [...state.data, action.payload], isLoading: false, };
        case ACTIONS_TYPE.DELETE:
            return { ...state, data: state.data.filter((item) => item.id !== action.payload), isLoading: false, };
        case ACTIONS_TYPE.PUT:
            return { ...state, data: action.payload };
        default:
            throw Error(`Action Type Error! ${action.type}`);
    }
};

const useAPI = (API_URL) => {
    const [state, dispatch] = useReducer(apiReducer, initalState);
    const get = async () => {
        try {
            dispatch({ type: ACTIONS_TYPE.FETCH__START });
            const response = await axios.get(API_URL);
            dispatch({ type: ACTIONS_TYPE.FETCH__SUCCESSFUL, payload: response?.data?.data || response?.data });
        } catch (error) {
            dispatch({ type: ACTIONS_TYPE.FETCH__ERROR, payload: Error(error) });
        }
    };
    const getItem = async (id) => {
        try {
            dispatch({ type: ACTIONS_TYPE.FETCH__START });
            const response = await axios.get(`${API_URL}/${id}`);
            dispatch({ type: ACTIONS_TYPE.FETCH__SUCCESSFUL, payload: response?.data?.data || response?.data });
        } catch (error) {
            dispatch({ type: ACTIONS_TYPE.FETCH__ERROR, payload: Error(error) });
        }
    };
    const deleteItem = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            dispatch({ type: ACTIONS_TYPE.DELETE });
        } catch (error) {
            dispatch({ type: ACTIONS_TYPE.FETCH__ERROR, payload: Error(error) });
        }
    };
    const post = async (body) => {
        try {
            dispatch({ type: ACTIONS_TYPE.FETCH__START });
            const response = await axios.post(`${API_URL}`, body);
            dispatch({
                type: ACTIONS_TYPE.POST, payload: (prevState) => [...prevState, response.data.data]
            });
        } catch (error) {
            dispatch({ type: ACTIONS_TYPE.FETCH__ERROR, payload: Error(error) });
        }
    };
    const put = async (url, data) => {
        try {
            const response = await axios.put(url, data);
            dispatch({ type: ACTIONS_TYPE.PUT, payload: response.data });
        } catch (error) {
            dispatch({ type: ACTIONS_TYPE.FETCH__ERROR, payload: Error(error) });
        }
    };
    return {
        data: state.data,
        isLoading: state.isLoading,
        get, getItem, deleteItem, post, put,
    };
};

export default useAPI;
