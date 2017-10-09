import { Component, OnInit, AfterViewInit } from '@angular/core';

import 'datatables.net';
import $ from 'jquery';
@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements AfterViewInit {
   elemID = 'tab' + Math.random().toString(36).slice(2);
   dt:any;
  constructor() { }

  ngAfterViewInit() {
    if(this.dt){
      this.dt.clear().destroy();
      this.dt = null;
    }
      this.dt = $('#'+this.elemID).DataTable();
  }

}
