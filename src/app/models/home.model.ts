export interface HomeRequest {
  address: string;
  city: string;
  alias: string;
  energyTariff: number;
  squareMeters: number;
  idPropertyType?: number | null;
  idUser?: number;
}

export interface HomeResponse {
  idHome: number;
  address: string;
  city: string;
  alias: string;
  ownerName?: string;
}
