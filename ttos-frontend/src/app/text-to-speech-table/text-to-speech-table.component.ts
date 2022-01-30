import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonUtilsService } from '../shared/utils/common-utils.service';
import { HttpService } from '../shared/utils/http.service';

@Component({
  selector: 'app-text-to-speech-table',
  templateUrl: './text-to-speech-table.component.html',
  styleUrls: ['./text-to-speech-table.component.scss']
})
export class TextToSpeechTableComponent implements OnInit {

  listLoaded = false;
  speechURL: any = [];

  constructor(private http: HttpService, private commonUtils: CommonUtilsService) {
    this.getTextToSpeechList();
  }

  ngOnInit(): void {
    this.commonUtils.reloadHistoryList$.subscribe(value => {
      if (value) {
        this.getTextToSpeechList();
        this.commonUtils.reloadHistoryList$.next(false);
      }
    });
  }

  getTextToSpeechList() {
    this.http.httpGet('TextToSpeech/').subscribe((value) => {
      this.listLoaded = true;
      this.speechURL = value;
      this.commonUtils.textToSpeechList = value;
    });
  }

}
