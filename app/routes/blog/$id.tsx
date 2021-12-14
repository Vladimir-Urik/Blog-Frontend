import { getPost } from "../../services/blog.server";
import {LoaderFunction, redirect} from "remix";

export let loader: LoaderFunction = async ({params}) => {
    if(!params.id) return {};

    let post = await getPost(params.id);
    if(post && post.status){
        throw new Response("Not Found", {
            status: 404
        });
    }

    return {
        post: post
    }
}

export default function Blog() {
    return (
        <>

        </>
    )
}