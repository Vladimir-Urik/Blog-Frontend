import {ActionFunction, Form, LoaderFunction, MetaFunction, useActionData} from "remix";
import {guestMiddleware, login} from "../services/auth.server";
import Notification from "../components/notification";

export let meta: MetaFunction = () => {
    return {
        title: "Login",
        description: "Login page"
    };
};

export let loader: LoaderFunction = async ({request}) => {
    await guestMiddleware(request);

    return null;
}

export let action: ActionFunction = async ({request}) => {
    await guestMiddleware(request);

    let formData = await request.formData();
    let username: string = formData.get("username") as string;
    let password: string = formData.get("password") as string;

    let {error, redirect} = await login(request, username, password);

    return error || redirect
};

export default function Login() {
    let error = useActionData();

    return (
        <div className="bg-gray-100 h-screen w-full">
            {error != null && ((new Date().getTime() - error.time) < 1000) && <Notification type={"error"} description={error.data}/>}
            <div className="mx-auto px-4 py-6 bg-white shadow-sm max-w-[18rem] rounded-md vertical-center right-0 left-0">
                <h1 className="text-black self-center poppins-700 text-[50px] text-center">Blog.</h1>
                <Form method="post">
                    <div className="mt-5">
                        <p className="text-gray-700 text-sm poppins-500">Username:</p>
                        <input id="username" name="username" className="mt-1 text-center w-full py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" placeholder="Username"/>
                        <p className="mt-3 text-gray-700 text-sm poppins-500">Password:</p>
                        <input id="password" name="password" className="mt-1 text-center w-full py-1 px-4 bg-gray-100 hover:bg-[#9F9CFF42] focus:bg-[#9F9CFF42] text-black hover:shadow-sm hover:shadow-indigo-300/20 focus:outline-none focus:shadow-sm focus:shadow-indigo-300/20 transition-colors duration-200 shadow-sm rounded-md poppins" type="password" placeholder="********"/>
                    </div>
                    <div className="mt-8 text-center">
                        <button className="py-2 px-4 bg-indigo-500 rounded-md text-indigo-100 poppins hover:bg-indigo-600 hover:text-indigo-200 hover:shadow-sm hover:shadow-indigo-600/50 transition-all duration-200">Login</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}