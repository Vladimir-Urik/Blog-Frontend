import type {ActionFunction, LoaderFunction, MetaFunction} from "remix";
import React, {useState} from "react";
import {changeToken, getSessionInfo, getToken} from "../../services/auth.server";
import {Form, useActionData, useLoaderData} from "remix";
import client from "../../services/axios.server";
import AuthorCard from "../../components/authorCard";
import Notification from "../../components/notification";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • User settings",
        description: "Blog user settings"
    };
};

type ActionData = {
    message: string,
    type: string,
    time: number
}

export let action: ActionFunction = async ({request}) => {
    const token = await getToken(request);
    const formData = await request.formData();

    if(formData.has("old-password") && formData.has("new-password")){
        let oldPassword = formData.get("old-password");
        let newPassword = formData.get("new-password");
        let response;
        try {
            response = await client.post("/auth/change-password", {
                password: oldPassword,
                "new-password": newPassword
            }, {
                headers: {
                    Authorization: token
                }
            })
        } catch (e: any) {
            response = e.response;
        }

        if(response.status === 200){
            await changeToken(request, response.data.token, "/dashboard/settings?success");
            return null;
        } else {
            return {
                message: response.data.error,
                type: "error",
                time: new Date().getTime()
            }
        }
    }

    if(formData.has("username") && formData.has("avatar") && formData.has("description")) {
        let username = formData.get("username");
        let avatar = formData.get("avatar");
        let description = formData.get("description");

        let response;
        try {
            response = await client.post("/settings", {
                username,
                avatar,
                description
            }, {
                headers: {
                    Authorization: token
                }
            })
        } catch (e: any) {
            response = e.response;
        }

        if(response.status === 200){
            return {
                message: response.data.message,
                type: "success",
                time: new Date().getTime()
            }
        } else {
            return {
                message: response.data.error,
                type: "error",
                time: new Date().getTime()
            }
        }
    }

    return {
        message: "Invalid request",
        type: "error",
        time: new Date().getTime()
    }
};

type LoaderData = {
    user: any,
    message: any,
    type: any,
    time: any
}

export let loader: LoaderFunction = async ({request}) => {
    let user = await getSessionInfo(request);

    if(request.url.split("?")[1] === "success="){
        let loaderData: LoaderData = {
            user,
            message: "Password successfully changed & token regenerated.",
            type: "success",
            time: new Date().getTime()
        };

        return loaderData;
    }

    let result: LoaderData = {
        user,
        message: null,
        type: null,
        time: null
    };

    return result;
}

export default function DashboardSettings() {
    let data = useLoaderData<LoaderData>();
    let actionData = useActionData<ActionData>();

    let [name, setName] = useState(data.user.username);
    let [avatar, setAvatar] = useState(data.user.avatar);
    let [description, setDescription] = useState(data.user.description);

    return (
        <>
            {actionData && ((new Date().getTime() - actionData.time) < 1000) && <Notification type={actionData.type} description={actionData.message}/>}
            {data.message && data.type && data.time && ((new Date().getTime() - data.time) < 1000) && <Notification type={data.type} description={data.message}/>}
            <h1 className="poppins-700">User settings</h1>
            <div className="mt-4 px-2">
                <Form method="post">
                    <div>
                        <p className="text-gray-700 text-sm poppins-500">Old password:</p>
                        <input id="old-password" type="password" name="old-password" className="mt-1 py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] w-full md:w-[300px] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" placeholder="***********"/>
                    </div>
                    <div className="mt-2">
                        <p className="text-gray-700 text-sm poppins-500">New password:</p>
                        <input id="new-password" type="password" name="new-password" className="mt-1 py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] w-full md:w-[300px] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" placeholder="***********"/>
                    </div>
                    <button className="py-1 mt-3 px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px]">Save</button>
                </Form>

                <Form method="post">
                    <div className="mt-5">
                        <p className="text-gray-700 text-sm poppins-500">Username:</p>
                        <input id="username" value={name} onChange={(e) => setName(e.target.value)} name="username" maxLength={24} className="mt-1 w-full md:w-[300px] py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" placeholder="Username"/>
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
                        <p className="text-gray-700 text-sm poppins-500">Preview::</p>
                        <AuthorCard className="mt-1 w-full lg:w-[400px]" key={avatar && description && name} avatar={avatar} description={description} username={name}/>
                    </div>
                    <button className="py-1 mt-3 px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px]">Save</button>
                </Form>
            </div>
        </>
    );
}
