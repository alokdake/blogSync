import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogbackendService } from '../blogbackend.service';
import { LocalstorageService } from '../localstorage.service';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent {
  _id: any;
  userData: any;
  userDetail: any;
  updatedUserData: any;
  data: any;

  constructor(
    private activeroutes: ActivatedRoute,
    private blogbackend: BlogbackendService,
    private router: Router,
    private ls: LocalstorageService
  ) {}

  editForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', Validators.required),
    firstname: new UntypedFormControl('', Validators.required),
    lastname: new UntypedFormControl('', Validators.required),
  });
  ngOnInit(): void {
    this.ls.getData().subscribe((data: any) => {
      this.userDetail = JSON.parse(data);
      console.log(this.userDetail);
    });
    this._id = this.activeroutes.snapshot.params['id'];
    console.log(this._id);
    this.blogbackend.getUserById(this._id).subscribe((data: any) => {
      this.userData = data;
      console.log(this.userData);
    });
  }

  updateUser() {
    let userModel = {
      email: this.userData.email,
      firstname: this.userData.firstname,
      lastname: this.userData.lastname,
      password: this.userData.password,
    };
    console.log(userModel);
    const firstname = userModel.firstname;
    console.log(firstname);
    this.blogbackend.updateData(firstname);

    this.blogbackend
      .updateUserDetails(this._id, userModel)
      .subscribe((res: any) => {
        console.log('User Updated successfully', res);
        const data = JSON.parse(localStorage.getItem('your_key') || '');
        this.userData = data;
        console.log(this.userData);
        this.data = this.userData;
        this.data.user = res;
        console.log('Data', this.data);
        this.ls.setData(JSON.stringify(this.data));
        this.router.navigate(['/userprofile']);
      });
  }
}
