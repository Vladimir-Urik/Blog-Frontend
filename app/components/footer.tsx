import React from "react";
import { ChatAlt2Icon, CodeIcon, ShareIcon } from '@heroicons/react/solid'

export default function Footer({className = ""}) {
    return (
        <div className={`${className} "w-full bg-white py-2 mt-10`}>
            <div className="mt-8 text-center">
                <h1 className="text-black poppins-700 text-2xl">Blog.</h1>
                <p className="poppins-500 text-sm mt-2">© {new Date().getFullYear()} Vladimír Urík</p>
            </div>
            <div className="mt-4 text-center items-center justify-center mb-8">
                <a className="bg-gray-50 hover:bg-[#9F9CFF42] group p-2 rounded-full mr-1 ml-1" href="https://discord.com/users/535708984959827978">
                    <ChatAlt2Icon className="h-5 w-5 fill-black/60 group-hover:fill-black inline align-text-bottom"/>
                </a>
                <a className="bg-gray-50 hover:bg-[#9F9CFF42] group p-2 rounded-full mr-1 ml-1" href="https://github.com/Vladimir-Urik">
                    <CodeIcon className="h-5 w-5 fill-black/60 group-hover:fill-black inline align-text-bottom"/>
                </a>
                <a className="bg-gray-50 hover:bg-[#9F9CFF42] group p-2 rounded-full mr-1 ml-1" href="https://twitter.com/intent/tweet?text=https://blog.gggedr.xyz/">
                    <ShareIcon className="h-5 w-5 fill-black/60 group-hover:fill-black inline align-text-bottom"/>
                </a>
            </div>
        </div>
    )
}