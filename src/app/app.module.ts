import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileSelectDirective  } from 'ng2-file-upload';
import {FileDropDirective} from 'ng2-file-upload';


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

import {HttpService} from "./common/services/http.service";
import {LocalStorageService} from "./common/services/local-storage.service";
import {Broadcaster} from "./common/services/broadcaster.service";
import {HttpModule} from "@angular/http";
import {ValidationService} from "./common/services/validation.service"

import { GenralSh8keEditComponent } from './modules/sh8ke/general-sh8ke/genral-sh8ke-edit/genral-sh8ke-edit.component';
import { ExampleSh8keEditComponent } from './modules/sh8ke/example-sh8ke/example-sh8ke-edit/example-sh8ke-edit.component';
import { GlobalSh8keEditComponent } from './modules/sh8ke/global-sh8ke/global-sh8ke-edit/global-sh8ke-edit.component';
import { LineChartComponent } from './common/component/line-chart/line-chart.component';
import { EditCategoryComponent } from './modules/category/edit-category/edit-category.component';
import { EditNewsComponent } from './modules/news/edit-news/edit-news.component';
import { EditAdminComponent } from './modules/user/admin/edit-admin/edit-admin.component';
import { EditGeneralComponent } from './modules/user/general/edit-general/edit-general.component';
import { GeneralCreatorComponent } from './modules/sh8ke/general-sh8ke/general-creator/general-creator.component';
import {LineChartMultiComponent} from "./common/component/line-chart-multi/line-chart-multi.component";
import { GeneralAnswerComponent } from './modules/sh8ke/general-sh8ke/general-answer/general-answer.component';
import { GlobalAnswerComponent } from './modules/sh8ke/global-sh8ke/global-answer/global-answer.component';
import { GlobalCreatorComponent } from './modules/sh8ke/global-sh8ke/global-creator/global-creator.component';
import { GeneralStaticsComponent } from './modules/sh8ke/general-sh8ke/general-statics/general-statics.component';
import { GlobalStaticsComponent } from './modules/sh8ke/global-sh8ke/global-statics/global-statics.component';
import { ExampleAnswerComponent } from './modules/sh8ke/example-sh8ke/example-answer/example-answer.component';
import { ExampleStaticsComponent } from './modules/sh8ke/example-sh8ke/example-statics/example-statics.component';

import { ObjectKeyPipe } from './common/pipes/object-key.pipe';
import { WorldMapComponent } from './common/component/world-map/world-map.component';
import { CalendarComponent } from './common/component/calendar/calendar.component';
import { GeneralAnswerEditComponent } from './modules/sh8ke/general-sh8ke/general-answer-edit/general-answer-edit.component';
import { GlobalAnswerEditComponent } from './modules/sh8ke/global-sh8ke/global-answer-edit/global-answer-edit.component';
import { ExampleAnswerEditComponent } from './modules/sh8ke/example-sh8ke/example-answer-edit/example-answer-edit.component';
import { ControlMessageComponent } from './common/component/control-message/control-message.component';

import {AuthService} from "./common/services/auth.service";
import {AuthGuard} from "./common/routing/auth.guard";
import {CommonModule} from "@angular/common";
import {TitleCase} from "./common/pipes/camel-case";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    GeneralUserComponent,
    AdminUserComponent,
    TotalRevenuComponent,
    LineChartMultiComponent,
    TotalViewComponent,
    CategoryComponent,
    DatatableComponent,
    LoginComponent,
    GeneralSh8keComponent,
    GlobalSh8keComponent,
    ExampleSh8keComponent,
    NewsComponent,
    GenralSh8keEditComponent,
    ExampleSh8keEditComponent,
    GlobalSh8keEditComponent,
    LineChartComponent,
    EditCategoryComponent,
    EditNewsComponent,
    EditAdminComponent,
    EditGeneralComponent,
    GeneralCreatorComponent,
    GeneralAnswerComponent,
    GlobalAnswerComponent,
    GlobalCreatorComponent,
    GeneralStaticsComponent,
    GlobalStaticsComponent,
    ExampleAnswerComponent,
    ExampleStaticsComponent,
    ObjectKeyPipe,
    TitleCase,
    WorldMapComponent,
    CalendarComponent,
    GeneralAnswerEditComponent,
    GlobalAnswerEditComponent,
    FileSelectDirective ,
    FileDropDirective,
    ExampleAnswerEditComponent,
    ControlMessageComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    FormsModule
  ],
  providers: [
    HttpService,
    AuthService,
    AuthGuard,
    LocalStorageService,
    Broadcaster,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
