import { Component, OnInit } from '@angular/core';
import { Opponent } from '../../classes/opponent';

@Component({
  selector: 'app-opponents',
  templateUrl: './opponents.component.html',
  styleUrls: ['./opponents.component.css']
})
export class OpponentsComponent implements OnInit {

  temp = [{ name: "temp" }, { name: "temp2" }, {name: "temp3"}]

  static opponents: Opponent[];

  constructor() { }

  ngOnInit() {
  }

  opponents() {
    return OpponentsComponent.opponents;
  }

}
