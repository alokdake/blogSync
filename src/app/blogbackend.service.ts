import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogbackendService {
  private baseURL = 'https://blogsyncbackend.onrender.com/';
  private getAllUsersURL = 'api/v1/auth';
  private registerationURL = 'api/v1/auth/signup';
  private loginURL = 'api/v1/auth/signin';
  private getUserByIdURL = 'api/v1/users';
  private getAllBlogsURL = 'api/v1/blogs';
  private getBlogsByUserId = 'api/v1/blogs/author';
  private getBlogById = 'api/v1/blogs';
  private postblog = 'api/v1/blogs';
  private deleteblog = 'api/v1/blogs';
  private deleteUser = 'api/v1/users';
  private postReportBlogURL = 'api/v1/reportblog';
  private getReportBlog = 'api/v1/reportblog';
  private deleteReportBlog = 'api/v1/reportblog';
  private getreportBlogByUserId = 'api/v1/reportblog/author';

  constructor(private http: HttpClient) {}
  getAllUsers() {
    return this.http.get<any>(this.baseURL + this.getAllUsersURL, {});
  }

  registerDetails(registerModel: any) {
    console.log(registerModel);
    return this.http.post<any>(
      this.baseURL + this.registerationURL,
      registerModel
    );
  }

  loginDetails(data: any) {
    return this.http.post<any>(this.baseURL + this.loginURL, data);
  }
  getUserById(userId: any) {
    return this.http.get<any>(
      this.baseURL + this.getUserByIdURL + '/' + userId,
      {}
    );
  }

  updateUserDetails(userId: any, value: any) {
    return this.http.put<any>(
      this.baseURL + this.getUserByIdURL + '/' + userId,
      value
    );
  }

  getAllBlogs() {
    return this.http.get<any>(this.baseURL + this.getAllBlogsURL, {});
  }

  getBlogsByAuthor(userId: any) {
    console.log(userId);
    return this.http.get<any>(
      this.baseURL + this.getBlogsByUserId + '/' + userId
    );
  }

  getblogById(blogId: any) {
    return this.http.get<any>(
      this.baseURL + this.getBlogById + '/' + blogId,
      {}
    );
  }

  postBlog(blogModel: any) {
    return this.http.post<any>(this.baseURL + this.postblog, blogModel);
  }

  deleteBlog(blog: any) {
    return this.http.delete<any>(this.baseURL + this.deleteblog + '/' + blog);
  }

  updateBlogDetails(blogId: any, value: any) {
    console.log(value);
    return this.http.put<any>(
      this.baseURL + this.getBlogById + '/' + blogId,
      value
    );
  }

  deleteUsersByAdmin(user: any) {
    return this.http.delete<any>(this.baseURL + this.deleteUser + '/' + user);
  }

  postReportBlog(data: any) {
    console.log(data);
    return this.http.post<any>(this.baseURL + this.postReportBlogURL, data);
  }
  getReportedBlogs() {
    return this.http.get<any>(this.baseURL + this.getReportBlog, {});
  }

  deleteReportedBlogs(reportblog: any) {
    return this.http.delete<any>(
      this.baseURL + this.deleteReportBlog + '/' + reportblog
    );
  }

  getReportedBlogsByAuthor(userId: any) {
    console.log(userId);
    return this.http.get<any>(
      this.baseURL + this.getreportBlogByUserId + '/' + userId
    );
  }

  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  updateData(newData: any) {
    this.dataSubject.next(newData);
  }
}
