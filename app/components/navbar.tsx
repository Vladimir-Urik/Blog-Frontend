import { Link, NavLink } from "remix";

export default function Navbar() {

    return (
        <div className="w-full bg-white">
            <div className="mx-auto flex flex-wrap justify-between items-center py-4 w-full">
                <div className="block flex-grow lg:flex lg:items-center lg:w-auto px-16">
                    <h1 className="text-black self-center poppins-700 text-xl text-center lg:text-left"><Link to="/">Blog.</Link></h1>
                    <div className="text-sm flex-grow text-center mt-5 lg:mt-0 mx-auto">
                        <NavLink to="/" className="block text-[14px] mt-1  inline-block text-black/60 hover:text-black mr-1 ml-1 hover:bg-[#9F9CFF42] py-2 px-3 rounded-[4px] poppins">Home</NavLink>
                        <NavLink to="/authors" className="block text-[14px] mt-1 inline-block text-black/60 hover:text-black mr-1 ml-1 hover:bg-[#9F9CFF42] py-2 px-3 rounded-[4px] poppins">Authors</NavLink>
                        <NavLink to="/contact" className="block text-[14px] mt-1 inline-block text-black/60 hover:text-black mr-1 ml-1 hover:bg-[#9F9CFF42] py-2 px-3 rounded-[4px] poppins">Contact</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}