import {ActionFunction, LoaderFunction, MetaFunction} from "remix";
import {authMiddleware, logout} from "../services/auth.server";

export let meta: MetaFunction = () => {
    return {
        title: "Logout",
        description: "Logout page"
    };
};

export let loader: LoaderFunction = async ({request}) => {
    await authMiddleware(request);
    return logout(request);
};