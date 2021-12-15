export default function AuthorCard({avatar = "https://i.imgur.com/kVwGJt5.png", username = "Username", description = "Basic user descriptions", className = ""}) {
    return (
        <div className={className}>
            <div className="bg-white cursor-pointer text-left rounded-md flex w-[300px] md:w-[400px] py-2 px-4 mt-6 transition-colors transition-transform duration-200 hover:transform hover:-translate-y-1 hover:bg-[#9F9CFF42] shadow-sm">
                <div className="w-1/4">
                    <img src={avatar} className="rounded-full" alt="Author avatar"/>
                </div>
                <div className="w-3/4 self-center ml-3">
                    <p className="poppins-500">{username}</p>
                    <p className="poppins">{description}</p>
                </div>
            </div>
        </div>
    );
}