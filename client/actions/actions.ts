'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getUserData= async()=>{
    const {getUser}= getKindeServerSession()
    const user = await getUser()

    return user
}

export async function submitHandler(e:FormData){

}