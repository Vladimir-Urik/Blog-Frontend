import type { MetaFunction } from "remix";
import Navbar from "../components/navbar";
import { SearchIcon } from '@heroicons/react/solid'
import React from "react";
import Post from "../components/post";
import Footer from "../components/footer";
import {ActionFunction, Form, LoaderFunction, useActionData, useLoaderData} from "remix";
import { getPosts } from "../services/blog.server";
import client from "../services/axios.server";
import search from "../images/search.svg"

export let meta: MetaFunction = () => {
  return {
    title: "Blog • Home",
    description: "Blog home page"
  };
};

type Data = {
    posts: any
};

export let action: ActionFunction = async ({request}) => {
    let formData = await request.formData();
    let query: string = formData.get("query") as string;

    let response = await client.post("/search/post", {
        query: query
    });

    let result:Data = {
        posts: response.data
    }

    return result;
};

export let loader: LoaderFunction = async ({request}) => {
    let posts = await getPosts();

    let result: Data = {
        posts
    };

    return result
}

export default function Index() {
    let data = useLoaderData<Data>()
    let dataFromAction = useActionData<Data>()

    if(dataFromAction){
        data = dataFromAction
    }

    return (
        <div className="bg-gray-50">
            <Navbar />
            <header className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-full h-[400px] flex">
                <div className="self-center mx-auto text-center">
                    <h1 className="poppins-700 text-[60px] text-black">Blog.</h1>
                    <h2 className="text-[15px] text-gray-800 poppins text-center max-w-[300px] lg:max-w-[450px]">Welcome to <a className="text-indigo-700 hover:text-indigo-900 hover:underline hover:underline-offset-4 hover:decoration-indigo-700/[.33] hover:decoration-2" href="https://github.com/Vladimir-Urik">Vladimír "GGGEDR" Urík</a>'s blog</h2>
                    <div className="mx-auto mt-5 bg-white shadow-lg p-2 rounded-[4px] max-w-[300px] lg:max-w-[400px]">
                        <Form method="post">
                            <div className="flex w-full">
                                <input className="rounded-l-md w-3/4 px-3 py-2 bg-gray-100 focus:outline-none poppins" id="query" name="query" placeholder="Post title..."/>
                                <button type="submit" className="w-1/4 bg-indigo-600 rounded-r-md group hover:bg-indigo-700 transition-colors duration-200"><SearchIcon className="h-5 w-5 mx-auto fill-indigo-100 opacity-70 group-hover:fill-gray-100 group-hover:opacity-100 transition-colors duration-200"/></button>
                            </div>
                        </Form>
                    </div>
                </div>
            </header>
            <div className="max-w-[300px] text-center md:max-w-[600px] lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1300] mx-auto mt-[3em]">
                <h1 className="poppins-700 text-gray-800 text-center text-3xl md:text-left md:text-xl">Posts</h1>
                <div>
                    {data.posts.length > 0 && data.posts.map((post: {
                        id: number;
                        title: string;
                        image: string;
                        content: string;
                        description: string;
                        author: {
                            id: number;
                            avatar: string;
                            username: string;
                            description: string;
                        };
                        date: number;
                    }) => <Post key={post.id} id={post.id} title={post.title} image={post.image} description={post.description} author={post.author} date={new Date(post.date/1000).toDateString()} />)}
                    {data.posts.length == 0 && (
                        <div className="mx-auto px-4 py-6 max-w-[18rem] rounded-md">
                            <img src={search} alt="Not Found" />
                            <h1 className="text-center mt-1 poppins-500 text-2xl mt-5 text-gray-700">Ach to prázdno...</h1>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
