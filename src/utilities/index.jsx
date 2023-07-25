import axios from "axios";

const apiCalls = async (variant, url, requestData) => {
    const requests = {
        'get': async () => await axios.get(url),
        'create': async () => await axios.post(url, requestData),
        'update': async () => await axios.put(url, requestData),
        'delete': async () => await axios.delete(url),
    }
    try {
        const response = await requests[variant]();
        return response.data;
    } catch {
        throw new Error("API call error !");
    }
};

export default apiCalls;
