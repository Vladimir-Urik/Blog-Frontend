import {ActionFunction, Form, LoaderFunction, MetaFunction, redirect, useActionData, useLoaderData} from "remix";
import { getPost } from "../../../services/blog.server";
import React from "react";
import {getToken} from "../../../services/auth.server";
import client from "../../../services/axios.server";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • Edit post"
    };
};

type ActionData = {
    message: string,
    time: number
}

export let action: ActionFunction = async ({request, params}) => {
    const formData = await request.formData();
    const token = await getToken(request);

    if(formData.has("delete")){
        let response;
        try {
            response = await client.post("/posts/"+ params.id +"/delete", {}, {
                headers: {
                    Authorization: token
                }
            })
        } catch (e: any){
            response = e.response;
        }

        if(response.status === 200){
            throw redirect("/dashboard/posts")
        }

        let data: ActionData = {
            message: response.data.error,
            time: new Date().getTime()
        }
        return data;
    }

    if(formData.has("save")){
        let response;
        try {
            response = await client.post("/posts/"+ params.id +"/edit", {
                title: await formData.get("title"),
                image: await formData.get("image"),
                content: await formData.get("content")
            }, {
                headers: {
                    Authorization: token
                }
            })
        } catch (e: any){
            response = e.response;
        }

        if(response.status === 200){
            throw redirect("/dashboard/posts")
        }

        let data: ActionData = {
            message: response.data.error,
            time: new Date().getTime()
        }
        return data;
    }

    return null;
};

type LoaderData = {
    post: any;
};

export let loader: LoaderFunction = async ({params}) => {
    if(!params.id) {
        throw new Response("Not Found", {
            status: 404
        });
    }

    let post = await getPost(params.id);
    if(post && post.status){
        throw new Response("Not Found", {
            status: 404
        });
    }

    let result: LoaderData = {
        post
    }
    return result
}

export default function DashboardPostsEdit() {
    let data = useLoaderData<LoaderData>();

    return (
        <>
            <h1 className="poppins-700">Edit post</h1>
            <div className="mt-4 px-2">
                <Form method="post">
                    <div>
                        <p className="text-gray-700 text-sm poppins-500">Title:</p>
                        <input id="title" defaultValue={data.post.title} name="title" maxLength={255} className="mt-1 w-full md:w-[300px] py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" placeholder="Title"/>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-700 text-sm poppins-500">Image:</p>
                        <input id="image" defaultValue={data.post.image} name="image" maxLength={255} className="mt-1 w-full py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins max-w-[800px]" placeholder="Image URL"/>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-700 text-sm poppins-500">Content:</p>
                        <textarea id="content" defaultValue={data.post.content} name="content" className="mt-1 w-full py-2 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins max-w-[800px] h-[250px] resize-none" placeholder="Content"/>
                    </div>
                    <button name="save" className="py-1 mt-3 px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px]">Save</button>
                    <button name="delete" className="py-1 mt-3 px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px] ml-2">Delete</button>
                </Form>
            </div>
        </>
    );
}
