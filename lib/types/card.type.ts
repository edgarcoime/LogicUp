export interface INote {
  id: string;
  prompt: string;
  answer: string;
  keywords: string[];
  fullyUnderstand: boolean;
}