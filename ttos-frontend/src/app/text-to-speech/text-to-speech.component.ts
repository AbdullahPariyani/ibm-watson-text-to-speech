import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonUtilsService } from '../shared/utils/common-utils.service';
import { HttpService } from '../shared/utils/http.service';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html'
})
export class TextToSpeechComponent implements OnInit {

  searchForm: FormGroup;
  savedAudioData: any = [];
  sameResultFound: boolean = false;
  formSubmitted: boolean = false;

  validationMessages: any = {
    'title': {
      'required': 'Title is Required.',
      'maxlength': 'Title cannot be more than 50 characters long'
    }
  }

  constructor(private http: HttpService, private commonUtils: CommonUtilsService) {
    this.searchForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
      ])
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup) {
    if (!this.searchForm.valid) {
      return false;
    }
    this.formSubmitted = true;
    this.savedAudioData = [];

    if (this.commonUtils.textToSpeechList) {
      const index = this.commonUtils.textToSpeechList.findIndex((data: any) => data.title.toLowerCase().trim() == this.searchForm.value.title.toLowerCase().trim());
      if (index !== -1) {
        this.sameResultFound = true;
        this.formSubmitted = false;
        this.savedAudioData = this.commonUtils.textToSpeechList[index];
        var music = new Audio(this.savedAudioData.speechURL);
        music.play();
        this.onClear();
        return false;
      }
    }
    this.http.httpPost('TextToSpeech/', this.searchForm.value).subscribe((value) => {
      this.savedAudioData = value;
      var music = new Audio(this.savedAudioData.speechURL);
      music.play();
      this.formSubmitted = false;
      this.commonUtils.reloadHistoryList$.next(true);
      this.sameResultFound = false;
    });
  }

  onClear() {
    this.searchForm.reset();
  }

}
