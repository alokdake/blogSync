import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BlogbackendService } from '../blogbackend.service';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-createblog',
  templateUrl: './createblog.component.html',
  styleUrls: ['./createblog.component.scss'],
})
export class CreateblogComponent {
  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private blogbackend: BlogbackendService,
    private toastr: ToastrService,
    private localstorage: LocalstorageService
  ) {}

  public blogForm!: FormGroup;
  public title: any;
  public description: any;
  public imgUrl: any;
  public category: any;
  message!: string;
  url!: string | ArrayBuffer | null;
  public blogPic = this.url;
  finalPicture: any;
  userDetail: any;
  author: any;
  authorId: any;

  ngOnInit(): void {
    this.blogForm = this.formbuilder.group({
      title: new FormControl(''),
      description: new FormControl(''),
      imgUrl: new FormControl(''),
      author: new FormControl(''),
      category: new FormControl(''),
    });

    this.localstorage.getData().subscribe((data: any) => {
      this.userDetail = JSON.parse(data);
      console.log(this.userDetail);
    });

    this.author = this.userDetail.firstname + ' ' + this.userDetail.lastname;
    console.log(this.author);

    this.authorId = this.userDetail._id;
    console.log(this.authorId);
  }

  selectFile(event: any) {
    var imageType = event.target.files[0].type;

    if (imageType.match(/image\/*/) == null) {
      this.message = 'only images you can add';
      return;
    }

    var imageReader = new FileReader(); //pre defined method in angular ts FileReader()
    imageReader.readAsDataURL(event.target.files[0]);

    imageReader.onload = (_event) => {
      this.message = '';
      this.url = imageReader.result;
      console.log(this.url);
      this.blogPic = imageReader.result;
      this.finalPicture = imageReader.result;
      console.log(this.finalPicture);
    };
  }
  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

  postBlog() {
    var blogModel = {
      title: this.title,
      description: this.description,
      imgUrl: this.url,
      category: this.category,
      author: this.author,
      authorId: this.authorId,
    };
    console.log(blogModel);

    this.blogbackend.postBlog(blogModel).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Blog Created Sucessfully !!');
      this.router.navigate(['/home']);
    });
  }
}
