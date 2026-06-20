export interface DeviceRequest {
  name: string;
  brand: string;
  idRoom: number;
}

export interface DeviceResponse {
  idDevice: number;
  name: string;
  brand: string;
  roomName: string;
  status: number;
}

