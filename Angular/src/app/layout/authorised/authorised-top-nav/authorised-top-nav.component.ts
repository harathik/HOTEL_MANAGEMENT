import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-authorised-top-nav',
  templateUrl: './authorised-top-nav.component.html',
  styleUrls: ['./authorised-top-nav.component.css'],
})
export class AuthorisedTopNavComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
   
  }
}
