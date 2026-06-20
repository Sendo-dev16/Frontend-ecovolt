import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
const NAME_KEY = 'AuthName';
const USER_ID_KEY = 'AuthUserId';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string> = [];

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public setUserId(idUser: number | string): void {
    window.sessionStorage.removeItem(USER_ID_KEY);
    window.sessionStorage.setItem(USER_ID_KEY, String(idUser));
  }

  public getUserId(): string | null {
    return sessionStorage.getItem(USER_ID_KEY);
  }

  public setUserNameComplete(name: string): void {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, name);
  }

  public getUserNameComplete(): string | null {
    return sessionStorage.getItem(NAME_KEY);
  }

  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  public getUserName(): string | null {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY) || '[]');
    return this.roles;
  }

  public hasRole(role: string): boolean {
    return this.getAuthorities().includes(role);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}

