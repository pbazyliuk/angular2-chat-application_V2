
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    isLogged: boolean;
    friendsIds?: number[];
}