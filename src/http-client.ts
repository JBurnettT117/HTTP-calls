import axios, { AxiosInstance } from "axios";

const axiosInstance:AxiosInstance = axios.create({
    timeout: 20000,
    headers: {Accept:"application/json"}
});

export const httpClient:AxiosInstance = axiosInstance;