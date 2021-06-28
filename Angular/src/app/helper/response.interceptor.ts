import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf("hm/save/reservation") ==0 && request.responseType == 'json') {
			request = request.clone({ responseType: 'blob' });

			return next.handle(request).pipe(map(response => {
				if (response instanceof HttpResponse) {

				}
				return response;
			}));
		}

		return next.handle(request);
  }
}
