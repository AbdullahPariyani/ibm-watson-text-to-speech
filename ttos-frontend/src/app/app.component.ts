import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { TextToSpeech } from './shared/interface/textToSpeech';
import { HttpService } from './shared/utils/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Ahoy Text To Speech';
  listLoaded = false;
  isUserOnline = true;
  speechData: any = [];

  constructor(private http: HttpService) {
    this.getTextToSpeechList();
    fromEvent(window, 'online').subscribe((resp: any) => {
      this.isUserOnline = true;
    });
    fromEvent(window, 'offline').subscribe((resp: any) => {
      this.isUserOnline = false;
    });
  }

  getTextToSpeechList() {
    this.http.httpGet('TextToSpeech/').subscribe((value: TextToSpeech) => {
      this.listLoaded = true;
      this.speechData = value;
    });
  }

}
