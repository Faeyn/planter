import Image from "next/image"
import svgPlant from "@/assets/plant.svg"
import svgSave from "@/assets/save.svg"
import Bar from "@/components/elements/bar"
import LayoutSection from "@/components/layout/LayoutSection"
import { FetchWrapper } from "../../utils/fetchWrapper"
import { useContext } from "react"
import { PageState, PlanterContext } from "@/pages/planter"

const BACKEND_URL = "http://localhost:8080/plant"

export const PlantEditor = () => {
  const { plantFocus, setPlantFocus, setPageState } = useContext(PlanterContext)

  const handleSubmit = async () => {
    const plantFetch = new FetchWrapper(BACKEND_URL)
    plantFetch.setBody(plantFocus)
    const newPlant = await plantFetch.postRequest()
    setPlantFocus(newPlant)
    setPageState(PageState.DETAILS)
  }

  return (
    <LayoutSection>
      <div className="flex justify-center">
        <Image
          className="rounded-[20px] h-[300px] w-[50%]"
          src={svgPlant}
          alt={"plant"}
        />
      </div>

      <div className="flex flex-col gap-[5px]">
        <input
          type="text"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navaraBlue focus:border-transparent"
          placeholder="Type"
          value={plantFocus.type}
          onChange={(e) =>
            setPlantFocus({ ...plantFocus, type: e.target.value })
          }
        />
        <input
          type="text"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navaraBlue focus:border-transparent"
          placeholder="Locatie"
          value={plantFocus.locatie}
          onChange={(e) =>
            setPlantFocus({ ...plantFocus, locatie: e.target.value })
          }
        />
        <input
          type="number"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navaraBlue focus:border-transparent"
          placeholder="Water (ML)"
          value={plantFocus.water ? plantFocus.water : ""}
          onChange={(e) =>
            setPlantFocus({
              ...plantFocus,
              water: parseInt(e.target.value, 10),
            })
          }
        />
        <input
          type="number"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-navaraBlue focus:border-transparent"
          placeholder="Frequentie (Dagen)"
          value={plantFocus.frequentie ? plantFocus.frequentie : ""}
          onChange={(e) =>
            setPlantFocus({
              ...plantFocus,
              frequentie: parseInt(e.target.value, 10),
            })
          }
        />
      </div>

      <Bar cssColor="bg-green-400" width={150} onClick={handleSubmit}>
        <Image className={"h-[20px]"} src={svgSave} alt="save icon" />
      </Bar>
    </LayoutSection>
  )
}
