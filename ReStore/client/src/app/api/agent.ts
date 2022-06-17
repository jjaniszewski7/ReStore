import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseData = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep();
    return response;
}, (error) => {
    const { data, status } = error.response!;

    switch (status) {
        case 400:
        case 401:
        case 404:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 500:
            history.push('/server-error', { error: data });
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
});

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