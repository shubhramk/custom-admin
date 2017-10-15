import { Component, AfterViewInit, ElementRef, Input} from '@angular/core';

import * as Chartist from 'chartist';


@Component({
  selector: 'app-total-revenu',
  templateUrl: './total-revenu.component.html',
  styleUrls: ['./total-revenu.component.css']
})
export class TotalRevenuComponent implements AfterViewInit {
  @Input()
  count:number = 0;

  constructor(private elRef:ElementRef) { }
  ngAfterViewInit(){
    
    new Chartist.Bar(this.elRef.nativeElement.querySelector('.total-sales'), {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept']
        , series: [
        [800000, 1200000, 1400000, 1300000, 1200000, 1400000, 1300000, 1300000, 1200000]
        , [200000, 400000, 500000, 300000, 400000, 500000, 300000, 300000, 400000]
        , [100000, 200000, 400000, 600000, 200000, 400000, 600000, 600000, 200000]
      ]
    }, {
        high: 2500000 
        , low: 500000
        , fullWidth: true
        , plugins: [
        //Chartist.plugins.tooltip()
        ]
        , stackBars: true
        , axisX: {
            showGrid: false
        }
        , axisY: {
            labelInterpolationFnc: function (value) {
                return (value / 1000) + 'k';
            }
        }
    }).on('draw', function (data) {
        if (data.type === 'bar') {
            data.element.attr({
                style: 'stroke-width: 20px'
            });
        }
    });
  }
  ngOnInit() {
  }

}
