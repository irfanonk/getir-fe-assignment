import axios from 'axios'

export const api = axios.create({
    baseURL: "https://getir-fe-assignment-db.vercel.app/"
})

api.interceptors.request.use((config) => {
    return config
});
api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        // console.log('error', error.response);
        throw error.response.data
    }
);