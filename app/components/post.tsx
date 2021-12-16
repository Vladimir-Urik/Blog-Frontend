import {CSSProperties} from "react";
import {Link} from "remix";
import {Marked} from "@ts-stack/markdown";

export default function Post(
    {
        id = 0,
        title = "Post title",
        description = "Post description is very cool feature...",
        image= "https://i.imgur.com/AsqjiZP.jpeg",
        author = {
            id: 0,
            avatar: "https://i.imgur.com/kVwGJt5.png",
            username: "Admin",
        },
        date = "14. Decembra 2021",
        className = "",
        ...props
    }
) {
    const bgPost: CSSProperties = {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "150px",
        width: "100%"
    }

    return (
       <Link to={`/post/${id}`}>
           <div className={`${className} text-left rounded-md w-[275px] bg-white shadow-sm hover:bg-indigo-100 hover:transform hover:-translate-y-1 translation-all duration-200 mt-6 inline-block ml-3 mr-3 shadow-sm`} {...props}>
               <div style={bgPost} className={"rounded-t-md"}>
               </div>
               <div className="px-2 py-4">
                   <p className="text-xs text-gray-700 px-1 poppins-500">{date}</p>
                   <div className="inline-block text-3xl text-black poppins-700 px-1 mt-1 font-bold text-ellipsis overflow-hidden w-full"  dangerouslySetInnerHTML={{__html: Marked.parse(title)}}/>
                   <div className="mt-1 px-1 max-h-24 poppins text-[15px] markdown" dangerouslySetInnerHTML={{__html: Marked.parse(description)}}/>
               </div>
           </div>
       </Link>
    )
}