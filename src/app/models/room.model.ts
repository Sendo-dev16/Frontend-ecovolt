export interface RoomRequest {
  name: string;
  idHome: number;
}

export interface RoomResponse {
  idRoom: number;
  name: string;
  idHome: number;
  homeAddress?: string;
  status: number;
}

