import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../app.settings';
import { ApiResponse } from '../models/api-response.model';
import { SubscriptionPlan, SubscriptionPlanRequest, SubscriptionPlanResponse } from '../models/subscription-plan.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {
  
  private baseUrl = AppSettings.API_ENDPOINT + '/plans';

  constructor(private http: HttpClient) { }

  listaPlanes(): Observable<SubscriptionPlan[]> {
    return this.http.get<ApiResponse<SubscriptionPlan[]>>(this.baseUrl)
      .pipe(
        map(res => res.data || [])
      );
  }

  verDetalle(id: string | number): Observable<SubscriptionPlan> {
    return this.http.get<ApiResponse<SubscriptionPlan>>(`${this.baseUrl}/${id}`)
      .pipe(
        map(res => res.data)
      );
  }

  public register(plan: SubscriptionPlanRequest): Observable<ApiResponse<SubscriptionPlanResponse>> {
    return this.http.post<ApiResponse<SubscriptionPlanResponse>>(this.baseUrl, plan);
  }

  public update(id: number, plan: SubscriptionPlanRequest): Observable<ApiResponse<SubscriptionPlanResponse>> {
    return this.http.put<ApiResponse<SubscriptionPlanResponse>>(`${this.baseUrl}/${id}`, plan);
  }

  public delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  public upgradeOptions(currentLimit: number): Observable<ApiResponse<SubscriptionPlanResponse[]>> {
    return this.http.get<ApiResponse<SubscriptionPlanResponse[]>>(`${this.baseUrl}/upgrade-options/${currentLimit}`);
  }

  public activeUsers(id: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(`${this.baseUrl}/${id}/active-users`);
  }

  public list(): Observable<ApiResponse<SubscriptionPlanResponse[]>> {
    return this.http.get<ApiResponse<SubscriptionPlanResponse[]>>(this.baseUrl);
  }

  public getById(id: number): Observable<ApiResponse<SubscriptionPlanResponse>> {
    return this.http.get<ApiResponse<SubscriptionPlanResponse>>(`${this.baseUrl}/${id}`);
  }
  
}