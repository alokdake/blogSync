import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BlogbackendService } from '../blogbackend.service';
import { LocalstorageService } from '../localstorage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public email: any;
  public password: any;
  allUsersData: any = [];
  userData: any;
  noResultReturned!: boolean;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private blogbackend: BlogbackendService,
    private localstorage: LocalstorageService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.noResultReturned = true;
    console.log(this.loginForm.value);
    this.blogbackend
      .loginDetails(this.loginForm.value)
      .subscribe((res: any) => {
        console.log('Signin sucess', res);

        this.userData = res.user;
        console.log(this.userData);

        this.localstorage.setData(JSON.stringify(this.userData));

        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.noResultReturned = false;
        this.toastr.success('User Login Sucessfully !!');
        this.toastr.success('Welcome to home');
        this.router.navigate(['/home']);
      });
    if (this.email == 'mafia@gmail.com' && this.password == '123456') {
      this.toastr.success('Admin Login Sucessfully !!');
      this.toastr.success('Welcome to admin panel');
      this.router.navigate(['/admin']);
    }
  }
  register() {
    this.toastr.info('Fill the fields to register');
    this.router.navigate(['/register']);
  }
}
