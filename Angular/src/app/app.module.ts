import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {ToastModule} from 'primeng/toast';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthorisedSideNavComponent } from './layout/authorised/authorised-side-nav/authorised-side-nav.component';
import { AuthorisedSideNaveTogglerComponent } from './layout/authorised/authorised-side-nave-toggler/authorised-side-nave-toggler.component';
import { AuthorisedTopNavComponent } from './layout/authorised/authorised-top-nav/authorised-top-nav.component';
import { ContentComponent } from './layout/authorised/content/content.component';
import { ManageInventoryComponent } from './components/manage-inventory/manage-inventory.component';
import { ManageRoomsComponent } from './components/manage-rooms/manage-rooms.component';
import { EditRoomComponent } from './components/manage-rooms/edit-room/edit-room.component';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EditCategoryComponent } from './components/manage-rooms/edit-category/edit-category.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorInterceptor } from './helper/error.interceptor';
import { JwtInterceptor } from './helper/jwt.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { EditInventoryComponent } from './components/manage-inventory/edit-inventory/edit-inventory.component';
import { ResponseInterceptor } from './helper/response.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AuthorisedLayoutComponent,
    AuthorisedSideNaveTogglerComponent,
    AuthorisedSideNavComponent,
    AuthorisedTopNavComponent,
    ContentComponent,
    ManageInventoryComponent,
    ManageRoomsComponent,
    EditRoomComponent,
    EditCategoryComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    EditInventoryComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DynamicDialogModule,
    ToastModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
