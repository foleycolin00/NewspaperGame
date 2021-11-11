import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OpponentsComponent } from '../opponents/opponents.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  //Ignore any warnings from here
  @Input() public limitRight: number[];
  @Input() public limitLeft: number[];
  @Input() public limitSet: number[];
  @Input() public sliders: number[];
  @Input() public popularity: number;

  events: any[]

  /*eventsTemp: any[] = [
    {
      title: "This is an event title",
      description: "description",
      triggers: [
        {
          index: 0,
          rangeMin: 0,
          rangeMax: 100
        }
      ],
      choices: [
        {
          title: "choice1",
          description: "description1",
          effectDesc: "effectDescription1",
          impact: {
            index: 0,
            limits: [null, null, 50]//limits left right and set
          }
        },
        {
          title: "choice2",
          description: "description2",
          effectDesc: "effectDescription2",
          impact: {
            index: 0,
            limits: [null, null, 0]//limits left right and set
          }
        },
        {
          title: "choice3",
          description: "description3",
          effectDesc: "effectDescription3",
          impact: {
            index: 0,
            limits: [null, 100, null]//limits left right and set
          }
        }
      ]
    }
  ]*/

  eventsTemp = [{
  title: "County Fair",
    description: "The local county fair is this week! Would you be able to cover some of the festivities? -The Mayor",
      triggers: [ //An array of the triggers, there does not need to be any triggers for this, so if it is a general event leave it blank, but it could be triggered if a certain slider is in a certain range ir parent reacting to news is too negative
        {
          index: 0, //index of the slider, JOURNALISM is 0, content is 1, etc
          rangeMin: 0, //range for everything is 0-100
          rangeMax: 100
        },
      ],
        choices: [ //You can have between 1 (a forced choice) and 3 choices in this array
          {
            title: "Cover the Fair",
            description: "You decide to cover the fair in its entirety for the good of the town.",
            effectDesc: "Your popularity will increased by 10%, content will be limited to below 25 and your nationalization will be set to 0.",
            impacts: [
              {
                index: 4,
                limits: [null, null, 0]//limits left right and set (set is the value HAS to be that exact value)
              },
              {
                index: 1,
                limits: [null, 25, null]//limits left right and set (set is the value HAS to be that exact value)
              }
            ],
	          popChange: 10 //10% increase popularity
          },
          {
            title: "Don't cover the fair",
            description: "You decide that there are better things to do than to cover the fair, but there are no local stories to cover in the meantime.",
            effectDesc: "Your popularity will decrease by 20% and your nationalization will be set to 100.",
            impacts: [
              {
                index: 4,
                limits: [null, null, 100]//limits left right and set
              }
            ],
	          popChange: -20 //10% increase popularity
          }
        ]
}]

  chosenEvent: any

  constructor(public activeModal: NgbActiveModal) { }

  compatibleEvent(e: any): boolean {
    e.triggers.forEach((trigger) => {
      if (this.sliders[trigger.index] < trigger.rangeMin) {
        return false;
      } else if (this.sliders[trigger.index] > trigger.rangeMax) {
        return false;
      }
    });
    return true;
  }

  ngOnInit() {
    //TODO:
    //Load the events
    this.events = this.eventsTemp;
    //Choose an event
    //could be based on the sliders, or public
    let compatibleEvents = this.events.filter(e => this.compatibleEvent(e));
    this.chosenEvent = compatibleEvents[Math.floor(Math.random() * (compatibleEvents.length))];
    //Remove the event
    this.events = this.events.filter(e => e.title != this.chosenEvent.title);
  }

  choiceMade(choiceIndex: number) {
    //Get the choices
    let choice = this.chosenEvent.choices[choiceIndex];
    let impacts = choice.impacts;
    //Change the limits
    for (let impact of impacts) {
      if (impact.limits[0] != null) {
        this.limitLeft[impact.index] = impact.limits[0];
      }
      if (impact.limits[1] != null) {
        this.limitRight[impact.index] = impact.limits[1];
      }
      if (impact.limits[2] != null) {
        this.limitSet[impact.index] = impact.limits[2];
        this.sliders[impact.index] = impact.limits[2];
      }
    }
    
    //Invoke the pop changes
    console.log(this.popularity)
    console.log(choice.popChange)
    this.popularity += choice.popChange;
    for (let o of OpponentsComponent.opponents) {
      o.popularity += choice.popChange / OpponentsComponent.opponents.length;
    }
    //pass the results
    this.activeModal.close();
  }
}
