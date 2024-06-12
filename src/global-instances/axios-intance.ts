import axios from "axios";

export const oapi = axios.create({baseURL:'http://localhost:3001/'})