import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  constructor() { }

  @Input()
  title: string

  @Input()
  buttonText: string

  @Output()
  buttonClick = new EventEmitter()

  ngOnInit(): void {
  }

}
