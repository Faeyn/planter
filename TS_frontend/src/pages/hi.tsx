import { Restricted } from "@/components/layout/restricted"
import { NextPage } from "next"

const Hi: NextPage = () => {
  return (
    <Restricted>
      <>hi</>
    </Restricted>
  )
}

export default Hi
