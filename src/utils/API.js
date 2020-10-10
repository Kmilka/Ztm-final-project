import axios from 'axios';

export const api = axios.create({
    baseURL: "https://sm-back.herokuapp.com/",
    // baseURL: "http://localhost:4000/",
    responseType: "json",
    headers: {
        common: {
            'Set-Cookie': 'SameSite=None; Secure',
        },
        post: {
            'Content-Type': 'application/json',
            'Set-Cookie': 'SameSite=None; Secure',
        }
    }
})