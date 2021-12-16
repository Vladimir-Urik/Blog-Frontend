import { redirect } from "remix"
import { AxiosResponse } from "axios"
import client from "./axios.server";
import {storage} from "./session.server";

export async function login(request: Request, username: string, password: string): Promise<any> {
    let response: AxiosResponse;

    try {
        response = await client.post("/auth/login", {
            username: username,
            password: password
        });
    } catch (e: any){
        return {
            error: {
                data: e.response.data.error,
                time: new Date().getTime()
            }
        }
    }

    let session = await storage.getSession(request.headers.get("Cookie"));
    await session.set("token", response.data.token);

    return {
        redirect: redirect("/", {
            headers: {
                "Set-Cookie": await storage.commitSession(session)
            }
        })
    }
}

export async function logout(request: Request): Promise<any> {
    let session = await storage.getSession(request.headers.get("Cookie"));

    return redirect("/?logout", {
        headers: {
            "Set-Cookie": await storage.destroySession(session)
        }
    });
}

export async function isLogged(request: Request): Promise<boolean> {
    return !!await getToken(request)
}

export async function getToken(request: Request): Promise<any> {
    let session = await storage.getSession(request.headers.get("Cookie"));
    return session.get("token")
}

export async function changeToken(request: Request, token: string, redirectPath: string): Promise<void> {
    let session = await storage.getSession(request.headers.get("Cookie"));
    await session.set("token", token)
    throw redirect(redirectPath, {
        headers: {
            "Set-Cookie": await storage.commitSession(session)
        }
    })
}

export async function getSessionInfo(request: Request): Promise<any> {
    let token = await getToken(request);
    if(!token) return null;

    let response: AxiosResponse;
    try {
        response = await client.get("/session", {
            headers: {
                Authorization: token
            }
        });
    } catch (e: any) {
        throw redirect("/logout");
    }

    return response.data;
}

export async function authMiddleware(request: Request): Promise<void> {
    if(await isLogged(request)) return;

    throw redirect("/login");
}

export async function guestMiddleware(request: Request): Promise<void> {
    if(!await isLogged(request)) return;

    throw redirect("/");
}