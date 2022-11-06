export interface IUser {
  userID: string;
  displayName: string;
  photoURL: string;
}

export interface IWordData {
  word: string;
  translations: string[];
  level: number;
  id: number;
  isFav: boolean;
}

export interface ITestWordData {
  word: string;
  translations: string[];
  level: number;
  id: number;
  answer: string;
  isRight: boolean | null;
  changes: number | null;
}

export interface IUpdate {
  [key: string]: any;
}
