import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-example-sh8ke',
  templateUrl: './example-sh8ke.component.html',
  styleUrls: ['./example-sh8ke.component.css']
})
export class ExampleSh8keComponent implements OnInit {
  categoryItems = ["Daily", "Shakedown", "Private", "Share", "Explode", "Socialize", "Password", "Adult Material"];
  visibleElement:boolean = false;
   topGeneralSh8ke = 
    [
      {Title:"goals", Description:"Share, Socialize", Category:"goals", "Times sh8ken":167, "Times sh8red":0, Creater:"akshay Kumar", Answer:"Answer(2)"},
      {Title:"goals", Description:"Share, Socialize", Category:"goals", "Times sh8ken":167, "Times sh8red":0, Creater:"akshay Kumar", Answer:"Answer(2)"},
      {Title:"goals", Description:"Share, Socialize", Category:"goals", "Times sh8ken":167, "Times sh8red":0, Creater:"akshay Kumar", Answer:"Answer(2)"},
      {Title:"goals", Description:"Share, Socialize", Category:"goals", "Times sh8ken":167, "Times sh8red":0, Creater:"akshay Kumar", Answer:"Answer(2)"},
      {Title:"goals", Description:"Share, Socialize", Category:"goals", "Times sh8ken":167, "Times sh8red":0, Creater:"akshay Kumar", Answer:"Answer(2)"},
      {Title:"goals", Description:"Share, Socialize", Category:"goals", "Times sh8ken":167, "Times sh8red":0, Creater:"akshay Kumar", Answer:"Answer(2)"}
    ];
  constructor() { }

  ngOnInit() {
  }

}
