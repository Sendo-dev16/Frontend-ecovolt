export interface UserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  idUser: number;
  name: string;
  email: string;
  status: number;
}

