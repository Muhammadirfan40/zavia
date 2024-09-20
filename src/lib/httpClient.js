import axios from "axios"

export const httpClient = axios.create({
    baceURL: "https://back-end-seven-xi.vercel.app",
    timeout:60000
})