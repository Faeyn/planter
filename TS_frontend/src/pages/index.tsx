import type { NextPage } from "next"
import { signIn, useSession } from "next-auth/react"
import type { StaticImageData } from "next/image"
import Image from "next/image"

import navaraLogo from "../assets/navara-logo.svg"
import GoogleLoginButton from "@/components/elements/GoogleLoginButton"
import { useEffect } from "react"
import { useRouter } from "next/router"
import LayoutSection from "@/components/layout/LayoutSection"

const LoginPage: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (session) {
    // User is already logged in, redirect them to a different page (e.g., the home page)
    router.push("/planter") // You can return null to prevent rendering the login page content
    return null
  }

  return (
    <LayoutSection>
      <h1 className="text-3xl text-navaraNavy">Inloggen</h1>
      <GoogleLoginButton
        onClick={() => void signIn("google", { callbackUrl: "/" })}
      />
    </LayoutSection>
  )
}

export default LoginPage
