import { HomeIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { type DataFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { destroySession, getSession } from "~/session.server";

export async function action({request}: DataFunctionArgs){
    const session = await getSession(request.headers.get("Cookie"))

    return redirect("/login", {
        headers:{
            "Set-Cookie":await destroySession(session)
        }
    })
}

export default function User(){
    return(
        <>
        <div className="bg-zinc-800 min-h-screen">
        <div className="max-w-md mx-auto">
            <header className="flex justify-end px-4 py-4">
                <nav>
                        <Bars3Icon className=" w-10 h-10 text-blue-600 "/>
                        <Form method="post">
                            <button type="submit">Logout</button>
                        </Form>
                </nav>
            </header>
            <main>
                <section className="pb-8">
                    <UserCircleIcon className="text-white mx-auto w-40 h-40 border-4 rounded-full border-blue-600"/>
                </section>
                <section className="bg-zinc-600 h-[500px] rounded-t-3xl p-8">
                    <div className="flex flex-col">
                        <p className="text-white mb-10">User profile</p>
                        <p className="text-white">Nome</p>
                        <input type="text" className="mb-4 bg-transparent border-b-2 border-b-blue-600" placeholder="Felipe"/>
                        <p className="text-white">Sobrenome</p>
                        <input type="text" className="mb-4 bg-transparent border-b-2 border-b-blue-600" placeholder="Mendes"/>
                        <p className="text-white">Sexo</p>
                        <input type="text" className="mb-4 bg-transparent border-b-2 border-b-blue-600" placeholder="Masculino"/>
                        <p className="text-white">Idade</p>
                        <input type="text" className="mb-4 bg-transparent border-b-2 border-b-blue-600" placeholder="19"/>
                    </div>
                </section>
            </main>
            <footer className="max-w-md mx-auto flex px-4 justify-between items-center fixed bottom-0 left-0 right-0 z-30 h-20 border-t bg-zinc-800">
                    <HomeIcon className=" w-10 h-10 text-white"/>
                    <UserCircleIcon className=" w-10 h-10 text-white"/>
            </footer>
        </div>
        </div>
        </>
    )
}