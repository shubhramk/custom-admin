import {
  Component, Input, HostListener, EventEmitter, Output, SimpleChanges, OnChanges,
  AfterViewInit, OnInit
} from '@angular/core';

import 'datatables.net';
import $ from 'jquery';
import * as _ from 'lodash';

@Component({
  selector: 'app-datatable',
  template: `
       <div class="custom-dt-table">
          <table [attr.id]="elemID" class="dt-table table table-bordered table-striped table-responsive" style="width:100%;"></table>
        </div>
    `
})
export class DatatableComponent implements OnChanges, AfterViewInit, OnInit {
  @Input()
  dtTableData:any;
  dtTableHeader:any;

  @Input() config;
  @Input() reload;
  @Input() data;
  @Output() onMenuSelect: EventEmitter<any> = new EventEmitter();

  elemID = 'dt-' + Math.random().toString(36).slice(2);
  dt: any = null;
  COMMON_CONFIG: Object = {}; 

  //Constructor
  constructor() { }

  //on component init
  ngOnInit() {
    this.initConfig();

  }

  //when data changes
  ngOnChanges(changes: SimpleChanges) {

    let reloadDT = changes['reload'];
    let data = changes['data'] || [];


    if (reloadDT) {
      if (data['currentValue'] != data['previousValue']) {

        setTimeout(() => this.reloadTable(), 500);
      }
    }
    if (data) {
      if (data['currentValue'] != data['previousValue']) {
        setTimeout(() => this.addData(), 100);
        if(Object.keys(data['currentValue']).length > 0){
            
        }
          
      }
    }
  }
  //called after view is initialized
  ngAfterViewInit() {
    //hiding data table errors
    //$.fn.dataTable.ext.errMode = 'none';

    //merging common options and user options
    let options: Object = _.extend(
      {},
      this.COMMON_CONFIG,
      this.config
    );
    this.initDT(options);
  }

  //init data table
  initDT(options: Object): void {
    if (this.dt) {
      this.dt.clear().destroy();
      this.dt = null;      
      setTimeout(() => this.initDT(options), 0);
    } else {
      if(options["data"].length > 0){
        this.dt = $('#' + this.elemID).DataTable(options);
        setTimeout(() => this.onInitComplete(), 200);
      }
    }
  }

  //reload table
  reloadTable(): void {
    if (this.dt) {
      //reload logic
    }
  }

  //add data through JSON / Array
  addData() {    
    let options: Object = _.extend(
      {},
      this.COMMON_CONFIG,
      this.config,
      { "data": this.data || [] }
    );    
    this.initDT(options);
  }

  //init data Table common config
  initConfig() {
    this.COMMON_CONFIG = {
       displayLength: 20,
       destroy: false,
       order: [],
       lengthMenu: [[10, 20, 25], [10, 20, 25]],
       data: []
    };
  }

  //binding event on data table init
  onInitComplete() {
    let self = this;
    let table = $('#' + self.elemID + "_wrapper .dt-table").DataTable();
    
    // menu functionality
    $('#' + self.elemID + "_wrapper .dt-table").off('click', 'a');
    $('#' + self.elemID + "_wrapper .dt-table").on('click', 'a', function () {
      self.onMenuClicked({ 'clickedOn': $(this).attr('data-name'), "value": $(this).attr('data-custom'), creatorName:$(this).attr('data-creator') });
    });
  }
  //on no data
  onNoData(options:object) {  
    $('#' + this.elemID).DataTable(options);
  }

  //on menu event bind ie. edit/add/delete icons
  onMenuClicked(obj: any): void {
    this.onMenuSelect.emit(obj);
  }

}
