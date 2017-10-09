import { Component, OnInit, AfterViewInit, Input} from '@angular/core';

import Chartist from 'chartist';
@Component({
  selector: 'app-total-view',
  template: `<div [attr.id]= "elemID" class="sparkline {{barColor}}"></div>`,
  styles: [`
 
`]
})
export class TotalViewComponent implements OnInit, AfterViewInit {
  elemID = 'sparklinedash' + Math.random().toString(36).slice(2); 
  constructor() { }
  sparkGraph:any;
  @Input()
  barColor:string;
  @Input()
  barValue;
  ngOnInit() {
  }
  ngAfterViewInit(){
    
    this.sparkGraph = new Chartist.Bar(document.getElementById(this.elemID ), {
          series: [
            this.barValue || []
          ] 
        }, {
          axisX: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          axisY: {
            showGrid: false,
            showLabel: false,
            offset: 0
          },
          chartPadding: 10,
          low: 0
        });
  }
}
