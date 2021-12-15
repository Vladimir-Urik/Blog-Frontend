import type {ActionFunction, LoaderFunction, MetaFunction} from "remix";
import React from "react";
import client from "../../../services/axios.server";
import {Form, Link, redirect, useActionData, useLoaderData} from "remix";
import {getSessionInfo, getToken} from "../../../services/auth.server";
import {string} from "prop-types";
import Notification from "../../../components/notification";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • Uživateľia",
        description: "Blog authors list"
    };
};

type ActionData = {
    type: any,
    message: any,
    time: any
};

export let action: ActionFunction = async ({request}) => {
    let token = await getToken(request);
    let formData = await request.formData();
    let target = await formData.get("target");
    let result: ActionData = {
        type: "error",
        message: "Target user not found",
        time: new Date().getTime()
    };
    if(!target) return result;

    let response;
    try {
        response = await client.post(`/users/delete`, {
            target: parseInt(target.toString())
        }, {
            headers: {
                Authorization: token
            }
        });
    } catch (e: any) {
        response = e.response;
    }

    if(response.status === 200){
        result = {
            type: "success",
            message: response.data.message,
            time: new Date().getTime()
        };
    } else {
        result = {
            type: "error",
            message: response.data.error,
            time: new Date().getTime()
        };
    }

    return result;
}

type LoaderData = {
    users: any,
    user: any
};

export let loader: LoaderFunction = async ({request}) => {
    let response = await client.get("/users");

    let results: LoaderData = {
        users: response.data,
        user: await getSessionInfo(request),
    };

    return results;
}

export default function DashboardUsers() {
    let data = useLoaderData<LoaderData>()
    let actionData = useActionData<ActionData>();

    return (
        <>
            {actionData && ((new Date().getTime() - actionData.time) < 1000) && <Notification type={actionData.type} description={actionData.message}/>}
            <h1 className="poppins-700">Uživateľia</h1>
            <div className="mt-4 px-2">
                <table className="w-full text-left table-fixed rounded-md">
                    <thead className="bg-indigo-500/80">
                        <tr>
                            <th className="py-1 poppins-500 w-[40px] text-center">#</th>
                            <th className="py-1 poppins-500 w-[100px] md:w-[200px]">Username</th>
                            <th className="py-1 poppins-500 text-ellipsis overflow-hidden">Description</th>
                            <th className="py-1 poppins-500 w-[100px] text-center">Akcie</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.users.map((user: any) => (
                        <tr key={user.id} className="odd:bg-indigo-100/70 even:bg-indigo-200/70">
                            <td className="text-center py-1">
                                <img src={user.avatar} className="w-[30px] h-[30px] rounded-full mx-auto" alt="Avatar"/>
                            </td>
                            <td className="py-1 text-ellipsis overflow-hidden px-1 poppins">
                                {user.username}
                            </td>
                            <td className="py-1 text-ellipsis overflow-hidden px-1 poppins text-[15px]">{user.description}</td>
                            <td className="text-center">
                                {(user.id === data.user.id || user.id === 1) ? (
                                    <button className="py-1 px-2 md:px-4 bg-indigo-500/80 rounded-md text-indigo-100/80 poppins cursor-not-allowed text-[15px]" disabled>Zmazať</button>
                                ) : (
                                    <Form method="post">
                                        <input className="hidden" id="target" name="target" defaultValue={user.id}/>
                                        <button className="py-1 px-2 md:px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px]">Zmazať</button>
                                    </Form>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <div className="mt-3 mb-1">
                        <Link to="/dashboard/users/new" className="py-1 px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px]">Pridať</Link>
                    </div>
                </table>
            </div>
        </>
    );
}
