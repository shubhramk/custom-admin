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
import {GenralSh8keEditComponent} from "../../modules/sh8ke/general-sh8ke/genral-sh8ke-edit/genral-sh8ke-edit.component";
import {ExampleSh8keEditComponent} from "../../modules/sh8ke/example-sh8ke/example-sh8ke-edit/example-sh8ke-edit.component";
import {GlobalSh8keEditComponent} from "../../modules/sh8ke/global-sh8ke/global-sh8ke-edit/global-sh8ke-edit.component";

import {GeneralAnswerComponent} from "../../modules/sh8ke/general-sh8ke/general-answer/general-answer.component";

import {EditCategoryComponent} from "../../modules/category/edit-category/edit-category.component";
import {EditNewsComponent} from "../../modules/news/edit-news/edit-news.component";
import {EditAdminComponent} from "../../modules/user/admin/edit-admin/edit-admin.component";
import {EditGeneralComponent} from "../../modules/user/general/edit-general/edit-general.component";
import {GeneralCreatorComponent} from "../../modules/sh8ke/general-sh8ke/general-creator/general-creator.component";
import { GlobalAnswerComponent } from '../../modules/sh8ke/global-sh8ke/global-answer/global-answer.component';
import {GlobalCreatorComponent} from "../../modules/sh8ke/global-sh8ke/global-creator/global-creator.component";

import {GeneralStaticsComponent} from "../../modules/sh8ke/general-sh8ke/general-statics/general-statics.component";
import {GlobalStaticsComponent} from "../../modules/sh8ke/global-sh8ke/global-statics/global-statics.component";
import {ExampleAnswerComponent} from "../../modules/sh8ke/example-sh8ke/example-answer/example-answer.component";
import {ExampleStaticsComponent} from "../../modules/sh8ke/example-sh8ke/example-statics/example-statics.component";
import {GeneralAnswerEditComponent} from "../../modules/sh8ke/general-sh8ke/general-answer-edit/general-answer-edit.component";
import {GlobalAnswerEditComponent} from "../../modules/sh8ke/global-sh8ke/global-answer-edit/global-answer-edit.component";
import {ExampleAnswerEditComponent} from "../../modules/sh8ke/example-sh8ke/example-answer-edit/example-answer-edit.component";

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
        path: 'users/edit-admin/:id',
        component: EditAdminComponent
      },
      {
        path: 'users/general',
        component: GeneralUserComponent
      },
      {
        path: 'users/edit-general/:id',
        component: EditGeneralComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'sh8ke/categoryEdit/:id',
        component: EditCategoryComponent
      }
      ,
      {
        path: 'sh8ke/exampleSh8ke',
        component: ExampleSh8keComponent
      }
      ,
      {
        path: 'sh8ke/examplesh8keedit/:id',
        component: ExampleSh8keEditComponent
      },
      {
        path: 'sh8ke/generalSh8ke',
        component: GeneralSh8keComponent
      },{
        path: 'sh8ke/genralsh8keedit/:id/:name',
        component: GenralSh8keEditComponent
      },
      {
        path: 'sh8ke/globalSh8ke',
        component: GlobalSh8keComponent
      },{
        path: 'sh8ke/globalsh8keedit/:id/:name',
        component: GlobalSh8keEditComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'news/editNews/:id',
        component: EditNewsComponent
      },
      {
        path: 'user/generalCreator/:id/:name',
        component: GeneralCreatorComponent
      },
      {
        path: 'user/globalCreator/:id/:name',
        component: GlobalCreatorComponent
      },
      {
        path: 'sh8ke/generalAnswer/:id/:primeNo',
        component: GeneralAnswerComponent
      },
      {
        path: 'sh8ke/globalAnswer/:id/:primeNo',
        component: GlobalAnswerComponent
      },
      {
        path: 'sh8ke/generalstatics/:id/:name',
        component: GeneralStaticsComponent
      },
      {
        path: 'sh8ke/globalstatics/:id/:name',
        component: GlobalStaticsComponent
      },
      {
        path: 'sh8ke/exampleAnswer/:id/:primeNo',
        component: ExampleAnswerComponent
      },
      {
        path: 'sh8ke/examplestatics/:id/:name',
        component: ExampleStaticsComponent
      },
      {
        path:'sh8ke/editGeneralAnswer/:id',
        component:GeneralAnswerEditComponent
      },
      {
        path:'sh8ke/editExampleAnswer/:id',
        component:ExampleAnswerEditComponent

      },
      {
        path:'sh8ke/editGlobalAnswer/:id',
        component:GlobalAnswerEditComponent
      }
      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(adminRoutes,{ useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule {}
