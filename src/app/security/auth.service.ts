import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuario } from './login-usuario';
import { JwtDTO } from './jwt-dto';
import { AppSettings } from '../../app.settings';
import { ApiResponse } from '../models/api-response.model';
import { UserRequest, UserResponse } from '../models/user.model';

const authURL = AppSettings.API_ENDPOINT + '/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUsuario): Observable<ApiResponse<JwtDTO>> {
    return this.httpClient.post<ApiResponse<JwtDTO>>(authURL + '/login', loginUsuario);
  }

  public register(user: UserRequest): Observable<ApiResponse<UserResponse>> {
    return this.httpClient.post<ApiResponse<UserResponse>>(authURL + '/register', user);
  }
}

