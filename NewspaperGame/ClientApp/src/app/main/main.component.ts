import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Newspaper } from '../../classes/newspaper';
import { Opponent } from '../../classes/opponent';
import { Public } from '../../classes/public';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  date: Date;
  newspapers: Newspaper[];
  opponents: Opponent[];
  
  localPopularity: number = 25;
  nationalPopularity: number = 0;
  sliders: number[] = [50, 50, 50, 50, 50, 50];
  costs: number[] = [50, 50, 50, 50, 50, 50];
  budget: number = 1500;
  budgetRemaining: number = this.budget;

  tooltips = [
    [
      { min: 0, max: 19, text: "Make up some interesting news" },
      { min: 20, max: 39, text: "Quotes and numbers embelished for added drama" },
      { min: 40, max: 59, text: "News with personal anecdotes" },
      { min: 60, max: 79, text: "Factually accurate" },
      { min: 80, max: 100, text: "Well Researched Novel Investigations" }
    ],
    [
      { min: 0, max: 19, text: "Mostly celebrity gossip, dog pics, and recipies to lose weight" },
      { min: 20, max: 39, text: "Primarily lifestyle articles, but some news sprinked in" },
      { min: 40, max: 59, text: "Featuring the news section, but also art, culture, celebrity, cooking" },
      { min: 60, max: 79, text: "Informative news and non-news articles alike" },
      { min: 80, max: 100, text: "Long form journalism" }
    ],
    [
      { min: 0, max: 19, text: "Your way of life is under attack" },
      { min: 20, max: 39, text: "Things are pretty bad in America right now" },
      { min: 40, max: 59, text: "Neutral informative tone" },
      { min: 60, max: 79, text: "Looking at the bright future ahead of any current struggles" },
      { min: 80, max: 100, text: "You life is about to be the best ever" }
    ],
    [
      { min: 0, max: 19, text: "Dry and factual news" },
      { min: 20, max: 39, text: "Some eggageration on importance" },
      { min: 40, max: 59, text: "High level of emphasis" },
      { min: 60, max: 79, text: "Very over the top" },
      { min: 80, max: 100, text: "Shocking and outrageous" }
    ],
    [
      { min: 0, max: 19, text: "All local interest stories" },
      { min: 20, max: 39, text: "Mostly local, some national" },
      { min: 40, max: 59, text: "A mixture of both local and national" },
      { min: 60, max: 79, text: "Mostly national, some local" },
      { min: 80, max: 100, text: "Entirely national news" }
    ],
    [
      { min: 0, max: 19, text: "Only one unique story per newspaper" },
      { min: 20, max: 39, text: "Frontpage is all new, but the rest is purchased from other national newpapers" },
      { min: 40, max: 59, text: "News is in-house but buys syndicated lifestyle columns" },
      { min: 60, max: 79, text: "A mixture of unique articles and pieces by famous guest contributers" },
      { min: 80, max: 100, text: "Write all of your own pieces" }
    ]
  ];

  costEquations = [
    { min: 0, max: 1000, scale: "log" },
    { min: 0, max: 1000, scale: "log" },
    { min: 0, max: 0, scale: "linear" }, //Not used
    { min: 0, max: 0, scale: "linear" }, //Not used
    { min: 0, max: 1000, scale: "log" },
    { min: 0, max: 1000, scale: "log" }
  ]

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {

    this.date = new Date();
    while (this.date.getUTCDay() != 1) {
      this.date.setDate(this.date.getDate() + 1);
    }

    this.opponents = Opponent.generateOpponents();

    //Set the ranges for recolor sliders
    var sliders = document.querySelectorAll(".slider");
    for (var i = 0; i < sliders.length; i++) {
      this.recolorSliders();

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

  recolorSliders() {
    var sliders = document.querySelectorAll(".slider");
    for (var i = 0; i < sliders.length; i++) {
      sliders[i].setAttribute("style", 'background:linear-gradient(to right, #d3d3d3 0%, #d3d3d3 ' + Public.slidersLeft[i] + '%, #54a16b ' + Public.slidersLeft[i] + '%, #54a16b ' + Public.slidersRight[i] + '%,  #d3d3d3 ' + Public.slidersRight[i] + '%, #d3d3d3 100%');
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
    } else if (this.costEquations[i].scale == "log") {
      this.costs[i] = Math.round((this.sliders[i]) ** 2 / 100 ** 2 * (this.costEquations[i].max - this.costEquations[i].min));
    }
    this.budgetRemaining = this.budget - this.costs.reduce((previousValue, currentValue) => (previousValue + currentValue));
  }

  createpaper() {
    console.log("New Paper")

    //Save the paper
    var news = new Newspaper(this.date, this.sliders);
    this.date.setDate(this.date.getDate() + 7);

    var weeksPapers = [news]

    //Create the opponent papers
    for (let o of this.opponents) {
      weeksPapers.push(o.generatePaper(this.date))
    }

    //Calculate popularity
    var scores: [string, number][] = [];
    //for My paper
    scores.push([
      'mine', this.sliders.filter((s, i) => s >= Public.slidersLeft[i] && s <= Public.slidersRight[i]).length
    ]);
    //for Opponents
    for (let o of this.opponents) {
      scores.push([
        o.name, o.sliders.filter((s, i) => s >= Public.slidersLeft[i] && s <= Public.slidersRight[i]).length
      ]);
    }
    scores.sort((n1, n2) => n1[1] - n2[1])
    console.log(scores);
    //See who wins a loses
    var mid = Math.floor(scores.length/2);

    //bank is if the mid increases too
    var bank = scores.map(s => s[1]).reduce((p, c) => p + (c - scores[mid][1]));
    var bankSplit = scores.filter(s => s[1] >= scores[mid][1]).length;
    for (let score of scores) {
      let delta = (score[1] - scores[mid][1]);
      //clear bank
      if (score[1] >= scores[mid][1]) {
        delta += bank / bankSplit;
      }
      if (score[0] == 'mine') {
        this.localPopularity += delta;
      } else {
        this.opponents.filter(o => o.name == score[0])[0].localPopularity += delta;
      }
    }
      
    //Shift the public
    for (var i = 0; i < this.sliders.length; i++) {
      var value = (this.sliders[i] + weeksPapers.map(p => p.sliders[i]).reduce((p, c) => p + c)) / (this.opponents.length + 1);
      if (value > Public.slidersRight[i]) {
        Public.slidersRight[i] = (Public.slidersRight[i] + Public.slidersDeltaRight[i]) % 100;
      } else if (Math.abs(Public.slidersRight[i] - Public.slidersLeft[i]) > 10) {
        Public.slidersRight[i] = (Public.slidersRight[i] - Public.slidersDeltaRight[i]) % 100;
      }
      if (value < Public.slidersLeft[i]) {
        Public.slidersLeft[i] = (Public.slidersLeft[i] - Public.slidersDeltaLeft[i]) % 100;
      } else if (Math.abs(Public.slidersRight[i] - Public.slidersLeft[i]) > 10) {
        Public.slidersLeft[i] = (Public.slidersLeft[i] + Public.slidersDeltaLeft[i]) % 100;
      }
    }

    this.recolorSliders();
    for (var i = 0; i < this.sliders.length; i++) {
      this.sliderChange(i);
    }
  }

  viewRules(content) {
    this.modalService.open(content, { size: 'xl' });
  }

}
