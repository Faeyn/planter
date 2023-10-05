import Image from "next/image"
import svgPlant from "@/assets/plant.svg"
import svgSave from "@/assets/save.svg"
import skull from "@/assets/skull.svg"
import Bar from "@/components/elements/bar"
import LayoutSection from "@/components/layout/LayoutSection"
import { FetchWrapper } from "../../utils/fetchWrapper"
import { useContext, useEffect, useState } from "react"
import { PageState, PlanterContext } from "@/pages/planter"

const BACKEND_URL = process.env.BACKEND_URL

export const PlantEditor = () => {
  const { plantFocus, setPlantFocus, pageState, setPageState } =
    useContext(PlanterContext)

  const handleSubmit = async () => {
    const plantFetch = new FetchWrapper(BACKEND_URL + "/plant")
    plantFetch.setBody(plantFocus)
    const newPlant = await plantFetch.postRequest()
    setPlantFocus(newPlant)
    setPageState(PageState.DETAILS)
  }

  const handleDelete = async () => {
    const confirmed = window.confirm("Weet je het zeker?")
    if (confirmed) {
      const plantFetch = new FetchWrapper(BACKEND_URL + "/plant")
      plantFetch.setBody(plantFocus)
      await plantFetch.deleteRequest()
      setPageState(PageState.INITIAL)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()

        reader.onload = (event) => {
          if (event.target && typeof event.target.result === "string") {
            const base64 = event.target.result
            setPlantFocus({ ...plantFocus, img: base64 })
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <LayoutSection>
      <div className="flex relative justify-center">
        <Image
          className="rounded-[20px] h-[280px] mt-[20px]"
          src={plantFocus.img ? plantFocus.img : svgPlant}
          alt={"plant"}
          height={280}
          width={280}
        />
        <input
          type="file"
          className="absolute top-[260px] w-[102px] border rounded-md focus:outline-none focus:ring-2 focus:ring-navaraBlue focus:border-transparent"
          placeholder="file"
          onChange={handleFileChange}
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
      <div className="w-full flex justify-evenly">
        <Bar cssColor="bg-plant" width={150} onClick={handleSubmit}>
          <Image className={"h-[20px]"} src={svgSave} alt="save icon" />
        </Bar>

        {pageState === PageState.EDIT_PLANT && (
          <Bar cssColor="bg-navaraRed" width={150} onClick={handleDelete}>
            <Image className={"h-[20px]"} src={skull} alt="skull icon" />
          </Bar>
        )}
      </div>
    </LayoutSection>
  )
}
