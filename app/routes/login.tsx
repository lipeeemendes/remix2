import { Form } from "@remix-run/react";

export default function Login(){
    return(
        <>
        <div className="bg-zinc-800 h-screen py-28 px-4 w-full">
            <div className="w-full bg-zinc-600 flex justify-center rounded-lg items-center max-w-md mx-auto">
                <div className="">
                    <h1 className="text-2xl font-semi-bold text-center py-8 text-white">Login</h1>
                    <Form>
                        <div className="flex flex-col gap-4 px-8 mb-10">
                            <input type="text" id="name" placeholder="User Name" className=" h-9 bg-transparent border-b-2 border-b-blue-600"/>
                            <input type="password" id="password" placeholder="Password" className=" h-9 bg-transparent border-b-2 border-b-blue-600"/>
                            <button className=" bg-blue-600 h-9 rounded-2xl text-white hover:bg-blue-400">Sign In</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
        </>
    )
}