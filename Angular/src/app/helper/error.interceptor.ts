
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
      return next.handle(request).pipe(catchError(err => {
          if ([401, 403].indexOf(err.status) !== -1) {
            
              this.authenticationService.logout();
            
          }
         else if(err?.status== 200){
            return err.body;
          }else  {
            const error = err?.message || err.statusText;
            throwError(error);
          }   
      }))
  }
}
