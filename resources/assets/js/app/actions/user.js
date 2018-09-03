import qs from "qs";

const axios = window.axios;

async function createUser(credentials, callback) {
    const result = await axios.post('/api/user/create', qs.stringify(credentials));
    callback(result.data);
    return result.data;
}

export {createUser};