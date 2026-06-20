export interface SubscriptionPlanRequest {
  name: string;
  description: string;
  price: number;
  durationDays: number;
}

export interface SubscriptionPlanResponse {
  idPlan: number;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  status: number;
}

