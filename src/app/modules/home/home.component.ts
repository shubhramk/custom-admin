import {Component, AfterViewInit, ElementRef} from '@angular/core';
import Chartist from 'chartist';
@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit{
  visitData = [{total:2301, name:"Total Visits", symbol:"down", color:'red', val:[ 0, 5, 6, 10, 9, 12, 4, 9]}, 
              {total:2421, name:"Page Views", symbol:"up", color:'blue', val:[ 0, 5, 6, 10, 9, 12, 4, 9]},
              {total:2515, name:"Unique Visits", symbol:"down", color:'yellow', val:[ 0, 5, 6, 10, 9, 12, 4, 9]},
              {total:1122, name:"Bounce Rate", symbol:"up", color:'green', val:[ 0, 5, 6, 10, 9, 12, 4, 9]}
  ];

  initialCount:number = 30;
  constructor(private elRef:ElementRef) {

  }

  ngAfterViewInit(){
    
        

  }
}
