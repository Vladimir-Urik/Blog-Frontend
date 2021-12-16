function getClasses(className: string): string {
    if(!(className.includes("md:") || className.includes("sm:") || className.includes("lg:"))){
        className = className +" sm:w-[300px] md:w-[400px]"
    }
    if(!className.includes("w-")) {
        className = className +" w-full"
    }
    return className;
}

export default function AuthorCard({avatar = "https://i.imgur.com/kVwGJt5.png", username = "Username", description = "Basic user description", className = ""}) {
    return (
        <div className={getClasses(className)}>
            <div className="bg-white text-left rounded-md flex w-full py-2 px-4 transition-colors transition-transform duration-200 hover:transform hover:-translate-y-1 hover:bg-[#9F9CFF42] shadow-sm">
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