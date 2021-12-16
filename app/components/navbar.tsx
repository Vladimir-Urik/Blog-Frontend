import { Link, NavLink } from "remix";

export default function Navbar() {

    return (
        <div className="w-full bg-white">
            <div className="mx-auto flex flex-wrap justify-between items-center py-4 w-full">
                <div className="block flex-grow lg:flex lg:items-center lg:w-auto px-16">
                    <h1 className="text-black self-center poppins-700 text-xl text-center lg:text-left"><Link to="/">Blog.</Link></h1>
                    <div className="text-sm flex-grow text-center mx-auto">
                        <NavLink to="/" className="block mt-5 text-[14px] inline-block lg:mt-0 text-black/60 hover:text-black mr-2 hover:bg-[#9F9CFF42] py-2 px-3 rounded-[4px] poppins">Domov</NavLink>
                        <NavLink to="/authors" className="block mt-1 text-[14px] inline-block lg:mt-0 text-black/60 hover:text-black mr-2 hover:bg-[#9F9CFF42] py-2 px-3 rounded-[4px] poppins">Autori</NavLink>
                        <NavLink to="/contact" className="block mt-1 text-[14px] inline-block lg:mt-0 text-black/60 hover:text-black mr-2 hover:bg-[#9F9CFF42] py-2 px-3 rounded-[4px] poppins">Kontakt</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}