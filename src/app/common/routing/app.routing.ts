import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../modules/dashboard/dashboard.component";
import {HomeComponent} from "../../modules/home/home.component";
import {AdminUserComponent} from "../../modules/user/admin/admin.component";
import {GeneralUserComponent} from "../../modules/user/general/general.component";
import {CategoryComponent} from "../../modules/category/category.component";
import {LoginComponent} from "../../modules/login/login.component";



const adminRoutes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'users/admin',
        component: AdminUserComponent
      },
      {
        path: 'users/general',
        component: GeneralUserComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      }

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}
