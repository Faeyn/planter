import LayoutSection from "@/components/layout/LayoutSection"
import { useState } from "react"
import Image from "next/image"

const Tester: React.FC = () => {
  const [imgString, setImgString] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()

        reader.onload = (event) => {
          if (event.target && typeof event.target.result === "string") {
            const base64 = event.target.result
            setImgString(base64)
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <LayoutSection>
      <input
        type="file"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navaraBlue focus:border-transparent"
        placeholder="file"
        onChange={handleFileChange}
      />
      <Image src={imgString} alt="lol" width={300} height={300} />
    </LayoutSection>
  )
}

export default Tester
