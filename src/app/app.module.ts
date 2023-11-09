import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { MatIconModule } from '@angular/material/icon';
import { LocalstorageService } from './localstorage.service';
import { ViewblogComponent } from './viewblog/viewblog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CreateblogComponent } from './createblog/createblog.component';
import { DeleteblogComponent } from './deleteblog/deleteblog.component';
import { EditblogComponent } from './editblog/editblog.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EditbyadminComponent } from './editbyadmin/editbyadmin.component';
import { ReportblogComponent } from './reportblog/reportblog.component';
import { MatRadioModule } from '@angular/material/radio';

import {
  MatDialog,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserprofileComponent,
    EditprofileComponent,
    ViewblogComponent,
    CreateblogComponent,
    DeleteblogComponent,
    EditblogComponent,
    AdminComponent,
    CategoryComponent,
    EditbyadminComponent,
    ReportblogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
    }),
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,
    }),
  ],
  providers: [LocalstorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
