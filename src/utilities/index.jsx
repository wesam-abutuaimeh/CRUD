import axios from "axios";

const apiCalls = async (variant, url, requestData) => {
    try {
        let response;
        if (variant === "get") {
            response = await axios.get(url);
        }
        if (variant === "create") {
            response = await axios.post(url, requestData);
        }
        if (variant === "update") {
            response = await axios.put(url, requestData);
        }
        if (variant === "delete") {
            response = await axios.delete(url);
        }
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error("Error while fetching data.");
    }
};

export default apiCalls;
