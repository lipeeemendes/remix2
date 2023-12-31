import { type DataFunctionArgs, json, redirect} from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { createUser, getUserByEmail } from "~/models/user.server";

export async function action({request}:DataFunctionArgs){

  const data = await request.formData();
  const email = data.get("email") as string;
  const password = data.get("password") as string;
  
  if (password.length < 4) {
    return json("A senha deve ter pelo menos 4 caracteres" );
  }
  
  const user = await getUserByEmail(email) 
  if (user) {
    return json("Email já cadastrado");
  }

  const response = await createUser(email,password)
  if(!response){
    return json({error:"nao cadastrado"})
      }
  
  return redirect("/login", {
    headers: {
      "Set-Cookie":"name=lipe"
    }
  });
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
                    <Link to={"/login"} className="text-white">
                    Ja tenho conta
                    </Link>
                    {JSON.stringify(error)}
                </div>
            </div>
        </div>
        </>
    )
}