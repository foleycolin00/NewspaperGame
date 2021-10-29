import { Newspaper } from "./newspaper";

export class Opponent {
  //Info
  name: string;
  localPopularity: number;
  nationalPopularity: number;
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
    o.localPopularity = 50;
    o.nationalPercent = 5;
    o.sliders = [50, 50, 50, 50, 50, 50];
    opps.push(o)

    //Opponent 1
    //Tabloid
    o = new Opponent("Opponent 2");
    o.localPopularity = 15;
    o.nationalPercent = 25;
    o.sliders = [10, 0, 75, 100, 50, 0];
    opps.push(o)

    //Opponent 1
    //Negative National
    o = new Opponent("Opponent 3");
    o.localPopularity = 5;
    o.nationalPercent = 30;
    o.sliders = [25, 75, 0, 75, 75,15];
    opps.push(o)

    //Opponent 1
    //Really good national
    o = new Opponent("Opponent 4");
    o.localPopularity = 0;
    o.nationalPercent = 40;
    o.sliders = [100, 100, 0, 50, 100,0];
    opps.push(o)

    return opps;
  }

  generatePaper(date): Newspaper {

    //TODO Opponent AI

    return new Newspaper(date, this.sliders);
  }
}
