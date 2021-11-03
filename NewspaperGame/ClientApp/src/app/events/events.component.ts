import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  @Input() public limitRight: number[];
  @Input() public limitLeft: number[];
  @Input() public limitSet: number[];
  @Input() public sliders: number[];
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  passBack() {
    this.passEntry.emit({ limitLeft: this.limitLeft, limitRight: this.limitRight, limitSet: this.limitSet, sliders: this.sliders });
    this.activeModal.close({ limitLeft: this.limitLeft, limitRight: this.limitRight, limitSet: this.limitSet, sliders: this.sliders });
  }
}
