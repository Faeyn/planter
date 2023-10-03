import { useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import LayoutSection from "./layout/LayoutSection"

export { RouteGuard }

function RouteGuard({ children }: { children: ReactNode }): JSX.Element | null {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (router.asPath !== "/" && !session) {
      return void router.push("/")
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  if (router.asPath !== "/" && !session) {
    return null
  }

  return <div>{children}</div>
}
