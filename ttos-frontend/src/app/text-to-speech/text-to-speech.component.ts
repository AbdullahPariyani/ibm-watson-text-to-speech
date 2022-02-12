import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TextToSpeech } from '../shared/interface/textToSpeech';
import { HttpService } from '../shared/utils/http.service';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html'
})
export class TextToSpeechComponent {

  searchForm: FormGroup;
  formSubmitted: boolean = false;

  @Input() speechData: any = [];
  @Output() refreshList = new EventEmitter();

  validationMessages: any = {
    title: {
      required: 'Title is Required.',
      maxlength: 'Title cannot be more than 50 characters long'
    }
  }

  constructor(private http: HttpService, private toast: ToastrService) {
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

    if (this.speechData) {
      const index = this.speechData.findIndex((data: TextToSpeech) => data.title.toLowerCase().trim() == this.searchForm.value.title.toLowerCase().trim());
      if (index !== -1) {
        this.toast.info("", 'Search text already available in the list, Playing your search result');
        this.formSubmitted = false;
        this.playAudio(this.speechData[index].speechURL);
        return false;
      }
    }

    this.http.httpPost('TextToSpeech/', this.searchForm.value).subscribe((value: TextToSpeech) => {
      this.toast.success("Success", 'Playing your searched result');
      this.playAudio(value.speechURL);
      this.formSubmitted = false;
      this.refreshList.emit(true);
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
