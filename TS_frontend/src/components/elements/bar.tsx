import { ReactNode } from "react"

interface BarProp {
  children?: ReactNode
  cssColor?: string
  width?: number
  height?: number
  onClick?: () => void
}

export default function Bar({
  children,
  width,
  height,
  cssColor,
  onClick,
}: BarProp) {
  const cssWidth = width ? `w-[${width}px]` : "w-full"
  const cssHeight = height ? `h-[${height}px]` : "h-[25px]"
  cssColor = cssColor ?? "bg-white"

  console.log(cssWidth)
  return (
    <div
      onClick={onClick}
      className={`flex ${cssWidth} ${cssHeight} ${cssColor} border border-black hover:bg-highlight rounded-full text-center items-center `}
    >
      {children}
    </div>
  )
}
