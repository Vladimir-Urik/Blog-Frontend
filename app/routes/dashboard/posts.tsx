import type { MetaFunction } from "remix";
import React from "react";

export let meta: MetaFunction = () => {
    return {
        title: "Blog • Posty",
        description: "Blog authors list"
    };
};

export default function DashboardPosts() {
    return (
        <>
            <h1 className="poppins-700">Posty</h1>
        </>
    );
}
