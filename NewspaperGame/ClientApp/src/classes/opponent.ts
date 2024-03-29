import { OpponentsComponent } from "../app/opponents/opponents.component";
import { Newspaper } from "./newspaper";
import { Public } from "./public";
import { Tools } from "./tools";

export class Opponent {
  //Info
  name: string;
  focus: number[];
  popularity: number;
  popChange: number = 0;
  rating: number;
  ratingChange: number = 0;

  //Sliders
  //Index explanation:
  //0 = Journalism, 1 = Content, 2 = Tone, 3 = Sensationalism
  //4 = Nationalization, 5 = Syndication
  sliders: number[] = [50, 50, 50, 50, 50, 50];

  //Balance - Ranges Will Allow
  slidersLeft: number[] = [0, 0, 0, 0, 0, 0];
  slidersRight: number[] = [100, 100, 100, 100, 100, 100];

  //Balance - How Quick to Move
  slidersDeltaLeft: number[] = [5, 5, 5, 5, 5, 5];
  slidersDeltaRight: number[] = [5, 5, 5, 5, 5, 5];

  constructor(name, focus) {
    this.name = name
    //Same explanation as slider index
    this.focus = focus
  }

  static generateOpponents(): Opponent[]{
    var opps = []
    var o;

    //Opponent 1
    //Classic local
    o = new Opponent("The Raleigh Times", [0, 1, 2]);
    o.popularity = 10;
    o.sliders = [60, 60, 60, 45, 40, 40];
    o.rating = 90
    opps.push(o)

    //Opponent 1
    //Tabloid
    o = new Opponent("Entertainment News", [2, 3, 4]);
    o.popularity = 20;
    o.sliders = [40, 40, 55, 60, 55, 40];
    o.rating = 76
    opps.push(o)

    //Opponent 1
    //Negative National
    o = new Opponent("Angry Rant News", [3, 4, 5]);
    o.popularity = 10;
    o.sliders = [45, 45, 50, 60, 60, 60];
    o.rating = 60
    opps.push(o)

    //Opponent 1
    //Really good national
    o = new Opponent("National Press", [0, 1, 4]);
    o.popularity = 20;
    o.sliders = [60, 60, 40, 40, 60, 40];
    o.rating = 98
    opps.push(o)

    OpponentsComponent.opponents = opps;

    return opps;
  }

  generatePaper(date): Newspaper {
    return new Newspaper(date, this.sliders);
  }

  shiftSliders(): void {
    //Colin's Original Way
    for (let i = 0; i < this.sliders.length; i++) {
      //Will shift this slider randomly based on shiftSliderPercentage
      //Randomly shift left vs right
      //Might change this later to "smarter" AI
      if (this.sliders[i] > Public.slidersRight[i]) {
        if (this.sliders[i] - this.slidersDeltaLeft[i] >= this.slidersLeft[i]) {
          this.sliders[i] = Tools.TrimNumber(this.sliders[i] - this.slidersDeltaLeft[i]);
        }
      } else if (this.sliders[i] < Public.slidersLeft[i]) {
        if (this.sliders[i] + this.slidersDeltaRight[i] >= this.slidersRight[i]) {
          this.sliders[i] = Tools.TrimNumber(this.sliders[i] + this.slidersDeltaRight[i]);
        }
      } else if (Math.random() < .5) {
        this.sliders[i] = Tools.TrimNumber(this.sliders[i] - this.slidersDeltaLeft[i]);
      } else {
        this.sliders[i] = Tools.TrimNumber(this.sliders[i] + this.slidersDeltaRight[i]);
      }

    }

    //New Way
    /*for (let i = 0; i < this.sliders.length; i++) {
      //Shifts the focus to the right and everything else to the left
      //Use the rating method to see what the rating would be.
      //Check what the rating would be for every change in sliders
      //Maximize the focus slider, so assuming you increase that one, what other options would increase your score?
      //loop through every option change for every slider, maybe by 5 or 10
      
      if (this.focus.includes(i)) {
        console.log(this.sliders[i] + this.slidersDeltaRight[i]);
        if (this.sliders[i] + this.slidersDeltaRight[i] <= this.slidersRight[i]) {
          this.sliders[i] = Tools.TrimNumber(this.sliders[i] + this.slidersDeltaRight[i]);
        }
      } else {
        if (this.sliders[i] - this.slidersDeltaLeft[i] >= this.slidersLeft[i]) {
          this.sliders[i] = Tools.TrimNumber(this.sliders[i] - this.slidersDeltaLeft[i]);
        }
      }

    }
    //this.sliders = this.abMax(this.sliders, 6, 0)[0]
    console.log(this.name + ": " + this.sliders);*/
  }

  //private abMax(opponentSliders, maxDepth=6, currentDepth): [number[], number] {
  //  //If we are on the have evaluated all the sliders, return the rating
  //  if (currentDepth == maxDepth) {
  //    return [opponentSliders, this.getSlidersRating(opponentSliders)];
  //  }

  //  //Follow what our best slider config is and what our best popularity number is
  //  let bestSliders = null;
  //  let bestPopularity = -Infinity;
  //  const possibleMoves = [-5, -10, -15, 5, 10, 15];
  //  let index = 0
  //  //If this slider is the opponents focus, then only allow it to go forward
  //  if (currentDepth == this.focus) {
  //    index = 3
  //  }
  //  //Run through every possible move of the slider from 5,10,15,-5,-10,-15
  //  for (let i = index; i < possibleMoves.length; i++) {
  //    //Add this possible move to the sliders
  //    let newSliders = opponentSliders;
  //    newSliders[currentDepth] = Math.min(newSliders[currentDepth] + possibleMoves[i], 100);
  //    //Run the method again with this new change implemented
  //    let [recurseSliders, currentPopularity] = this.abMax(newSliders, maxDepth, currentDepth + 1);

  //    //Check if this move improved the sliders
  //    if (currentPopularity > bestPopularity) {
  //      bestPopularity = currentPopularity;
  //      bestSliders = recurseSliders;
  //    }

  //  }
  //  return [bestSliders, bestPopularity];
  //}

  //private getSlidersRating(sliders) {
  //  let ideal = [100, 100, 50, 0, 50, 100];
  //  let weights = [1, 1, 2, 1, 2, 1];
  //  //Get rating out of 600, with 600 being the lowest
  //  var rating = sliders.map((s, index) => Math.abs(s - ideal[index]) * weights[index]).reduce((p, c) => p + c);
  //  //Get out of 100, with 100 being the lowest
  //  rating = Math.round(rating / 6);
  //  //Get out of 100, with 100 being the highest
  //  rating = Math.abs(rating - 100);
  //  //Mathmatically, currently the highest rating you could get is an 88
  //  rating = Math.round(rating / 88 * 100);
  //  return rating;
  //}
}
