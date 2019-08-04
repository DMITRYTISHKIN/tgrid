import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tgrid-overlay',
  templateUrl: './tgrid-overlay.component.html',
  styleUrls: ['./tgrid-overlay.component.scss']
})
export class TgridOverlayComponent implements OnInit {
  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onClick(e: MouseEvent): void {
    this.click.emit(e);
  }

}
