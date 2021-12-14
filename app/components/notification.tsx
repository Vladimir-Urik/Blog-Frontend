function getTypeCSS(type: string): string {
    if(type == "info"){
        return "border-blue-600"
    }
    if(type == "success"){
        return "border-green-600"
    }
    if(type == "warning"){
        return "border-yellow-600"
    }
    if(type == "error"){
        return "border-red-600"
    }

    return "border-gray-600"
}

export default function Notification({ type = 'info', className = '', description = "description", ...props }) {
    return (
        <div className={`${className} z-50 alert border-l-[6px] ${getTypeCSS(type)} py-3 px-4 text-gray-700 rounded-md shadow-md bg-white`} {...props}>
            {description}
        </div>
    )
}