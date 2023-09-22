import { PlantData, initialPlantData } from "@/pages/api/interface"
import { PageState, PlanterContext } from "@/pages/planter"
import Image, { StaticImageData } from "next/image"
import { ReactNode, useContext } from "react"
import plus from "../../assets/plus.svg"
import watering from "../../assets/watering.svg"
import svgPlant from "@/assets/plant.svg"
import Bar from "../elements/bar"
import LayoutSection from "../layout/LayoutSection"
import { FetchWrapper } from "@/utils/fetchWrapper"

const PlantIndex: React.FC = () => {
  const { plants, setPlants } = useContext(PlanterContext)

  const handleOnClick = async () => {
    const plantFetch = new FetchWrapper("http://localhost:8080" + "/plant/all")
    plantFetch.setBody(plants)
    const newPlants = await plantFetch.putRequest()
    setPlants(newPlants)
  }

  return (
    <LayoutSection>
      <WaterAllPlant onClick={handleOnClick} />
      <PlantIndexSection plants={plants} />
    </LayoutSection>
  )
}

const WaterAllPlant: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <Bar cssColor="bg-navaraBlue" width={150}>
        <Image className={"h-[20px]"} src={watering} alt="watering icon" />
      </Bar>
    </div>
  )
}

const PlantIndexSection: React.FC<{ plants: PlantData[] }> = ({ plants }) => {
  plants.sort((a, b) => a.daysUntilWatering - b.daysUntilWatering)

  return (
    <div className="max-h-[500px] w-[360px] px-[20px] overflow-y-auto grid grid-cols-2 gap-[20px]">
      <AddPlant />
      {plants.map((plant, index) => (
        <PlantIndexCard key={index} plant={plant} />
      ))}
    </div>
  )
}

const IndexCard: React.FC<{
  children: ReactNode
  onClick: () => void
}> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-row w-[150px] h-[110px] bg-[#F9F7F7] rounded-[20px] pt-[5px] pl-[5px] border border-black hover:bg-highlight shadow-lg"
    >
      {children}
    </div>
  )
}

const PlantIndexCard: React.FC<{ plant: PlantData }> = ({ plant }) => {
  const { setPageState, setPlantFocus } = useContext(PlanterContext)

  const ratio =
    plant.daysUntilWatering == 0
      ? 0
      : plant.daysUntilWatering / plant.frequentie

  return (
    <IndexCard
      onClick={() => {
        setPageState(PageState.DETAILS)
        setPlantFocus(plant)
      }}
    >
      <div className="flex justify-center min-w-[100px] max-w-[100px] h-[100px] rounded-full bg-plant">
        <Image
          className="rounded-full"
          src={plant.img ? plant.img : svgPlant}
          width={100}
          height={100}
          alt="plant icon"
        />
      </div>
      {waterBar(ratio, plant.water)}
    </IndexCard>
  )
}

function waterBar(ratio: number, water: number) {
  const text: string = `${Math.round((1 - ratio) * water)} ml`
  const percentage: number = Math.round(ratio * 10) * 10
  const cssColor: string = ratio == 0 ? "bg-navaraRed" : "bg-offwhite"

  const barLayout: Record<number, string> = {
    0: "h-[0px] top-[100px]",
    10: "h-[10px] top-[90px]",
    20: "h-[20px] top-[80px]",
    30: "h-[30px] top-[70px]",
    40: "h-[40px] top-[60px]",
    50: "h-[50px] top-[50px]",
    60: "h-[60px] top-[40px]",
    70: "h-[70px] top-[30px]",
    80: "h-[80px] top-[20px]",
    90: "h-[90px] top-[10px]",
    100: "h-[100px] top-[0px]",
  }

  return (
    <div className="relative ml-[10px] w-[25px] h-[100px] ">
      <div
        className={`border border-black w-full h-[100px] rounded-full ${cssColor} absolute top-0 left-0`}
      />
      <div
        className={`w-full rounded-full bg-navaraBlue absolute ${barLayout[percentage]} left-0`}
      />
      <div className="flex justify-center items-center w-full h-full">
        <p className="transform rotate-90 whitespace-nowrap">{text}</p>
      </div>
    </div>
  )
}

const AddPlant = () => {
  const { setPageState, setPlantFocus } = useContext(PlanterContext)

  return (
    <IndexCard
      onClick={() => {
        setPlantFocus(initialPlantData)
        setPageState(PageState.NEW_PLANT)
      }}
    >
      <div className="flex min-w-[100px] max-w-[100px] h-[100px] rounded-full bg-plant justify-center">
        <Image className="w-[40%]" src={plus as StaticImageData} alt="plus" />
      </div>
      <div className="ml-[35px] border border-black min-w-[100px] transform rotate-90 origin-top-left  h-[25px] rounded-full text-center items-center bg-navaraBlue mr-[30px]">
        {"Nieuw"}
      </div>
    </IndexCard>
  )
}

export default PlantIndex
