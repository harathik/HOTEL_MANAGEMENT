import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable ,of, throwError} from 'rxjs';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
const AUTH_API = 'http://localhost:20000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User >;
  public currentUser: Observable<User >;

  constructor(private http: HttpClient) {
    const userJson = localStorage.getItem('currentUser');
    const test : User  = userJson !== null ? JSON.parse(userJson) : new User();
      this.currentUserSubject = new BehaviorSubject<User>(test);
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User  {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
   /*  return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions); */

    return this.http.post( '/auth/signin', {
      username,
      password,
    }, httpOptions).pipe(
      /* map((emp: any) => {
        return {
          status: true,
          employeeId: emp?.empId,
        };
      }), */
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  
  }


  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(new User());
  }

  register(empId: string, username: string, password: string, role: string): Observable<any> {
    
    return this.http.post( '/auth/signup', {
      empId,
      username,
      password,
      role
    }, httpOptions).pipe(
      map((emp: any) => {
        return {
          status: true,
          employeeId: emp?.empId,
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}
