import type { LoaderFunction, MetaFunction } from "remix";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";
import { authMiddleware } from "../services/auth.server";
import { NavLink, Outlet } from "remix";

export let loader: LoaderFunction = async ({request}) => {
    await authMiddleware(request);
    return null;
}

export default function DashboardLayout() {
    return (
        <div className="bg-gray-50">
            <Navbar/>
            <div className="md:flex w-full">
                <div className="w-[300px] mx-auto">
                    <div className="bg-white mx-auto w-full mt-10 rounded-md shadow-sm">
                        <NavLink to="/dashboard/settings" className="py-2 px-2 text-black/60 hover:text-black mr-2 hover:bg-[#9F9CFF42] poppins w-full rounded-t-md inline-block">
                            Uživateľské nastavenia
                        </NavLink>
                        <NavLink to="/dashboard/users" className="py-2 px-2 text-black/60 hover:text-black mr-2 hover:bg-[#9F9CFF42] poppins w-full inline-block">
                            Uživatelia
                        </NavLink>
                        <NavLink to="/dashboard/posts" className="py-2 px-2 text-black/60 hover:text-black mr-2 hover:bg-[#9F9CFF42] poppins w-full rounded-b-md inline-block">
                            Posty
                        </NavLink>
                    </div>
                </div>
                <div className="w-[300px] md:w-[400px] lg:w-[600px] xl:w-[800px] 2xl:w-[1000px] mx-auto">
                    <div className="bg-white w-full mt-10 rounded-md shadow-sm p-2">
                        <Outlet/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
