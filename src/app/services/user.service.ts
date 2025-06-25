import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../models/user.model";
import { environment } from '../../environments/environment';
import {ChangePasswordRequest} from "../models/change-password-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  login(login: string, motDePasse: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { login, motDePasse });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${id}`);
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/change-password`, request);
  }

}
