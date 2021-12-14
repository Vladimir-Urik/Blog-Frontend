import type { MetaFunction } from "remix";
import Navbar from "../components/navbar";
import { SearchIcon } from '@heroicons/react/solid'
import React, {useState} from "react";
import Post from "../components/post";
import Footer from "../components/footer";

export let meta: MetaFunction = () => {
  return {
    title: "Blog • Home",
    description: "Blog home page"
  };
};

function search(query: string) {
    if(query.length == 0) return;
    // TODO -> SEARCH
}

function onEnter(event: React.KeyboardEvent<HTMLInputElement>, query: string){
    if (event.key === 'Enter') {
        search(query);
    }
}

export default function Index() {
    const [query, setQuery] = useState('');

    return (
        <div className="bg-gray-50">
            <Navbar />
            <header className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 w-full h-[400px] flex">
                <div className="self-center mx-auto text-center">
                    <h1 className="poppins-700 text-[60px] text-black">Blog.</h1>
                    <h2 className="text-[15px] text-gray-800 poppins text-center max-w-[300px] lg:max-w-[450px]">Vitajte na blogu 15 ročného <span className="text-purple-800">Vladimíra "GGGEDR" Uríka</span> ktorého zaujíma výpočetná technika a programovanie.</h2>
                    <div className="mx-auto mt-5 bg-white shadow-lg p-2 rounded-sm max-w-[300px] lg:max-w-[400px]">
                        <div className="flex w-full">
                            <input onKeyDown={(event) => onEnter(event, query)} className="rounded-l-md w-3/4 px-3 py-2 bg-gray-100 focus:outline-none poppins" id="query-input" placeholder="Názov postu..." value={query} onChange={event => setQuery(event.target.value)}/>
                            <button onClick={() => search(query)} className="w-1/4 bg-indigo-600 rounded-r-md group hover:bg-indigo-800 transition-colors duration-200"><SearchIcon className="h-5 w-5 mx-auto fill-gray-200 group-hover:fill-gray-400 transition-colors duration-200"/></button>
                        </div>
                    </div>
                </div>
            </header>
            <div className="max-w-[300px] text-center md:max-w-[600px] lg:max-w-[900px] xl:max-w-[1200px] 2xl:max-w-[1300] mx-auto mt-[3em]">
                <h1 className="poppins-700 text-gray-800 text-center text-3xl md:text-left md:text-xl">Posty</h1>
                <div>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
