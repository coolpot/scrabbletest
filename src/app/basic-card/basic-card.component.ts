import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.scss']
})
export class BasicCardComponent implements OnInit {
  @Input() title: string;
  @Input() subTitle: string;
  @Input() data: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
