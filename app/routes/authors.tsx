import type { MetaFunction } from "remix";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {LoaderFunction, useLoaderData} from "remix";
import client from "../services/axios.server";
import AuthorCard from "../components/authorCard";
import React from "react";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • Authors",
        description: "Blog authors list"
    };
};

type LoaderData = {
    authors: any,
};

export let loader: LoaderFunction = async ({request}) => {
    let authors = await (await client.get("/users")).data;

    let result: LoaderData = {
        authors
    };

    return result
}

export default function Authors() {
    let data = useLoaderData<LoaderData>();

    return (
        <div className="bg-gray-50">
            <Navbar/>
            <header className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-full h-[300px] flex">
                <div className="self-center mx-auto text-center">
                    <h1 className="poppins-700 text-[60px] text-black">Autori</h1>
                </div>
            </header>
            <div className="max-w-[600px] mx-auto text-center lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1300]">
                {data.authors.map((author: {
                    id: number;
                    avatar: string;
                    username: string;
                    description: string;
                }) => <AuthorCard className="inline-block mr-2 ml-2 mt-5 w-[300px]" key={author.id} avatar={author.avatar} username={author.username} description={author.description}/>)}
            </div>
            <Footer />
        </div>
    );
}
