import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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

  events: any[]

  eventsTemp: any[] = [
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
  ]

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
    let impact = choice.impact;
    //Change the limits
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
    //pass the results
    this.activeModal.close();
  }
}
