import { Component, OnInit, AfterViewInit,Input, OnChanges, SimpleChanges} from '@angular/core';
declare var Morris:any;
@Component({
  selector: 'app-line-chart',
  template: `<div [attr.id] = "elemID"></div>`,
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, AfterViewInit, OnChanges {
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
          xkey: 'year',
          xLabels:"day",
          ykeys: ['item'],
          labels: ['Total Registered User'],
          gridLineColor: '#eef0f2',
          lineColors: ['#009efb'],
          lineWidth: 1,
          hideHover: 'auto',
          xLabelFormat: function (d) {
          var weekdays = new Array(7);
          weekdays[0] = "SUN";
          weekdays[1] = "MON";
          weekdays[2] = "TUE";
          weekdays[3] = "WED";
          weekdays[4] = "THU";
          weekdays[5] = "FRI";
          weekdays[6] = "SAT";

          return weekdays[d.getDay()];
        }, resize:true
        });
  }
  ngOnInit() {
  }

}
