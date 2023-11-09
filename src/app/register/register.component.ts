import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { BlogbackendService } from '../blogbackend.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private formbuilder: FormBuilder,
    private blogbackend: BlogbackendService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  public registerationForm!: FormGroup;
  public firstname: any;
  public lastname: any;
  public email: any;
  public password: any;
  Users: any;

  ngOnInit() {
    this.registerationForm = this.formbuilder.group({
      firstname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*'),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('[a-zA-Z].*'),
      ]),
      email: new FormControl(
        '',

        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]
      ),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ]),
    });
  }

  get Firstname(): FormControl {
    return this.registerationForm.get('firstname') as FormControl;
  }
  get Lastname(): FormControl {
    return this.registerationForm.get('lastname') as FormControl;
  }
  get Email(): FormControl {
    return this.registerationForm.get('email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerationForm.get('password') as FormControl;
  }

  register() {
    let registerModel = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    };
    console.log(registerModel);

    this.blogbackend.registerDetails(registerModel).subscribe((data: any) => {
      this.Users = data;
      console.log(this.Users);
    });
    this.toastr.success('Registeration sucessfully !!');
    this.router.navigate(['/login']);
  }
}
