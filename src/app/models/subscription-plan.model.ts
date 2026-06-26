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

export interface SubscriptionPlan {
  idPlan: number;
  name: string;
  description: string;
  monthlyPrice: number;  
  deviceLimit: number;   
  billingCycle: string; 
  status: number;
}