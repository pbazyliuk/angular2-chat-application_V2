
export interface Chat {
    id: number;
    messageIds: number[];
    users: {[key:number]: number}
}