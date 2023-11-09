import { Component } from '@angular/core';
import { BlogbackendService } from '../blogbackend.service';
import { empty } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  filteredBlogs: any;
  constructor(private backend: BlogbackendService, private router: Router) {}
  allBlogs: any;
  selectedCategory: any;
  ngOnInit() {
    this.getBlogs();
  }
  getBlogs() {
    this.backend.getAllBlogs().subscribe((data: any) => {
      this.allBlogs = data.blogs;
      this.filteredBlogs = this.allBlogs;
      console.log(this.allBlogs);
    });
  }
  filterByCategory(category: any) {
    console.log(category);
    if (category === 'All' || undefined || null || '') {
      this.getBlogs();
    } else {
      this.filteredBlogs = this.allBlogs.filter(
        (blog: any) => blog.category === category
      );
      console.log(this.filteredBlogs);
    }
    this.selectedCategory = category;
  }
  viewBlog(blogId: any) {
    console.log(blogId);
    this.router.navigate(['/viewblog', blogId]);
  }
}
