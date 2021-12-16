import {
  Link,
  Links,
  LiveReload, LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch, useLoaderData
} from "remix";
import type { LinksFunction } from "remix";
import {getSessionInfo} from "./services/auth.server";
import { LoginIcon, LogoutIcon } from '@heroicons/react/solid'

import cancel from "./images/cancel.svg"

import globalStylesUrl from "~/styles/global.css";
import tailwindUrl from "~/styles/tailwind.css";

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStylesUrl },
    { rel: "stylesheet", href: tailwindUrl }
  ];
};

type LoaderData = {
  user: any,
}

export let loader: LoaderFunction = async ({ request }) => {
  let user = await getSessionInfo(request);

  let result: LoaderData = {
    user
  };

  return result
}

export default function App() {
  let data = useLoaderData<LoaderData>();

  return (
    <Document>
      <Layout data={data}>
        <Outlet />
      </Layout>
    </Document>
  );
}


export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}


export function CatchBoundary() {
  let caught = useCatch();

  let error;
  switch (caught.status) {
    case 401:
      error = "Sem nemáte prístup!"
      break;
    case 404:
      error = "Táto stránka sa nenašla"
      break;

    default:
      error = caught.statusText
  }

  return (
    <Document title={`${caught.status} • ${error}`}>
      <Layout>
        <div className="bg-gray-100 h-screen w-full">
          <div className="mx-auto px-4 py-6 bg-white shadow-sm max-w-[18rem] rounded-md vertical-center right-0 left-0">
            <img src={cancel} alt={caught.status+""} />
            <h1 className="text-center mt-4 poppins-500 text-2xl text-red-500">{caught.status}</h1>
            <h1 className="text-center mt-1 poppins-500 text-2xl">{error}</h1>
          </div>
        </div>
      </Layout>
    </Document>
  );
}

function Document({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({ children, data }: { children: React.ReactNode, data?: LoaderData }) {
  return (
    <div>
      { (data != null ? (
          <>
            <div className={"group z-50 fixed bg-indigo-600 rounded-[5px] py-2 px-2 "+ (data.user == null ? "right-[1em]" : "right-[4.2em]") +" bottom-[1em] hover:bg-indigo-700 transition-all duration-200"}>
              {data.user != null ? (
                  <>
                    <Link to="/dashboard/settings">
                      <p className="text-white flex cursor-pointer"><span className="self-center mr-2 text-indigo-200 group-hover:text-opacity-80">{data.user.username}</span> <img src={data.user.avatar} className="h-[30px] w-[30px] rounded-full group-hover:opacity-80" alt="avatar"/></p>
                    </Link>
                    <div className="cursor-pointer group z-50 fixed bg-indigo-600 rounded-[5px] py-2 px-2 right-[1em] bottom-[1em] hover:bg-indigo-700 transition-all duration-200">
                      <Link to={"/logout"}>
                        <LogoutIcon className="h-[30px] w-[30px] text-indigo-100 text-opacity-70 group-hover:text-gray-100 group-hover:text-opacity-100 transition-all duration-200"/>
                      </Link>
                    </div>
                  </>
              ) : (
                  <div className={"z-50 fixed bg-indigo-600 rounded-[5px] py-2 px-2 "+ (data.user == null ? "right-[1em]" : "right-[4.2em]") +" bottom-[1em] hover:bg-indigo-700 transition-all duration-200"}>
                    <Link to={"/login"} title="Login">
                      <LoginIcon className="h-[30px] w-[30px] text-indigo-100 text-opacity-70 group-hover:text-gray-100 group-hover:text-opacity-100 transition-all duration-200"/>
                    </Link>
                  </div>
              )}
            </div>
          </>
      ) : null)}
      {children}
    </div>
  );
}