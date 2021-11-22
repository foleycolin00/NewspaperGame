import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { OpponentsComponent } from '../opponents/opponents.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @ViewChild('loadingModal', { static: true }) loadingModal: TemplateRef<any>;
  //Ignore any warnings from here
  @Input() public limitRight: number[]
  @Input() public limitLeft: number[]
  @Input() public limitSet: number[]
  @Input() public sliders: number[]
  @Input() public popularity: number
  @Input() public storylines: number[]
  @Input() public usedEvents: string[]

  events: any[]

  chosenEvent: any

  constructor(public activeModal: NgbActiveModal, private httpClient: HttpClient, private modalService: NgbModal) { }

  compatibleEvent(e: any): boolean {
    if (e.storyNo != null && e.storySeq != this.storylines[e.storyNo]) {
      return false;
    }
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
    //Load the events
    let loadingModal = this.modalService.open(this.loadingModal, { backdrop: 'static', keyboard: false});

    this.httpClient.get("assets/paper_events.json").subscribe(data => {
      this.events = data as any;
      //Choose an event
      //could be based on the sliders, or public
      let compatibleEvents = this.events.filter(e => this.usedEvents.filter(f => f == e.title).length == 0 && this.compatibleEvent(e));
      this.chosenEvent = compatibleEvents[Math.floor(Math.random() * (compatibleEvents.length))];
      //Remove the event
      this.usedEvents.push(this.chosenEvent.title)

      loadingModal.close();
    });
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
    for (let o of OpponentsComponent.opponents) {
      o.popularity -= choice.popChange / OpponentsComponent.opponents.length;
    }
    //pass the results
    this.activeModal.close(choice.popChange);
  }
}
