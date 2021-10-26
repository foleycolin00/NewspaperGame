import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Newspaper } from '../../classes/newspaper';
import { Public } from '../../classes/public';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  date: Date;
  newspapers: Newspaper[];

  sliders: number[] = [50, 50, 50, 50, 50, 50];
  costs: number[] = [50, 50, 50, 50, 50, 50];
  budget: number = 5000;
  budgetRemaining: number = this.budget;

  tooltips = [
    [
      { min: 0, max: 19, text: "" },
      { min: 20, max: 39, text: "" },
      { min: 40, max: 59, text: "" },
      { min: 60, max: 79, text: "" },
      { min: 80, max: 100, text: "Well Researched Investigations" }
    ],
    [
      { min: 0, max: 19, text: "" },
      { min: 20, max: 39, text: "" },
      { min: 40, max: 59, text: "" },
      { min: 60, max: 79, text: "" },
      { min: 80, max: 100, text: "" }
    ],
    [
      { min: 0, max: 19, text: "" },
      { min: 20, max: 39, text: "" },
      { min: 40, max: 59, text: "" },
      { min: 60, max: 79, text: "" },
      { min: 80, max: 100, text: "" }
    ],
    [
      { min: 0, max: 19, text: "" },
      { min: 20, max: 39, text: "" },
      { min: 40, max: 59, text: "" },
      { min: 60, max: 79, text: "" },
      { min: 80, max: 100, text: "" }
    ],
    [
      { min: 0, max: 19, text: "" },
      { min: 20, max: 39, text: "" },
      { min: 40, max: 59, text: "" },
      { min: 60, max: 79, text: "" },
      { min: 80, max: 100, text: "" }
    ],
    [
      { min: 0, max: 19, text: "" },
      { min: 20, max: 39, text: "" },
      { min: 40, max: 59, text: "" },
      { min: 60, max: 79, text: "" },
      { min: 80, max: 100, text: "" }
    ]
  ];

  costEquations = [
    { min: 0, max: 1000, scale: "linear" },
    { min: 0, max: 1000, scale: "linear" },
    { min: 0, max: 1000, scale: "linear" },
    { min: 0, max: 1000, scale: "linear" },
    { min: 0, max: 1000, scale: "linear" },
    { min: 0, max: 1000, scale: "linear" }
  ]

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

    this.date = new Date();

    //Set the ranges for recolor sliders
    var sliders = document.querySelectorAll(".slider");
    for (var i = 0; i < sliders.length; i++) {
      //Set the overton window color
      sliders[i].setAttribute("style", 'background:linear-gradient(to right, #d3d3d3 0%, #d3d3d3 ' + Public.slidersLeft[i] + '%, #54a16b ' + Public.slidersLeft[i] + '%, #54a16b ' + Public.slidersRight[i] + '%,  #d3d3d3 ' + Public.slidersRight[i] + '%, #d3d3d3 100%');

      //Set the slider color
      const style = document.createElement('style');
      style.type = 'text/css';
      style.id = "sliderCSS" + i;
      const head = document.getElementsByTagName('head')[0];
      head.appendChild(style);

      this.sliderChange(i);
    }

    //set the tooltip
    var tooltip = document.querySelectorAll('.customtooltip');

    document.addEventListener('mousemove', tooltipFunction, false);

    function tooltipFunction(e) {
      for (var i = tooltip.length; i--;) {
        tooltip[i].setAttribute("style", "left:" + (e.pageX-100) + "px;top:" + (e.pageY+10) + "px");
      }
    }
  }

  getTooltipText(i: number) {
    for (var j = 0; j < this.tooltips[i].length; j++) {
      if (this.sliders[i] <= this.tooltips[i][j].max && this.sliders[i] >= this.tooltips[i][j].min) {
        return this.tooltips[i][j].text;
      }
    }
    return null;
  }

  sliderChange(i: number) {
    //Change the slider head
    var style = document.getElementById("sliderCSS" + i);
    const head = document.getElementsByTagName('head')[0];
    head.removeChild(style);
    if (this.sliders[i] <= Public.slidersRight[i] && this.sliders[i] >= Public.slidersLeft[i]) {
      style.innerHTML = `#slider${i} .slider::-webkit-slider-thumb { background: #db9b22; !important; }`;
    } else {
      style.innerHTML = `#slider${i} .slider::-webkit-slider-thumb { background: black; !important; }`;
    }
    head.appendChild(style);

    //Calculate the costs
    if (this.costEquations[i].scale == "linear") {
      this.costs[i] = (this.costEquations[i].max - this.costEquations[i].min) / 100 * this.sliders[i];
    }
    this.budgetRemaining = this.budget - this.costs.reduce((previousValue, currentValue) => (previousValue + currentValue));
  }

  createpaper() {
    //Save the paper
    this.date.setDate(this.date.getDate() + 1);
    //var news = new Newspaper(this.date, this.sliders);
  }

  viewRules(content) {
    this.modalService.open(content, { size: 'xl' });
  }

}
