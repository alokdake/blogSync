import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogbackendService } from '../blogbackend.service';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-editbyadmin',
  templateUrl: './editbyadmin.component.html',
  styleUrls: ['./editbyadmin.component.scss'],
})
export class EditbyadminComponent {
  userDetail: any;
  _id: any;
  blogData: any;
  updatedBlogData: any;
  message!: string;
  url!: string | ArrayBuffer | null;
  public blogPic = this.url;
  finalPicture: any;
  imgUrl: any;
  authorId: any;
  author: any;
  constructor(
    private activeroutes: ActivatedRoute,
    private blogbackend: BlogbackendService,
    private router: Router,
    private localstorage: LocalstorageService
  ) {}
  ngOnInit() {
    this.localstorage.getData().subscribe((data: any) => {
      this.userDetail = JSON.parse(data);
      console.log(this.userDetail);
    });
    this._id = this.activeroutes.snapshot.params['id'];
    console.log(this._id);
    this.blogbackend.getblogById(this._id).subscribe((data: any) => {
      this.blogData = data;
      console.log(this.blogData);
    });
  }
  updateBlog() {
    var blogModel = {
      title: this.blogData.title,
      description: this.blogData.description,
      imgUrl: this.blogData.imgUrl,
      authorId: this.blogData.authorId,
      author: this.blogData.author,
      category: this.blogData.category,
    };
    console.log(blogModel);

    this.blogbackend
      .updateBlogDetails(this._id, blogModel)
      .subscribe((data) => {
        console.log('Data updated sucess', data);
        this.updatedBlogData = data;
        console.log(this.updatedBlogData);
      });
  }
  updateform() {
    this.updateBlog();
    this.router.navigate(['/admin']);
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
      this.imgUrl = imageReader.result;
      console.log(this.imgUrl);
    };
  }
  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
}
