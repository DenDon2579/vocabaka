export interface IUser {
    userID: string;
    displayName: string;
    photoURL: string;
}

export interface IWordData {
    word: string;
    translation: string;
    level: number;
    id: number;
}

export interface IUpdate {
    [key: string]: any;
}
