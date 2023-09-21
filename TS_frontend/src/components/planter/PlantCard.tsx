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
      <div
        onClick={() => {
          setPageState(PageState.EDIT_PLANT)
        }}
        className="relative left-[120px] top-[30px] flex justify-center shadow-lg w-[30px] h-[30px] rounded-full bg-plant border border-black hover:bg-highlight"
      >
        <Image className="w-[60%]" src={edit} alt={"edit icon"} />
      </div>
      {plantImage()}
      <PlantDetails />
      <WaterPlant onClick={handleOnClick} />
    </LayoutSection>
  )
}
function plantImage() {
  return (
    <div className="flex justify-center mt-[-40px] rounded-[20px] h-[300px] w-[300px]">
      <Image
        className="w-[50%]"
        src={svgPlant}
        width={300}
        height={300}
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
      className="mt-[20px] flex justify-center shadow-lg w-[100px] h-[100px] rounded-full bg-navaraBlue border border-black hover:bg-highlight"
    >
      <Image
        className="w-[75%]"
        src={watering as StaticImageData}
        alt={"watering"}
      />
    </div>
  )
}
