import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import AppHeader from "@/components/layout/header"
import { Restricted } from "@/components/layout/restricted"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Restricted>
        <AppHeader />
        <div className="flex h-[calc(100vh-120px)] justify-center bg-navaraNavy text-white">
          <Component {...pageProps} />
        </div>
      </Restricted>
    </SessionProvider>
  )
}
