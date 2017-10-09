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
    DatatableComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
