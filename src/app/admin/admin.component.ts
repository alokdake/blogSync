import { Component } from '@angular/core';
import { BlogbackendService } from '../blogbackend.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  constructor(
    private blogbackend: BlogbackendService,
    private router: Router,
    public dialog: MatDialog
  ) {}
  allBlogs: any;
  allBlogCount: any;
  registeredUserDetails: any;
  allUserCount: any;
  reportblog: any;
  reportblogcount: any;
  ngOnInit() {
    this.getBlogs();
    this.getUsers();
    this.getReportBlog();
  }

  getBlogs() {
    this.blogbackend.getAllBlogs().subscribe((data: any) => {
      this.allBlogs = data.blogs;
      console.log(this.allBlogs);
      this.allBlogCount = this.allBlogs.length;
    });
  }
  getUsers() {
    this.blogbackend.getAllUsers().subscribe((data: any) => {
      this.registeredUserDetails = data;
      console.log(this.registeredUserDetails);
      this.allUserCount = this.registeredUserDetails.length;
    });
  }
  getReportBlog() {
    this.blogbackend.getReportedBlogs().subscribe((data: any) => {
      this.reportblog = data.reportblogs;
      console.log(this.reportblog);
      this.reportblogcount = this.reportblog.length;
    });
  }
  deleteBlog(blog: any) {
    this.blogbackend.deleteBlog(blog).subscribe((data: any) => {
      console.log(data);
    });

    this.router.navigate(['/admin']);
  }
  editBlog(blogId: any) {
    console.log(blogId);
    this.router.navigate(['/editbyadmin', blogId]);
  }

  deleteUser(user: any) {
    this.blogbackend.deleteUsersByAdmin(user).subscribe((data: any) => {
      console.log(data);
    });
  }
  logout() {
    this.router.navigate(['/login']);
  }
  deleteReportedBlog(reportblog: any, blogId: any) {
    console.log(reportblog);
    this.blogbackend.deleteReportedBlogs(reportblog).subscribe((data: any) => {
      console.log(data);
    });
    this.blogbackend.deleteBlog(blogId).subscribe((data: any) => {
      console.log('Reported Blog deleted');
    });

    // this.router.navigate(['/admin']);
  }
  viewBlog(blogId: any) {
    console.log(blogId);
    this.router.navigate(['/viewblog', blogId]);
  }
  viewblog(blogId: any) {
    console.log(blogId);
    this.router.navigate(['/viewblog', blogId]);
  }
}
