import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogbackendService } from '../blogbackend.service';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-reportblog',
  templateUrl: './reportblog.component.html',
  styleUrls: ['./reportblog.component.scss'],
})
export class ReportblogComponent {
  userDetail: any = [];
  loggedInUserId: any;
  userBlogs: any;
  reportReason!: boolean;
  _id: any;
  selectedReason: any;
  userData!: any[];
  nav: any;
  blogDetails: any;

  constructor(
    private router: Router,
    private activeroutes: ActivatedRoute,
    private backend: BlogbackendService,
    private toastr: ToastrService,
    private localstorage: LocalstorageService
  ) {}

  reasons: any[] = [
    {
      reason: 'scam or fraud',
    },
    {
      reason: 'False Information',
    },
    {
      reason: 'Hate speech or symbols',
    },
    {
      reason: 'Sexulual Exploitation',
    },
    {
      reason: 'Spam',
    },
    {
      reason: 'Harassment and bullying',
    },
    {
      reason: 'Poorly written',
    },
  ];

  ngOnInit() {
    this.localstorage.getData().subscribe((data: any) => {
      this.userDetail = JSON.parse(data);
      console.log(this.userDetail);
    });
    this._id = this.activeroutes.snapshot.params['id'];
    console.log(this._id);
    this.backend.getblogById(this._id).subscribe((data: any) => {
      this.blogDetails = data;
      console.log(this.blogDetails);
    });

    this.loggedInUserId = this.userDetail._id;
    console.log(this.loggedInUserId);
    this.backend.getUserById(this.loggedInUserId).subscribe((data: any) => {
      this.userData = [data]; // Wrap data in an array
      console.log(this.userData);
    });
  }

  logout() {
    localStorage.removeItem('userData');
    this.toastr.success('Logout Sucessfully !!');
    this.router.navigate(['/login']);
  }
  create() {
    this.toastr.info('Fill the fields');
    this.router.navigate(['/createblog']);
  }

  async submit() {
    let reportModel = {
      reasons: this.selectedReason,
      authorId: this.loggedInUserId,
      blogId: this._id,
      name: this.userData[0].firstname + ' ' + this.userData[0].lastname,
      title: this.blogDetails.title,
      author: this.blogDetails.author,
      category: this.blogDetails.category,
      description: this.blogDetails.description,
      imgUrl: this.blogDetails.imgUrl,
    };
    console.log(reportModel);
    this.backend.postReportBlog(reportModel).subscribe((data: any) => {
      console.log('blog reported sucessfully', data);
    });
    this.toastr.warning('Report Done !!');
    this.router.navigate(['/home']);
  }
  test() {}
}
