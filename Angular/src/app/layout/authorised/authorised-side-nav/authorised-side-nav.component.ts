import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthorisedSideNavService } from '../services/authorised-side-nav.service';

@Component({
  selector: 'app-authorised-side-nav',
  templateUrl: './authorised-side-nav.component.html',
  styleUrls: ['./authorised-side-nav.component.css']
})
export class AuthorisedSideNavComponent implements OnInit {



    constructor( public sideNavService: AuthorisedSideNavService,
        private router: Router,
        private tokenStorage: TokenStorageService
    ) {
       
    }
  ngOnInit(): void {
  }

    get isAdmin() {
      const currentUser :User = this.tokenStorage.getUser();
        return currentUser && currentUser.role.indexOf(Role.Admin)!=-1;
    }

    get isManager() {
      const currentUser :User = this.tokenStorage.getUser();
      return currentUser && currentUser.role.indexOf(Role.Manager)!=-1;
    }

    get isRecepetionist() {
      const currentUser :User = this.tokenStorage.getUser();
      return currentUser && currentUser.role.indexOf(Role.Receptionist)!=-1;
    }


}
