import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { ApiResponse } from '../models/api-response.model';
import { SubscriptionPlanRequest, SubscriptionPlanResponse } from '../models/subscription-plan.model';

const baseUrl = AppSettings.API_ENDPOINT + '/plans';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {
  constructor(private http: HttpClient) { }

  public register(plan: SubscriptionPlanRequest): Observable<ApiResponse<SubscriptionPlanResponse>> {
    return this.http.post<ApiResponse<SubscriptionPlanResponse>>(baseUrl, plan);
  }

  public update(id: number, plan: SubscriptionPlanRequest): Observable<ApiResponse<SubscriptionPlanResponse>> {
    return this.http.put<ApiResponse<SubscriptionPlanResponse>>(baseUrl + '/' + id, plan);
  }

  public delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(baseUrl + '/' + id);
  }

  public list(): Observable<ApiResponse<SubscriptionPlanResponse[]>> {
    return this.http.get<ApiResponse<SubscriptionPlanResponse[]>>(baseUrl);
  }

  public getById(id: number): Observable<ApiResponse<SubscriptionPlanResponse>> {
    return this.http.get<ApiResponse<SubscriptionPlanResponse>>(baseUrl + '/' + id);
  }

  public upgradeOptions(currentLimit: number): Observable<ApiResponse<SubscriptionPlanResponse[]>> {
    return this.http.get<ApiResponse<SubscriptionPlanResponse[]>>(baseUrl + '/upgrade-options/' + currentLimit);
  }

  public activeUsers(id: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(baseUrl + '/' + id + '/active-users');
  }
}

