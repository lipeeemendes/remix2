import { redirect, type DataFunctionArgs, json} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

export async function action({request}:DataFunctionArgs){
    const data = await request.formData()

    const email= data.get("email")
    const password= data.get("password")

    console.log(email)
    console.log(password)

    return json({error:"Email ja cadastrado"});
}

export default function SignUp(){
    const error= useActionData<typeof action>()

    return(
        <>
        <div className="bg-zinc-800 h-screen py-28 px-4 w-full">
            <div className="w-full bg-zinc-600 flex justify-center rounded-lg items-center max-w-md mx-auto">
                <div className="">
                    <h1 className="text-2xl font-semi-bold text-center py-8 text-white">Sign Up</h1>
                    <Form method="post">
                        <div className="flex flex-col gap-4 px-8 mb-10">
                            <input type="text" id="email" name="email" placeholder="Email" className=" h-9 bg-transparent border-b-2 border-b-blue-600"/>
                            <input type="password" id="password" name="password" placeholder="Password" className=" h-9 bg-transparent border-b-2 border-b-blue-600"/>
                            <button type="submit" className=" bg-blue-600 h-9 rounded-2xl text-white hover:bg-blue-400">Create Account</button>
                        </div>
                    </Form>
                    {JSON.stringify(error)}
                </div>
            </div>
        </div>
        </>
    )
}