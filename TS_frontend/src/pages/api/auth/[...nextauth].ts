import { FetchWrapper } from "@/utils/fetchWrapper";
import NextAuth, { AuthOptions, User } from "next-auth";
import Google from "next-auth/providers/google"
import { serialize } from "v8";

const BACKEND_URL = "http://localhost:8080/users"
const userFetch = new FetchWrapper(BACKEND_URL)
const checkUserAPI = new FetchWrapper(BACKEND_URL + "/check_email" )

export const authOptions: AuthOptions = {
    providers: [
        Google({
            clientId:"844116134377-m2088nqev7b91ehl9i3b7pfljr3rrpfq.apps.googleusercontent.com",
            clientSecret: "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",
        })
    ],
    callbacks: {
        async signIn({user}) {
            const {name, email, image} = user
            if (!email?.endsWith("@navara.nl")) {return false}

            checkUserAPI.setBody(email)
            const existingUser = await checkUserAPI.postRequest()

            if (!existingUser) {
                userFetch.setBody({name, email, image} as User)
                userFetch.postRequest()
            }

           return true
        },
    },
}

export default NextAuth(authOptions)