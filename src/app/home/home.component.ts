import { Component } from '@angular/core';
import { BlogbackendService } from '../blogbackend.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private backend: BlogbackendService,
    private router: Router,
    private toastr: ToastrService,
    private localstorage: LocalstorageService
  ) {}
  registeredUserDetails: any;
  userDetails: any = [];
  allBlogs: any[] = [];
  blogs: any[] = [];
  showFiller = false;
  filter: any;
  noResultReturned!: boolean;

  ngOnInit(): void {
    this.localstorage.getData().subscribe((data: any) => {
      this.userDetails = JSON.parse(data);
      console.log(this.userDetails);
    });
    this.getBlogs();
  }

  getBlogs() {
    this.noResultReturned = true;
    this.backend.getAllBlogs().subscribe((data: any) => {
      this.allBlogs = data.blogs;
      console.log(this.allBlogs);
      this.blogs = this.allBlogs;
      console.log(this.blogs);
    });
  }

  logout() {
    localStorage.removeItem('userData');
    this.toastr.success('Logout Sucessfully !!');
    this.router.navigate(['/login']);
  }

  userprofile() {
    // this.router.navigate(['/userprofile']);
  }

  viewBlog(blogId: any) {
    console.log(blogId);
    this.router.navigate(['/viewblog', blogId]);
  }
  create() {
    this.toastr.info('Fill the fields');
    this.router.navigate(['/createblog']);
  }

  searchBlogs(event: any) {
    console.log(event);
    let filteredBlog: any[] = [];
    if (event === '') {
      this.getBlogs();
    } else {
      filteredBlog = this.allBlogs.filter((res: any) => {
        let targetProduct = res.title.toLowerCase() + res.author.toLowerCase();
        let searchkey = event.toLowerCase();
        return targetProduct.includes(searchkey);
      });
      this.allBlogs = filteredBlog;
    }
  }
  admin() {
    this.toastr.info('Fill admin credential');
    this.router.navigate(['/login']);
  }
  report(reportId: any) {
    console.log(reportId);
    this.toastr.warning('Select reason for report');
    this.router.navigate(['/reportblog', reportId]);
  }
}
