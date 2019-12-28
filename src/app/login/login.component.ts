import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  forgotPassword: boolean;
  login: boolean = true;
  loginForm: FormGroup;
  forgetForm: FormGroup;

  constructor(private router: Router, private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
    this.forgetForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  ngOnInit() {
  }

  onLogin() {
    this.toastr.success('successfully login');
    this.router.navigate(['/dashboard']);
  }
  onForgotPassword() {
    this.forgotPassword = true;
    this.login = false;
  }

  onSignIn() {
    this.forgotPassword = false;
    this.login = true;
  }

  onForgot() {
        this.toastr.success('Your alternate password is in your email');

  }
}
