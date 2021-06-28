import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageInventoryComponent } from './components/manage-inventory/manage-inventory.component';
import { ManageRoomsComponent } from './components/manage-rooms/manage-rooms.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './helper/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';


const routes: Routes = [
  {
    path: '',
    component: AuthorisedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        component: HomepageComponent,
      },
     
      {
        path: 'manageRooms',
        component: ManageRoomsComponent,
      },
      
      {
        path: 'inventory',
        component: ManageInventoryComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
