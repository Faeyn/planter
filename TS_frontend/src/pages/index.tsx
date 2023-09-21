import type { NextPage } from "next"
import { signIn, useSession } from "next-auth/react"
import type { StaticImageData } from "next/image"
import Image from "next/image"

import navaraLogo from "../assets/navara-logo.svg"
import GoogleLoginButton from "@/components/elements/GoogleLoginButton"
import { useEffect } from "react"
import { useRouter } from "next/router"

const LoginPage: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    // User is already logged in, redirect them to a different page (e.g., the home page)
    router.push("/planter")
    return null // You can return null to prevent rendering the login page content
  }

  return (
    <div className="flex h-screen justify-center bg-navaraNavy text-white">
      <div className="flex h-full w-[50%] items-center justify-center">
        <div className="z-20 flex max-h-64 w-[420px] flex-col gap-2 rounded-xl bg-white p-[50px] align-middle text-black">
          <h1 className="text-3xl text-navaraNavy">Inloggen</h1>
          <GoogleLoginButton
            onClick={() => void signIn("google", { callbackUrl: "/" })}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
