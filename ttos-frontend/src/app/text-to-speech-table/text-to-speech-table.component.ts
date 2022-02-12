import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-text-to-speech-table',
  templateUrl: './text-to-speech-table.component.html'
})
export class TextToSpeechTableComponent {

  @Input() speechData: any = [];
  @Input() listLoaded: boolean = false;
  @Output() refreshList = new EventEmitter();

  constructor() {
  }

  getTextToSpeechList() {
    this.refreshList.emit(true);
  }

}
