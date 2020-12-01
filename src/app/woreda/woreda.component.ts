import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-woreda',
  templateUrl: './woreda.component.html',
  styleUrls: ['./woreda.component.scss']
})
export class WoredaComponent implements OnInit {
  data = ['Woreda 01','Woreda 02','Woreda 03','Woreda 05','Woreda 06','Woreda 07','Woreda 08',];

  constructor() { }

  ngOnInit() {
  }

}
