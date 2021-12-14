import { AxiosResponse } from "axios";
import client from "./axios.server";

export async function getPosts(): Promise<any> {
    let response: AxiosResponse;

    try {
        response = await client.get("/posts");
    } catch (e: any){
        return {
            errors: e.response.data.error
        }
    }

    return response.data
}

export async function getPost(id: string): Promise<any> {
    let response: AxiosResponse;

    try {
        response = await client.get(`/post/${id}`);
    } catch (e: any){
        return {
            status: e.response.status,
            error: e.response.data.error
        }
    }

    return response.data
}