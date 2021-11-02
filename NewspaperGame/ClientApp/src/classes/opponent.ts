import { OpponentsComponent } from "../app/opponents/opponents.component";
import { Newspaper } from "./newspaper";
import { Public } from "./public";
import { Tools } from "./tools";

export class Opponent {
  //Percentage Changes
  shiftSliderPercentage = 1

  //Info
  name: string;
  popularity: number;
  popDelta: number = 0;
  score: string;

  //Sliders
  sliders: number[] = [50, 50, 50, 50, 50, 50];

  //Ballance - Ranges Will Allow
  slidersLeft: number[] = [0, 0, 0, 0, 0, 0];
  slidersRight: number[] = [100, 100, 100, 100, 100, 100];

  //Ballance - How Quick to Move
  slidersDeltaLeft: number[] = [5, 5, 5, 5, 5, 5];
  slidersDeltaRight: number[] = [5, 5, 5, 5, 5, 5];

  constructor(name) {
    this.name = name
  }

  static generateOpponents(): Opponent[]{
    var opps = []
    var o;

    //Opponent 1
    //Classic local
    o = new Opponent("Opponent 1");
    o.popularity = 10;
    o.sliders = [50, 50, 50, 50, 50, 50];
    opps.push(o)

    //Opponent 1
    //Tabloid
    o = new Opponent("Opponent 2");
    o.popularity = 15;
    o.sliders = [10, 0, 75, 100, 50, 0];
    opps.push(o)

    //Opponent 1
    //Negative National
    o = new Opponent("Opponent 3");
    o.popularity = 5;
    o.sliders = [25, 75, 0, 75, 75,15];
    opps.push(o)

    //Opponent 1
    //Really good national
    o = new Opponent("Opponent 4");
    o.popularity = 40;
    o.sliders = [100, 100, 0, 50, 100,0];
    opps.push(o)

    OpponentsComponent.opponents = opps;

    return opps;
  }

  generatePaper(date): Newspaper {
    return new Newspaper(date, this.sliders);
  }

  shiftSliders(): void {
    for (let i = 0; i < this.sliders.length; i++) {
      //Will shift this slider randomly based on shiftSliderPercentage
      if (Math.random() < this.shiftSliderPercentage) {
        //Randomly shift left vs right
        //Might change this later to "smarter" AI
        if (this.sliders[i] > Public.slidersRight[i]) {
          if (this.sliders[i] - this.slidersDeltaLeft[i] >= this.slidersLeft[i]) {
            this.sliders[i] = Tools.TrimNumber(this.sliders[i] - this.slidersDeltaLeft[i]);
          }
        } else if (this.sliders[i] < Public.slidersLeft[i]){
          if (this.sliders[i] + this.slidersDeltaRight[i] >= this.slidersRight[i]) {
            this.sliders[i] = Tools.TrimNumber(this.sliders[i] + this.slidersDeltaRight[i]);
          }
        }
      }
    }
  }
}
