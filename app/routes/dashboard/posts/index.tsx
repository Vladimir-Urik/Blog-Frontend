import type {LoaderFunction, MetaFunction} from "remix";
import React from "react";
import {getPosts} from "../../../services/blog.server";
import {Form, Link, useLoaderData} from "remix";
import Notification from "../../../components/notification";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • Posty",
        description: "Blog authors list"
    };
};

type LoaderData = {
    posts: any
}

export let loader: LoaderFunction = async () => {
    let posts = await getPosts();

    return {
        posts
    };
};

export default function DashboardPosts() {
    let data = useLoaderData<LoaderData>()

    return (
        <>
            <h1 className="poppins-700">Posty</h1>
            <div className="mt-4 px-2">
                <div className="overflow-auto">
                    <table className="w-full text-left rounded-md min-w-[800px]">
                        <thead className="bg-indigo-500/70">
                        <tr>
                            <th className="py-1 px-2 poppins-500 text-ellipsis overflow-hidden">Title</th>
                            <th className="py-1 px-2 poppins-500 ">Popis</th>
                            <th className="py-1 px-2 poppins-500 text-ellipsis overflow-hidden">Autor</th>
                            <th className="py-1 px-2 poppins-500 text-ellipsis overflow-hidden">Dátum</th>
                            <th className="py-1 px-2 poppins-500 text-center">Akcie</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.posts.map((post: any) => (
                            <tr key={post.id} className="odd:bg-indigo-100/70 even:bg-indigo-200/70">
                                <td className="text-ellipsis overflow-hidden py-1 px-1 poppins">
                                    {post.title}
                                </td>
                                <td className="py-1 text-ellipsis overflow-hidden px-1 poppins text-[13px]">
                                    {post.description}
                                </td>
                                <td className="py-1 text-ellipsis overflow-hidden px-1 poppins">{post.author.username}</td>
                                <td>
                                    {new Date(post.date/1000).toDateString()}
                                </td>
                                <td className="text-center py-1 px-2">
                                    <Form method="post">
                                        <input className="hidden" id="target" name="target" defaultValue={post.id}/>
                                        <button className="py-1 px-2 md:px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px]">Edit</button>
                                    </Form>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-3 mb-1">
                    <Link to="/dashboard/posts/new" className="py-1 px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200 text-[15px]">Pridať</Link>
                </div>
            </div>
        </>
    );
}