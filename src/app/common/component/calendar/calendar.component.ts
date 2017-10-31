import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#calendar').fullCalendar('option', 'height', 415);
  }

}
