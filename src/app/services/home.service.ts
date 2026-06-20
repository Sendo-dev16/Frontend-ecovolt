import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { ApiResponse } from '../models/api-response.model';
import { HomeRequest, HomeResponse } from '../models/home.model';

const baseUrl = AppSettings.API_ENDPOINT + '/homes';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  public register(home: HomeRequest): Observable<ApiResponse<HomeResponse>> {
    return this.http.post<ApiResponse<HomeResponse>>(baseUrl, home);
  }

  public update(id: number, home: HomeRequest): Observable<ApiResponse<HomeResponse>> {
    return this.http.put<ApiResponse<HomeResponse>>(baseUrl + '/' + id, home);
  }

  public delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(baseUrl + '/' + id);
  }

  public myHomes(): Observable<ApiResponse<HomeResponse[]>> {
    return this.http.get<ApiResponse<HomeResponse[]>>(baseUrl + '/my-list');
  }

  public allAdmin(): Observable<ApiResponse<HomeResponse[]>> {
    return this.http.get<ApiResponse<HomeResponse[]>>(baseUrl + '/admin/all');
  }

  public getById(id: number): Observable<ApiResponse<HomeResponse>> {
    return this.http.get<ApiResponse<HomeResponse>>(baseUrl + '/' + id);
  }

  public deviceCount(id: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(baseUrl + '/' + id + '/device-count');
  }
}

