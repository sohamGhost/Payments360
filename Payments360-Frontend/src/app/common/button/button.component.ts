import { Component, Input,Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'p360-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() data = '';
  @Input() amount = '';
  @Input() recipient = '';
  @Input() type = '';
  @Input() disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
