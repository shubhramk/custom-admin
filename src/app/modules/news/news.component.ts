import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
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
