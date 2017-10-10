import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

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
   @Input()
   dtTableData:any;
   dtTableHeader:any;
  constructor() { }

  ngAfterViewInit() {
    
    if(this.dt){
      this.dtTableHeader = [];
      this.dt.clear().destroy();
      this.dt = null;
    }
      this.dtTableHeader = Object.keys(this.dtTableData[0]);
     // this.dtTableHeader.pop();
      this.dt = $('#'+this.elemID).DataTable();
  }

}
