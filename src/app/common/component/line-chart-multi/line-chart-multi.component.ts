import { Component, OnInit, AfterViewInit,Input, OnChanges, SimpleChanges} from '@angular/core';
declare var Morris:any, $:any;

@Component({
  selector: 'app-line-multi-chart',
  template: `<div [attr.id] = "elemID"></div>`,
  styleUrls: ['./line-chart-multi.component.css']
})
export class LineChartMultiComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data:any;
  @Input() configLabel:any;
  @Input() configLinecolor:any;
  @Input() configYKeys:any;

   elemID = 'dt-' + Math.random().toString(36).slice(2);
  constructor() { }
  ngAfterViewInit(){
    // LINE CHART


  }
  //when data changes
  ngOnChanges(changes: SimpleChanges) {

    let data = changes['data'] || [];
    console.log(data);
  if(data['currentValue'] != undefined){
    if (data['currentValue'].length > 0) {
      if (data['currentValue'] != data['previousValue']) {
        setTimeout(() => this.initLineChart(), 100);
      }
    }
  }
    
  }
  initLineChart(){
    console.log(this.configLabel);
    if(this.data.length < 1){
      return;
    }
    $("#"+this.elemID).empty();
    var line = new Morris.Line({
      element: this.elemID,
      data: this.data,
      xkey: 'date',
      labels: this.configLabel,
      gridLineColor: '#eef0f2',
      lineColors: this.configLinecolor,
      lineWidth: 1,
      hideHover: 'auto',
      xLabelFormat:function(d){
        return d.getDate();
      },
      ykeys: this.configYKeys,
      resize:true
    });
  }
  ngOnInit() {
  }

}
