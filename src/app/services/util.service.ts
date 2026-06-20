import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { ApiResponse } from '../models/api-response.model';
import { DataCatalog } from '../models/data-catalog.model';
import { HomeResponse } from '../models/home.model';
import { RoomResponse } from '../models/room.model';
import { SubscriptionPlanResponse } from '../models/subscription-plan.model';
import { UserResponse } from '../models/user.model';

const baseUrl = AppSettings.API_ENDPOINT + '/utils';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  constructor(private http: HttpClient) { }

  public catalog(description: string): Observable<ApiResponse<DataCatalog[]>> {
    return this.http.get<ApiResponse<DataCatalog[]>>(baseUrl + '/catalog/' + description);
  }

  public propertyTypes(): Observable<ApiResponse<DataCatalog[]>> {
    return this.catalog('PROPERTY_TYPES');
  }

  public plans(): Observable<ApiResponse<SubscriptionPlanResponse[]>> {
    return this.http.get<ApiResponse<SubscriptionPlanResponse[]>>(baseUrl + '/plans');
  }

  public adminUsers(): Observable<ApiResponse<UserResponse[]>> {
    return this.http.get<ApiResponse<UserResponse[]>>(baseUrl + '/admin/users');
  }

  public myHomes(): Observable<ApiResponse<HomeResponse[]>> {
    return this.http.get<ApiResponse<HomeResponse[]>>(baseUrl + '/my-homes');
  }

  public roomsByHome(homeId: number): Observable<ApiResponse<RoomResponse[]>> {
    return this.http.get<ApiResponse<RoomResponse[]>>(baseUrl + '/home/' + homeId + '/rooms');
  }
}

