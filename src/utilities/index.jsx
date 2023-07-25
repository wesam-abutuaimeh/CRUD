import axios from "axios";

const apiCalls = async (variant, url, requestData) => {
    try {
        let response;
        switch (variant) {
            case "get":
                response = await axios.get(url);
                break;
            case "create":
                response = await axios.post(url, requestData);
                break;
            case "update":
                response = await axios.put(url, requestData);
                break;
            case "delete":
                response = await axios.delete(url);
                break;
            default:
                throw new Error("Invalid variant provided.");
        }
        if (!response.data) {
            throw new Error("No data received from the server.");
        }
        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error("Error while making the API call!");
        }
    }
};

export default apiCalls;
