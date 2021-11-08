import { OpponentsComponent } from "../app/opponents/opponents.component";
import { Newspaper } from "./newspaper";
import { Public } from "./public";
import { Tools } from "./tools";

export class Opponent {
  //Info
  name: string;
  focus: number;
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
    o = new Opponent("Opponent 1", 0);
    o.popularity = 10;
    o.sliders = [50, 50, 50, 50, 50, 50];
    opps.push(o)

    //Opponent 1
    //Tabloid
    o = new Opponent("Opponent 2", 3);
    o.popularity = 20;
    o.sliders = [10, 0, 75, 100, 50, 0];
    opps.push(o)

    //Opponent 1
    //Negative National
    o = new Opponent("Opponent 3", 4);
    o.popularity = 5;
    o.sliders = [25, 75, 0, 75, 75, 15];
    opps.push(o)

    //Opponent 1
    //Really good national
    o = new Opponent("Opponent 4", 1);
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
      //Shifts the focus to the right and everything else to the left
      if (this.focus == i) {
        if (this.sliders[i] + this.slidersDeltaRight[i] >= this.slidersRight[i]) {
          this.sliders[i] = Tools.TrimNumber(this.sliders[i] + this.slidersDeltaRight[i] * 2);
        }
      } else {
        if (this.sliders[i] - this.slidersDeltaLeft[i] >= this.slidersLeft[i]) {
          this.sliders[i] = Tools.TrimNumber(this.sliders[i] - this.slidersDeltaLeft[i]);
        }
      }

    }
  }
}
