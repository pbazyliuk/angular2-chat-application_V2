export interface Message {
  id?: number;
  chatId?: number;
  userId: number;
  userName: string;
  text: string;
  timestamp: number;
};
