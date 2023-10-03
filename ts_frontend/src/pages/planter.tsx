import type { NextPage } from "next"
import PlantCard from "@/components/planter/PlantCard"
import PlantIndex from "@/components/planter/PlantIndex"
import LayoutSection from "@/components/layout/LayoutSection"
import { createContext, useEffect, useMemo, useState } from "react"
import { PlantEditor } from "../components/planter/PlantEditor"
import { PlantData, initialPlantData } from "./api/interface"
import { FetchWrapper } from "@/utils/fetchWrapper"

export enum PageState {
  INITIAL,
  DETAILS,
  EDIT_PLANT,
  NEW_PLANT,
}

interface PlanterContextInerface {
  pageState: PageState
  setPageState: React.Dispatch<React.SetStateAction<PageState>>
  plantFocus: PlantData
  setPlantFocus: React.Dispatch<React.SetStateAction<PlantData>>
  plants: PlantData[]
  setPlants: React.Dispatch<React.SetStateAction<PlantData[]>>
}

export const PlanterContext = createContext<PlanterContextInerface>({
  pageState: PageState.DETAILS,
  setPageState: () => {},
  plantFocus: initialPlantData,
  setPlantFocus: () => {},
  plants: [],
  setPlants: () => {},
})

const Planter: NextPage = () => {
  const [pageState, setPageState] = useState<PageState>(PageState.INITIAL)
  const [plantFocus, setPlantFocus] = useState<PlantData>(initialPlantData)
  const [plants, setPlants] = useState<PlantData[]>([])

  // Define a mapping of pageState values to components
  const pageStateComponentMap = {
    [PageState.INITIAL]: <div />,
    [PageState.DETAILS]: <PlantCard />,
    [PageState.EDIT_PLANT]: <PlantEditor />,
    [PageState.NEW_PLANT]: <PlantEditor />,
  }

  // Render the component based on the pageState
  const renderedComponent = pageStateComponentMap[pageState] || null

  useEffect(() => {
    async function getPlantData() {
      const plantFetch = new FetchWrapper(process.env.BACKEND_URL + "/plant")
      plantFetch.getRequest().then((data) => {
        setPlants(data)
      })
    }

    const handleEscapeKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPageState(PageState.INITIAL)
      }
    }

    getPlantData()

    window.addEventListener("keydown", handleEscapeKeyPress)
    return () => {
      window.removeEventListener("keydown", handleEscapeKeyPress)
    }
  }, [pageState, plantFocus])

  return (
    <PlanterContext.Provider
      value={{
        pageState,
        setPageState,
        plantFocus,
        setPlantFocus,
        plants,
        setPlants,
      }}
    >
      <main className="flex justify-center">
        {renderedComponent}
        <PlantIndex />
      </main>
    </PlanterContext.Provider>
  )
}

export default Planter
