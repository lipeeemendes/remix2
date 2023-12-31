import { json, redirect} from "@remix-run/node";
import type { DataFunctionArgs} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { getUserByEmail } from "~/models/user.server";
import { commitSession, getSession } from "~/session.server";

export async function loader({request}:DataFunctionArgs){
    const session = await getSession(request.headers.get("Cookie"))
    if(session.has("userId")){
        return redirect("/user")
    }
    return json({})
}

export async function action({request}:DataFunctionArgs){
    const data = await request.formData()
    const session = await getSession(request.headers.get("Cookie"))
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (password.length < 4) {
        return json("A senha deve ter pelo menos 4 caracteres" );
    }

    const user = await getUserByEmail(email)
      if(!user){
        return json({error: "Usuario invalido"})
      }

      if(user.password=== password){
        session.set("userId", user.id)
        return redirect("/user", {
            headers: {
                "Set-Cookie": await commitSession(session)
            }
        });
        }
    return json({})
    }
export default function Login(){
    const error= useActionData<typeof action>()

    return(
        <>
        <div className="bg-zinc-800 h-screen py-28 px-4 w-full">
            <div className="w-full bg-zinc-600 flex justify-center rounded-lg items-center max-w-md mx-auto">
                <div className="">
                    <h1 className="text-2xl font-semi-bold text-center py-8 text-white">Login</h1>
                    <Form method="post">
                        <div className="flex flex-col gap-4 px-8 mb-10">
                            <input type="text" id="email" name="email" placeholder="E-mail" className=" h-9 bg-transparent border-b-2 border-b-blue-600"/>
                            <input type="password" id="password" name="password" placeholder="Password" className=" h-9 bg-transparent border-b-2 border-b-blue-600"/>
                            <button type="submit" className=" bg-blue-600 h-9 rounded-2xl text-white hover:bg-blue-400">Sign In</button>
                        </div>
                    </Form>
                    {JSON.stringify(error)}
                </div>
            </div>
        </div>
        </>
    )
}