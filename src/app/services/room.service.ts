import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../app.settings';
import { ApiResponse } from '../models/api-response.model';
import { RoomRequest, RoomResponse } from '../models/room.model';

const baseUrl = AppSettings.API_ENDPOINT + '/rooms';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) { }

  public register(room: RoomRequest): Observable<ApiResponse<RoomResponse>> {
    return this.http.post<ApiResponse<RoomResponse>>(baseUrl, room);
  }

  public update(id: number, room: RoomRequest): Observable<ApiResponse<RoomResponse>> {
    return this.http.put<ApiResponse<RoomResponse>>(baseUrl + '/' + id, room);
  }

  public delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(baseUrl + '/' + id);
  }

  public byHome(homeId: number): Observable<ApiResponse<RoomResponse[]>> {
    return this.http.get<ApiResponse<RoomResponse[]>>(baseUrl + '/home/' + homeId);
  }

  public getById(id: number): Observable<ApiResponse<RoomResponse>> {
    return this.http.get<ApiResponse<RoomResponse>>(baseUrl + '/' + id);
  }

  public deviceCount(id: number): Observable<ApiResponse<number>> {
    return this.http.get<ApiResponse<number>>(baseUrl + '/' + id + '/devices/count');
  }
}

