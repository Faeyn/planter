import Image, { StaticImageData } from "next/image"
import watering from "../../assets/watering.svg"
import edit from "@/assets/edit.svg"
import LayoutSection from "../layout/LayoutSection"
import svgPlant from "../../assets/plant.svg"
import { PageState, PlanterContext } from "@/pages/planter"
import { useContext } from "react"
import { PlantData } from "@/pages/api/interface"
import { FetchWrapper } from "@/utils/fetchWrapper"

const BACKEND_URL = "http://localhost:8080/plant"

export default function PlantCard() {
  const { plantFocus, setPlantFocus, setPageState } = useContext(PlanterContext)

  const handleOnClick = async () => {
    const plantFetch = new FetchWrapper(BACKEND_URL)
    plantFetch.setBody(plantFocus)
    const newPlant = await plantFetch.putRequest()
    setPlantFocus(newPlant)
  }

  return (
    <LayoutSection>
      <PlantImage plantFocus={plantFocus} />
      <PlantDetails />
      <div className="flex w-full h-[80%] items-center justify-evenly">
        <WaterPlant onClick={handleOnClick} />
        <EditButton />
      </div>
    </LayoutSection>
  )
}

const EditButton: React.FC = () => {
  const { setPageState } = useContext(PlanterContext)
  return (
    <div
      onClick={() => {
        setPageState(PageState.EDIT_PLANT)
      }}
      className="flex justify-center shadow-lg w-[100px] h-[100px] rounded-full bg-plant border border-black hover:bg-highlight"
    >
      <Image className="w-[60%]" src={edit} alt={"edit icon"} />
    </div>
  )
}

const PlantImage: React.FC<{ plantFocus: PlantData }> = ({ plantFocus }) => {
  return (
    <div className="flex justify-center mt-[20px]">
      <Image
        className="rounded-[20px] h-[280px]"
        src={plantFocus.img ? plantFocus.img : svgPlant}
        height={280}
        width={280}
        alt={"plant"}
      />
    </div>
  )
}

const PlantDetails: React.FC = () => {
  const { plantFocus: plant } = useContext(PlanterContext)

  const plantKeys: (keyof PlantData)[] = [
    "type",
    "locatie",
    "water",
    "frequentie",
  ]

  return (
    <div className="flex flex-row w-full items-start justify-start">
      <div className="w-[40%] ml-[70px]">
        Type: <br />
        Locatie: <br />
        ML water: <br />
        frequentie: <br />
      </div>
      <div className="w-[60%]">
        {plantKeys.map((key) => (
          <>
            {plant[key]} <br />
          </>
        ))}
      </div>
    </div>
  )
}

const WaterPlant: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center shadow-lg w-[100px] h-[100px] rounded-full bg-navaraBlue border border-black hover:bg-highlight"
    >
      <Image
        className="w-[75%]"
        src={watering as StaticImageData}
        alt={"watering"}
      />
    </div>
  )
}
