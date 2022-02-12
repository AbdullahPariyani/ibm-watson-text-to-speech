import { Component } from '@angular/core';
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
  speechData: any = [];

  constructor(private http: HttpService) {
    this.getTextToSpeechList();
  }

  getTextToSpeechList() {
    this.http.httpGet('TextToSpeech/').subscribe((value: TextToSpeech) => {
      this.listLoaded = true;
      this.speechData = value;
    });
  }

}
