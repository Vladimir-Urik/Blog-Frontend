import { getPost } from "../../services/blog.server";
import {LoaderFunction, MetaFunction, useLoaderData} from "remix";
import Navbar from "../../components/navbar";
import {CSSProperties} from "react";
import { Marked } from '@ts-stack/markdown';
import Footer from "../../components/footer";
import AuthorCard from "../../components/authorCard";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • Post",
        description: "Blog post view"
    };
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

export default function Blog() {
    let data = useLoaderData<LoaderData>()

    const postImage: CSSProperties = {
        backgroundImage: `url(${data.post.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }

    return (
        <div className="bg-gray-50 w-full">
            <Navbar />
            <div className="max-w-[350px] text-left sm:max-w-[400px] md:max-w-[600px] lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1300] mx-auto mt-[3em]">
                <div style={postImage} className="rounded-md h-[200px] md:h-[300px] lg:h-[450px] xl:h-[600px] w-full">
                </div>
                <h1 className="poppins-700 text-[50px] text-center mt-8 text-ellipsis overflow-hidden">{data.post.title}</h1>
                <div className="mt-2 poppins markdown" dangerouslySetInnerHTML={{ __html: Marked.parse(data.post.content)}}/>
                <div className="text-center mt-16">
                    <h1 className="poppins-700 text-[30px] text-center">Author</h1>
                    <AuthorCard className="mx-auto" avatar={data.post.author.avatar} username={data.post.author.username} description={data.post.author.description} />
                </div>
            </div>
            <Footer />
        </div>
    )
}