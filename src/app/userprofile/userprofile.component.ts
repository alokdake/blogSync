import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';
import { BlogbackendService } from '../blogbackend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent {
  userDetail: any = [];
  loggedInUserId: any;
  userBlogs: any;
  userBlogCount: any;
  usersReportedBlogs: any;
  loggedInUserDetails: any;
  firstname: any;
  lastname: any;
  email: any;
  updatedBlogDetails: any;

  constructor(
    private router: Router,
    private blogbackend: BlogbackendService,
    private toastr: ToastrService,
    private localstorage: LocalstorageService
  ) {}

  ngOnInit() {
    // Get the latest user details from the local storage
    this.localstorage.getData().subscribe((data: any) => {
      this.loggedInUserDetails = JSON.parse(data);
      console.log(this.loggedInUserDetails);

      if (this.loggedInUserDetails) {
        this.loggedInUserId = this.loggedInUserDetails._id;
        this.firstname = this.loggedInUserDetails.firstname;
        this.lastname = this.loggedInUserDetails.lastname;
        this.email = this.loggedInUserDetails.email;
      }
    });

    // Get the latest user details from the backend
    this.blogbackend.getUserById(this.loggedInUserId).subscribe((data: any) => {
      this.loggedInUserDetails = data;
      console.log(this.loggedInUserDetails);
    });

    this.localstorage.setData(JSON.stringify(this.loggedInUserDetails));

    // get latest updated blog details from local storage

    this.localstorage.getData().subscribe((data: any) => {
      this.updatedBlogDetails = JSON.parse(data);
      console.log(this.updatedBlogDetails);
    });

    // get latest updated blog details from backend
    this.blogbackend.getblogById(this.loggedInUserId).subscribe((data: any) => {
      this.updatedBlogDetails = data;
      console.log(this.updatedBlogDetails);
    });

    this.getBlogsByUser();
    this.getReportBlogsByUser();
  }

  async update(userId: any) {
    console.log(userId);
    this.toastr.info('Update the userprofile');
    this.router.navigate(['/editprofile', userId]);

    // Get the latest user details from the backend
    const loggedInUserDetails = await this.blogbackend.getUserById(userId);

    // Update the loggedInUserDetails in the component
    this.loggedInUserDetails = loggedInUserDetails;

    // localStorage.setItem(
    //   'loggedInUserDetails',
    //   JSON.stringify(loggedInUserDetails)
    // );
    // Refresh the page to reflect the changes
    window.location.reload();
  }

  getBlogsByUser() {
    console.log(this.loggedInUserId);
    this.blogbackend
      .getBlogsByAuthor(this.loggedInUserId)
      .subscribe((data: any) => {
        console.log(data);
        this.userBlogs = data.blog;
        console.log(this.userBlogs);
        this.userBlogCount = this.userBlogs.length;
        console.log(this.userBlogCount);
      });
  }

  getReportBlogsByUser() {
    console.log(this.loggedInUserId);
    this.blogbackend
      .getReportedBlogsByAuthor(this.loggedInUserId)
      .subscribe((data: any) => {
        console.log(data);
        this.usersReportedBlogs = data.blog;
        console.log(this.usersReportedBlogs);
      });
  }

  viewBlog(blogId: any) {
    console.log(blogId);
    this.router.navigate(['/viewblog', blogId]);
  }
  logout() {
    localStorage.removeItem('userData');
    this.toastr.success('Logout sucessfully !!');
    this.router.navigate(['/login']);
  }
  create() {
    this.toastr.info('Fill the fields');
    this.router.navigate(['/createblog']);
  }

  delete(blog: any) {
    this.blogbackend.deleteBlog(blog).subscribe((data: any) => {
      console.log(data);
    });
    this.toastr.warning('Blog deleted !!!');
    this.router.navigate(['/userprofile']);
  }
  async edit(blogId: any) {
    console.log(blogId);
    this.toastr.info('Edit the blog');
    this.router.navigate(['/editblog', blogId]);

    const updatedBlogDetails = await this.blogbackend.getUserById(blogId);
    this.updatedBlogDetails = updatedBlogDetails;
    console.log(this.updatedBlogDetails);
    window.location.reload();
  }
}
