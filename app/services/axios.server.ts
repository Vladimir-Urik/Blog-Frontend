import axios from "axios";
import { redirect } from "remix";

let client = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json"
  }
});

client.interceptors.response.use(
    response => response,
        error => {
        if(!error.response) {
            throw Promise.reject(error);
        }

        if (error.response.status === 401 && (error.config.url !== "/auth/login")) {
            throw redirect("/login");
        }

        return Promise.reject(error);
  }
);

export default client;