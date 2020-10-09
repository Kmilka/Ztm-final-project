import axios from 'axios';

export const api = axios.create({
    baseURL: "https://sm-back.herokuapp.com/",
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