import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "../../modules/dashboard/dashboard.component";
import {HomeComponent} from "../../modules/home/home.component";
import {AdminUserComponent} from "../../modules/user/admin/admin.component";
import {GeneralUserComponent} from "../../modules/user/general/general.component";
import {CategoryComponent} from "../../modules/category/category.component";
import {LoginComponent} from "../../modules/login/login.component";
import {GlobalSh8keComponent} from "../../modules/sh8ke/global-sh8ke/global-sh8ke.component";
import {GeneralSh8keComponent} from "../../modules/sh8ke/general-sh8ke/general-sh8ke.component";
import {ExampleSh8keComponent} from "../../modules/sh8ke/example-sh8ke/example-sh8ke.component";
import {NewsComponent} from "../../modules/news/news.component";


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
      },
      {
        path: 'sh8ke/exampleSh8ke',
        component: ExampleSh8keComponent
      },
      {
        path: 'sh8ke/generalSh8ke',
        component: GeneralSh8keComponent
      },
      {
        path: 'sh8ke/globalSh8ke',
        component: GlobalSh8keComponent
      },
      {
        path: 'news',
        component: NewsComponent
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
