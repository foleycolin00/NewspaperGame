export class Newspaper {

  date: Date;

  //Sliders
  //fakenews, content, tone, clickbait, nationalization, profit
  sliders: number[];

  constructor(date, sliders) {
    this.date = date;
    this.sliders = sliders;
  }
}
