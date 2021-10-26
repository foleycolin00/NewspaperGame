export class Opponent {
  //Info
  name: string;
  localPercent: number;
  nationalPercent: number;
  score: string;

  //Sliders
  sliders: number[] = [50, 50, 50, 50, 50, 50];

  //Ballance - Ranges Will Allow
  slidersLeft: number[] = [0, 0, 0, 0, 0, 0];
  slidersRight: number[] = [100, 100, 100, 100, 100, 100];

  //Ballance - How Quick to Move
  slidersDeltaLeft: number[] = [5, 5, 5, 5, 5, 5];
  slidersDeltaRight: number[] = [5, 5, 5, 5, 5, 5];
}
