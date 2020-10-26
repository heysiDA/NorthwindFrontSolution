import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { WhiteSpaceValidator } from '../shared/validators/white-space-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: '';
  loginForm: FormGroup;

  constructor( private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm();
  }

  buildLoginForm(): void{
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, WhiteSpaceValidator.cannotContainSpace]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50), WhiteSpaceValidator.cannotContainSpace]]

    });
  }
  login(submittedForm: FormGroup)
  {
    this.authService.login(submittedForm.value.email, submittedForm.value.password)
    .subscribe(authResponse => {
      if (this.authService.redirectUrl){
        this.router.navigate([this.authService.redirectUrl]);
        this.authService.redirectUrl = null;
      }else{
        this.router.navigate(['/home']);
      }
    }, error => this.loginError = error);
  }

}
