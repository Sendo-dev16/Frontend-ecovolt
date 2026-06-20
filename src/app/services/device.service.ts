import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { ApiResponse } from '../models/api-response.model';
import { DeviceRequest, DeviceResponse } from '../models/device.model';

const baseUrl = AppSettings.API_ENDPOINT + '/devices';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private http: HttpClient) { }

  public register(device: DeviceRequest): Observable<ApiResponse<DeviceResponse>> {
    return this.http.post<ApiResponse<DeviceResponse>>(baseUrl, device);
  }

  public update(id: number, device: DeviceRequest): Observable<ApiResponse<DeviceResponse>> {
    return this.http.put<ApiResponse<DeviceResponse>>(baseUrl + '/' + id, device);
  }

  public delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(baseUrl + '/' + id);
  }

  public byHome(homeId: number): Observable<ApiResponse<DeviceResponse[]>> {
    return this.http.get<ApiResponse<DeviceResponse[]>>(baseUrl + '/home/' + homeId);
  }

  public byRoom(roomId: number): Observable<ApiResponse<DeviceResponse[]>> {
    return this.http.get<ApiResponse<DeviceResponse[]>>(baseUrl + '/room/' + roomId);
  }

  public getById(id: number): Observable<ApiResponse<DeviceResponse>> {
    return this.http.get<ApiResponse<DeviceResponse>>(baseUrl + '/' + id);
  }
}

