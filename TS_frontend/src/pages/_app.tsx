import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider, useSession } from "next-auth/react"
import AppHeader from "@/components/layout/header"
import { useRouter } from "next/router"
import { redirect } from "next/dist/server/api-utils"
import { RouteGuard } from "@/components/RouteGuard"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <RouteGuard>
        <AppHeader />

        <div className="flex h-[calc(100vh-120px)] justify-center bg-navaraNavy text-white">
          <Component {...pageProps} />
        </div>
      </RouteGuard>
    </SessionProvider>
  )
}
