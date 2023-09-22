import { FetchWrapper } from "@/utils/fetchWrapper";
import NextAuth, { AuthOptions, User } from "next-auth";
import Google from "next-auth/providers/google"

const userFetch = new FetchWrapper("http://localhost:8080" + "/users")

export const authOptions: AuthOptions = {
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async signIn({user}) {
            const {name, email, image} = user
            if (!email) {return false}

            userFetch.setBody({name, email, image} as User)
            userFetch.postRequest()

           return true
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)