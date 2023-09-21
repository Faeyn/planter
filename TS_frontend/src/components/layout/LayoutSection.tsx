import { ReactNode } from "react"

interface LayoutSectionProps {
  children?: ReactNode
}

const LayoutSection: React.FC<LayoutSectionProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center m-[10px] bg-white h-[620px] w-[360px] p-[20px] rounded-[50px] gap-[20px] text-black">
      {children}
    </div>
  )
}

export default LayoutSection
