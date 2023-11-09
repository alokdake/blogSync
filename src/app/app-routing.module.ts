import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ViewblogComponent } from './viewblog/viewblog.component';
import { CreateblogComponent } from './createblog/createblog.component';
import { DeleteblogComponent } from './deleteblog/deleteblog.component';
import { EditblogComponent } from './editblog/editblog.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { EditbyadminComponent } from './editbyadmin/editbyadmin.component';
import { ReportblogComponent } from './reportblog/reportblog.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'editprofile/:id', component: EditprofileComponent },
  { path: 'viewblog/:id', component: ViewblogComponent },
  { path: 'createblog', component: CreateblogComponent },
  { path: 'deleteblog', component: DeleteblogComponent },
  { path: 'editblog/:id', component: EditblogComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'editbyadmin/:id', component: EditbyadminComponent },
  { path: 'reportblog/:id', component: ReportblogComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
