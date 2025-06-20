import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = 'http://127.0.0.1:9095/ms-user'; // à ajuster local ou distant

  constructor(private http: HttpClient) {}

  login(login: string, motDePasse: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { login, motDePasse });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/create`, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/id/${id}`);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${id}`);
  }

  changePassword(user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/change-password`, user);
  }

}
