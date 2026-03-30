import axios from "axios";

export const api = axios.create({
    baseURL: `https://prakhar-notes-app.onrender.com/`
})