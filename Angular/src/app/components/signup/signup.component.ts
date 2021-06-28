import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage! :string;
  signUpForm!: FormGroup;
  roles = [Role.Admin,Role.Manager,Role.Receptionist]
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService){}

  ngOnInit(): void {

    this.signUpForm = this.formBuilder.group({
      empId: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role:[null, Validators.required],
  });
  }
  signupUser(){
    const { empId, userName, password ,role} = this.signUpForm.value;

    this.authenticationService.register(empId,userName, password, role).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  login(){
    this.router.navigateByUrl("/login");
  }
}


