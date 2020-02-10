import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { locationI } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  Auth_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;
  private locations 


  constructor(private httpClient: HttpClient) { }
  

  register(user:UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.Auth_SERVER}/usuario`,
    user).pipe(tap(
      (res:JwtResponseI) => {
        if(res){
          console.log(res);
          
          
        }
      }
    ))
  }
  login(user:UserI): Observable<JwtResponseI> {
      return this.httpClient.post<JwtResponseI>(`${this.Auth_SERVER}/login`,
      user).pipe(tap(
        (res:JwtResponseI) => {
          if(res){
            this.locations = res.usuario.location
            console.log(res);
            this.saveToken(res.token);
          }
        }
      ))
    }

    location()  {
      return this.locations 

    }

    logout(): void {
      this.token = '';
      localStorage.removeItem("ACCES_TOKEN");
      //localStorage.removeItem("EXPIRES_IN");
    }

    

    private saveToken(token: string ): void {
      localStorage.setItem("ACCESS_TOKEN", token);
      //ocalStorage.setItem("Expires_IN", expiresIn);
  
    }

    private getToken(): string {
      if(!this.token){
        this.token = localStorage.getItem("ACCESS_TOKEN")
      }
      return this.token;
    }
  }

