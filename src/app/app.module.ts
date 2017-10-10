import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule} from "./common/routing/app.routing";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {HomeComponent} from "./modules/home/home.component";
import {GeneralUserComponent} from "./modules/user/general/general.component";
import {AdminUserComponent} from "./modules/user/admin/admin.component";
import { TotalRevenuComponent } from './common/component/total-revenu/total-revenu.component';
import { TotalViewComponent } from './common/component/total-view/total-view.component';
import { CategoryComponent } from './modules/category/category.component';
import { DatatableComponent } from './common/component/datatable/datatable.component';
import {LoginComponent} from "./modules/login/login.component";
import { GeneralSh8keComponent } from './modules/sh8ke/general-sh8ke/general-sh8ke.component';
import { GlobalSh8keComponent } from './modules/sh8ke/global-sh8ke/global-sh8ke.component';
import { ExampleSh8keComponent } from './modules/sh8ke/example-sh8ke/example-sh8ke.component';
import { NewsComponent } from './modules/news/news.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    GeneralUserComponent,
    AdminUserComponent,
    TotalRevenuComponent,
    TotalViewComponent,
    CategoryComponent,
    DatatableComponent,
    LoginComponent,
    GeneralSh8keComponent,
    GlobalSh8keComponent,
    ExampleSh8keComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
