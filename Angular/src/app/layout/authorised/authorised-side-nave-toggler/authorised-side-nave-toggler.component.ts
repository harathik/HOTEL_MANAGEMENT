import { Component, OnInit } from '@angular/core';
import { AuthorisedSideNavService } from '../services/authorised-side-nav.service';

@Component({
  selector: 'app-authorised-side-nave-toggler',
  templateUrl: './authorised-side-nave-toggler.component.html',
  styleUrls: ['./authorised-side-nave-toggler.component.css']
})
export class AuthorisedSideNaveTogglerComponent implements OnInit {

  constructor(public sideNavService: AuthorisedSideNavService) { }

  ngOnInit(): void {
  }

}
