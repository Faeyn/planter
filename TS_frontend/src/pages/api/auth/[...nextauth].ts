import { FetchWrapper } from "@/components/fetchWrapper";
import NextAuth, { AuthOptions, User } from "next-auth";
import Google from "next-auth/providers/google"

const BACKEND_URL = "http://localhost:3000/users"
const userFetch = new FetchWrapper(BACKEND_URL)

export const authOptions: AuthOptions = {
    providers: [
        Google({
            clientId:"844116134377-m2088nqev7b91ehl9i3b7pfljr3rrpfq.apps.googleusercontent.com",
            clientSecret: "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",
        })
    ],
    callbacks: {
        async signIn({user}) {
            if (!user.email?.endsWith("@navara.nl")) {return false}
            
            userFetch.setBody(user)

           return false
        },
        async redirect({url, baseUrl}) {
            console.log(url, baseUrl)
            return url
        }
    },
    events: {
        
    }
    
}

export default NextAuth(authOptions)