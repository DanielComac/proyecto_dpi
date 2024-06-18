import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = "http://localhost:5000/api/user";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  createUsers(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  editUser(user: Partial<User>): Observable<User> {
    return this.http.patch<User>(this.url, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  deleteUser(id: string): Observable<any> {
    console.log(id)
    return this.http.delete(`${this.url}/${id}`);
  }

}
