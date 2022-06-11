import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseData = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseData),
    post: (url: string, body: {}) => axios.post(url, body).then(responseData),
    put: (url: string, body: {}) => axios.put(url, body).then(responseData),
    delete: (url: string) => axios.delete(url).then(responseData),
};

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
};

const TestErrors = {
    get400Error: () => requests.get('buggy/not-found'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/bad-request'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
};

const agent = {
    Catalog,
    TestErrors
};

export default agent;