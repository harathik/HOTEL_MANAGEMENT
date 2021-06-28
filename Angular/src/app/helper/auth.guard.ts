import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorageService
) { }

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const currentUser :User = this.tokenStorage.getUser();
    if (currentUser && currentUser.username!=null) {
    
        if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
         
            this.router.navigate(['/']);
            return false;
        }

        return true;
    }


    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
}
  
}
