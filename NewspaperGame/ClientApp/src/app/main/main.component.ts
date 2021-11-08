import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Newspaper } from '../../classes/newspaper';
import { Opponent } from '../../classes/opponent';
import { Public } from '../../classes/public';
import { Tools } from '../../classes/tools';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  date: Date;
  newspapers: Newspaper[];
  opponents: Opponent[];
  
  sliders: number[] = [50, 50, 50, 50, 50, 50];
  costs: number[] = [50, 50, 50, 50, 50, 50];
  budget: number = 2000;
  budgetRemaining: number = this.budget;
  limitRight: number[] = [null, null, null, null, null, null]
  limitLeft: number[] = [null, null, null, null, null, null]
  limitSet: number[] = [null, null, null, null, null, null]
  invalidLimits: boolean[] = [false, false, false, false, false, false]
  popularity: number = 25;
  popularityChange: number = 0;
  rating: number = this.getSlidersRating(this.sliders);
  ratingChange: number = 0;

  tooltips = [
    [
      { min: 0, max: 19, text: "News is completely fake" },
      { min: 20, max: 39, text: "Made up a few interesting stories" },
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

    //Impose limits
    this.invalidLimits[i] = false
    if (this.limitLeft[i] != null && this.sliders[i] < this.limitLeft[i]) {
      style.innerHTML = `#slider${i} .slider::-webkit-slider-thumb { background: red; !important; }`;
      this.invalidLimits[i] = true
    }
    if (this.limitRight[i] != null && this.sliders[i] > this.limitRight[i]) {
      style.innerHTML = `#slider${i} .slider::-webkit-slider-thumb { background: red; !important; }`;
      this.invalidLimits[i] = true
    }
    if (this.limitSet[i] != null && this.sliders[i] != this.limitSet[i]) {
      style.innerHTML = `#slider${i} .slider::-webkit-slider-thumb { background: red; !important; }`;
      this.invalidLimits[i] = true
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

    //------------------------Calculate Popularity------------------------
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
    var mid = Math.floor(scores.length / 2);
    //Account for 0 scoring papers
    scores = scores.filter(score => {
      if (score[0] != 'mine') {
        let pop = this.opponents.filter(o => o.name == score[0])[0].popularity;
        if (pop - (score[1] - scores[mid][1]) <= 0) {
          pop = 0;
          console.log("NOT WORKING");
          return false;
        }
      }
      return true;
    });
    mid = Math.floor(scores.length / 2);
    scores.sort((n1, n2) => n1[1] - n2[1]);

    //See who wins a loses
    console.log(mid);
    let topMid = scores[mid][1] == scores[scores.length - 1][1];
    //bank is if the mid increases too or 0 based offsets
    //A positive bank means that people lost more than those greator than the mid gained
    var bank = scores.map(s => s[1]).map(s => scores[mid][1] - s).reduce((p, c) => p + c);
    console.log(bank);
    console.log("DELTAS")
    for (let score of scores) {
      let delta = (score[1] - scores[mid][1]);
      if (score[1] >= scores[mid][1]) {
        var bankSplit = topMid ? scores.filter(s => s[1] >= scores[mid][1]).length : scores.filter(s => s[1] > scores[mid][1]).length;
        if (score[1] != scores[mid][1] || topMid) {
          delta += bank / bankSplit;
        }
      }

      console.log(delta)
      if (score[0] == 'mine') {
        this.popularity += delta;
        this.popularityChange = delta;
      } else {
        let o = this.opponents.filter(o => o.name == score[0])[0];
        o.popChange = delta;
        o.popularity = Tools.TrimNumber(o.popularity + delta);
      }
    }
    //In the end, just reduce everything back to 0
    let overage = this.popularity + this.opponents.map(o => o.popularity).reduce((p, c) => p + c) - 100;
    let delta = overage / scores.length;
    for (let score of scores) {
      if (score[0] == 'mine') {
        this.popularity -= delta;
        this.popularityChange = this.popularityChange - delta;
      } else {
        let o = this.opponents.filter(o => o.name == score[0])[0];
        o.popChange = o.popChange - delta;
        o.popularity = Tools.TrimNumber(o.popularity - delta);
      }
    }
    //-----------------------------------------------------------------
      
    //Shift the public
    for (var i = 0; i < this.sliders.length; i++) {
      var outsideLeft = weeksPapers.filter(p => p.sliders[i] < Public.slidersLeft[i]).length;
      var outsideRight = weeksPapers.filter(p => p.sliders[i] > Public.slidersRight[i]).length;
      if (outsideRight >= 1) {
        Public.slidersRight[i] = Tools.TrimNumber(Public.slidersRight[i] + Public.slidersDeltaRight[i]);
      } else if (Math.abs(Public.slidersRight[i] - Public.slidersLeft[i]) > 10) {
        Public.slidersRight[i] = Tools.TrimNumber(Public.slidersRight[i] - Public.slidersDeltaRight[i]);
      }
      if (outsideLeft >= 1) {
        Public.slidersLeft[i] = Tools.TrimNumber(Public.slidersLeft[i] - Public.slidersDeltaLeft[i]);
      } else if (Math.abs(Public.slidersRight[i] - Public.slidersLeft[i]) > 10) {
        Public.slidersLeft[i] = Tools.TrimNumber(Public.slidersLeft[i] + Public.slidersDeltaLeft[i]);
      }
    }

    //Calculate all of the ratings
    let newRating = this.getSlidersRating(this.sliders);
    this.ratingChange = newRating - this.rating;
    this.rating = newRating;
    for (let o of this.opponents) {
      let newRating = this.getSlidersRating(o.sliders);
      o.ratingChange = newRating - o.rating;
      o.rating = newRating;
    }

    //Recolor all of the sliders
    this.recolorSliders();
    for (var i = 0; i < this.sliders.length; i++) {
      this.sliderChange(i);
    }

    //Opponents adjust their sliders
    for (let o of this.opponents) {
      o.shiftSliders();
    }

    //Temp Print
    var tempPop = this.popularity;
    for (let o of this.opponents) {
      tempPop += o.popularity;
    }
    console.log(tempPop);

    //Enabled when we have events ready
    //this.viewEvent();
  }

  viewRules(content) {
    this.modalService.open(content, { size: 'xl' });
  }

  viewEvent() {
    const modalRef = this.modalService.open(EventsComponent, { backdrop: 'static', keyboard: false, size: 'xl' });
    modalRef.componentInstance.limitLeft = this.limitLeft;
    modalRef.componentInstance.limitRight = this.limitRight;
    modalRef.componentInstance.limitSet = this.limitSet;
    modalRef.componentInstance.sliders = this.sliders;
    modalRef.componentInstance.population = this.popularity;
  }

  areLimitsInvalid() {
    return this.invalidLimits.filter(l => l).length
  }

  getLetterRating(rating: number): string {
    return Tools.getRatingString(rating);
  }

  getSlidersRating(sliders) {
    let ideal = [100, 100, 50, 0, 50, 100];
    let weights = [1, 1, 2, 1, 2, 1];
    //Get rating out of 600, with 600 being the lowest
    var rating = sliders.map((s, index) => Math.abs(s - ideal[index]) * weights[index]).reduce((p, c) => p + c);
    //Get out of 100, with 100 being the lowest
    rating = Math.round(rating / 6);
    //Get out of 100, with 100 being the highest
    rating = Math.abs(rating - 100);
    //Mathmatically, currently the highest rating you could get is an 88
    rating = Math.round(rating/88*100);
    return rating;
  }

}
