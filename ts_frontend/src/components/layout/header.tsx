import { StaticImageData } from "next/image"
import navaraLogo from "@/assets/navara-logo.svg"
import React from "react"
import Image from "next/image"

const AppHeader = () => {
  return (
    <header className="flex justify-center bg-navaraNavy h-[120px]">
      <Image src={navaraLogo as StaticImageData} alt="Navara Logo" />
    </header>
  )
}

export default AppHeader
