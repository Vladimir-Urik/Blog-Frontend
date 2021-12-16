import type { MetaFunction } from "remix";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import React from "react";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • Contact"
    };
};

export default function Contact() {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <header className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-full h-[300px] flex">
                <div className="self-center mx-auto text-center">
                    <h1 className="poppins-700 text-[60px] text-black">Contact</h1>
                </div>
            </header>
            <div className="mx-auto w-[350px] mt-12">
                <div className="mx-auto w-full bg-white shadow-sm py-2 px-4 flex">
                    <div className="w-1/2">
                        <h1 className="poppins-700 text-xl">Sites</h1>
                        <div className="mt-2">
                            <p className="text-[16px]">🐦 <a href="https://twitter.com/GGGEDR" className="poppins-500 text-gray-700 hover:text-blue-500">Twitter</a></p>
                        </div>
                        <div className="mt-2">
                            <p className="text-[16px]">📚 <a href="https://discord.com/users/535708984959827978" className="poppins-500 text-gray-700 hover:text-[#5865F2]">Discord</a></p>
                        </div>
                        <div className="mt-2">
                            <p className="text-[16px]">📨 <a href="mailto:gggedrvideos@gmail.com" className="poppins-500 text-gray-700 hover:text-red-500">E-Mail</a></p>
                        </div>
                    </div>
                    <div className="w-1/2 text-right">
                        <h1 className="poppins-700 text-xl">Other</h1>
                        <div className="mt-2">
                            <p className="text-[16px]"><a href="https://github.com/Vladimir-Urik" className="poppins-500 text-gray-700 hover:text-indigo-500">Github</a> 🐈</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-[16px]"><a href="https://www.reddit.com/" className="poppins-500 text-gray-700 hover:text-red-500">Reddit</a> 🤖</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-[16px]"><a href="https://twitch.tv/" className="poppins-500 text-gray-700 hover:text-purple-700">Twitch</a> 📺</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-[16px]"><a href="https://spotify.com" className="poppins-500 text-gray-700 hover:text-lime-500">Spotify</a> 🎶</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-[16px]"><a href="https://spotify.com" className="poppins-500 text-gray-700 hover:text-red-800">YouTube</a> 🎥</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer className={"mt-12"}/>
        </div>
    );
}
