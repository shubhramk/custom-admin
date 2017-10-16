import { Component, OnInit, AfterViewInit,Input, OnChanges, SimpleChanges} from '@angular/core';
declare var Morris:any;
@Component({
  selector: 'app-line-multi-chart',
  template: `<div [attr.id] = "elemID"></div>`,
  styleUrls: ['./line-chart-multi.component.css']
})
export class LineChartMultiComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  data:any;
   elemID = 'dt-' + Math.random().toString(36).slice(2);
  constructor() { }
  ngAfterViewInit(){
    // LINE CHART


  }
  //when data changes
  ngOnChanges(changes: SimpleChanges) {

    let data = changes['data'] || [];

    if (data['currentValue'].length > 0) {
      if (data['currentValue'] != data['previousValue']) {
        setTimeout(() => this.initLineChart(), 100);
      }
    }
  }
  initLineChart(){

    if(this.data.length < 1){
      return;
    }

    var line = new Morris.Line({
      element: this.elemID,
      data: this.data,
      xkey: 'date',
      labels: ['Total Users','Sh8ke Shared','Sh8ke Created'],
      gridLineColor: '#eef0f2',
      lineColors: ['#009efb','#617381','#4DA74D'],
      lineWidth: 1,
      hideHover: 'auto',
      xLabelFormat:function(d){
        return d.getDate();
      },
      ykeys: ['a', 'b','c'],
      resize:true
    });
  }
  ngOnInit() {
  }

}
