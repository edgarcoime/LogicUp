import { INote } from "./card.type";

export interface ISimplifiedCategory {
  id: string,
  name: string,
}

export interface ICategory {
  name: string,
  notes: INote[]
}