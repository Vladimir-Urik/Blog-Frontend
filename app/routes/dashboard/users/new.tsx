import type { ActionFunction, MetaFunction } from "remix";
import React, {useState} from "react";
import client from "../../../services/axios.server";
import {Form, redirect, useActionData} from "remix";
import AuthorCard from "../../../components/authorCard";
import {getToken} from "../../../services/auth.server";
import Notification from "../../../components/notification";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • Add user"
    };
};

type ActionData = {
    message: string,
    time: number
}

export let action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const token = await getToken(request);
    let response;
    try {
        response = await client.post("/users/create", {
            username: await formData.get("username"),
            password: await formData.get("password"),
            avatar: await formData.get("avatar"),
            description: await formData.get("description"),
        }, {
            headers: {
                Authorization: token
            }
        })
    } catch (e: any){
        response = e.response;
    }

    if(response.status === 200){
        throw redirect("/dashboard/users")
    }

    let data: ActionData = {
        message: response.data.error,
        time: new Date().getTime()
    }

    return data;
};

export default function DashboardUsersNew() {
    let actionData = useActionData<ActionData>();

    let [name, setName] = useState("Name");
    let [avatar, setAvatar] = useState("https://i.imgur.com/kVwGJt5.png");
    let [description, setDescription] = useState("I'm new user!");

    return (
        <>
            {actionData && ((new Date().getTime() - actionData.time) < 1000) && <Notification type="error" description={actionData.message}/>}
            <h1 className="poppins-700">Add user</h1>
            <div className="mt-4 px-2">
                <Form method="post">
                    <div>
                        <p className="text-gray-700 text-sm poppins-500">Username:</p>
                        <input id="username" value={name} onChange={(e) => setName(e.target.value)} name="username" maxLength={24} className="mt-1 w-full md:w-[300px] py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" placeholder="Username"/>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-700 text-sm poppins-500">Password:</p>
                        <input id="password" name="password" className="mt-1 w-full md:w-[300px] py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" type="password" placeholder="Password"/>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-700 text-sm poppins-500">Description:</p>
                        <input id="description" value={description} onChange={(e) => setDescription(e.target.value)} maxLength={50} name="description" className="mt-1 w-full md:w-[300px] py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" placeholder="Description"/>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-700 text-sm poppins-500">Avatar:</p>
                        <input id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} name="avatar" maxLength={255} className="mt-1 w-full py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins max-w-[800px]" placeholder="Avatar URL"/>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-700 text-sm poppins-500">Preview:</p>
                        <AuthorCard className="mt-1 w-full lg:w-[400px]" key={avatar && description && name} avatar={avatar} description={description} username={name}/>
                    </div>
                    <button className="py-1 mt-3 px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px]">Add</button>
                </Form>
            </div>
        </>
    );
}
