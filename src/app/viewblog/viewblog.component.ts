import { Component } from '@angular/core';
import { BlogbackendService } from '../blogbackend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.component.html',
  styleUrls: ['./viewblog.component.scss'],
})
export class ViewblogComponent {
  _id: any;
  blogData: any;
  userDetail: any;
  constructor(
    private blogbackend: BlogbackendService,
    private activeroutes: ActivatedRoute,
    private router: Router,
    private localstorage: LocalstorageService
  ) {}

  ngOnInit(): void {
    this.localstorage.getData().subscribe((data: any) => {
      this.userDetail = JSON.parse(data);
      console.log(this.userDetail);
    });
    this._id = this.activeroutes.snapshot.params['id'];
    console.log(this._id);
    this.blogbackend.getblogById(this._id).subscribe((data: any) => {
      this.blogData = [data]; // Wrap data in an array
      console.log(this.blogData);
    });
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }
  create() {
    this.router.navigate(['/createblog']);
  }
}
