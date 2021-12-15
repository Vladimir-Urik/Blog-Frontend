import { createCookieSessionStorage } from "remix";

export let storage = createCookieSessionStorage({
    cookie: {
        name: "blog_session",
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        sameSite: "lax",
        path: "/",
        secure: false
    }
})