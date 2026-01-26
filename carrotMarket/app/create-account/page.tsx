"use client";

import { useActionState } from "react";
import { createAccount } from "./actions";
import Input from "../../components/form-input";
import Button from "../../components/form-btn";

import { FireIcon } from "@heroicons/react/24/solid";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/solid";
import { KeyIcon } from "@heroicons/react/24/solid";



export default function CreateAccount() {
   const [state, action] = useActionState(createAccount, null);

    return (
        <main className="w-96 *:box-border p-2 m-auto mt-16">
            <h1 className="text-center mb-8"><FireIcon className="m-auto h-10 w-10 text-red-500" /></h1>

            <section>
                <form action={action} className="flex flex-col gap-4 text-sm">
                    <div className="relative">
                        <EnvelopeIcon className="absolute left-4 top-[9px] h-4 w-4 text-gray-500" />
                        <Input defaultValue={state?.data.email} name="email" type="text" placeholder="Email" required errors={state?.errors?.fieldErrors.email}/>
                    </div>
                    <div className="relative">
                        <UserIcon  className="absolute left-4 top-[9px] h-4 w-4 text-gray-500" />
                        <Input defaultValue={state?.data.username} name="username" type="text" placeholder="Username" required errors={state?.errors?.fieldErrors.username} />
                    </div>
                    <div className="relative">
                        <KeyIcon   className="absolute left-4 top-[9px] h-4 w-4 text-gray-500" />
                        <Input defaultValue={state?.data.password} name="password" type="password" placeholder="Password" required errors={state?.errors?.fieldErrors.password} />
                    </div>
                    <div className="relative">
                        <KeyIcon   className="absolute left-4 top-[9px] h-4 w-4 text-gray-500" />
                        <Input defaultValue={state?.data.password_confirm} name="password_confirm" type="password" placeholder="password_confirm" required errors={state?.errors?.fieldErrors.password_confirm} />
                    </div>
        
                    <Button text="Create account"/>
                    {
                       state?.success ? <p className="bg-green-400 rounded-md px-4 py-2 font-bold text-gray-800">{state?.success} </p> : null
                    }
                </form>
            </section>
        </main>
    ) 
}