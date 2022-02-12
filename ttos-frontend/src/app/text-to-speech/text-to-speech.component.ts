import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonUtilsService } from '../shared/utils/common-utils.service';
import { HttpService } from '../shared/utils/http.service';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html'
})
export class TextToSpeechComponent {

  searchForm: FormGroup;
  savedAudioData: any = [];
  formSubmitted: boolean = false;

  validationMessages: any = {
    title: {
      required: 'Title is Required.',
      maxlength: 'Title cannot be more than 50 characters long'
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

  onSubmit(form: FormGroup) {
    if (!this.searchForm.valid) {
      return false;
    }
    this.formSubmitted = true;
    this.savedAudioData = [];

    if (this.commonUtils.textToSpeechList) {
      const index = this.commonUtils.textToSpeechList.findIndex((data: any) => data.title.toLowerCase().trim() == this.searchForm.value.title.toLowerCase().trim());
      if (index !== -1) {
        this.commonUtils.showInfo("", 'Search text already available in the list, Playing your search result');
        this.formSubmitted = false;
        this.savedAudioData = this.commonUtils.textToSpeechList[index];
        this.playAudio(this.savedAudioData.speechURL);
        return false;
      }
    }
    this.http.httpPost('TextToSpeech/', this.searchForm.value).subscribe((value) => {
      this.commonUtils.showSuccess("Success", 'Playing your searched result');
      this.savedAudioData = value;
      console.log(typeof this.savedAudioData.speechURL);
      this.playAudio(this.savedAudioData.speechURL);
      this.formSubmitted = false;
      this.commonUtils.reloadHistoryList$.next(true);
    });
  }

  onClear() {
    this.searchForm.reset();
  }

  private playAudio(audioData: any) {
    const music = new Audio(audioData);
    music.play();
  }

}
