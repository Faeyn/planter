export interface User {
    id?: number;
    name: string;
    email: string;
  }

export interface PlantData{
  id?: number;
  dateField: string;
  type: string;
  locatie: string;
  water: number;
  frequentie: number;
  daysUntilWatering: number;
}

export const initialPlantData: PlantData = {
  dateField: "",
  type: "",
  locatie: "",
  water: 0,
  frequentie: 0,
  daysUntilWatering: 0,
}