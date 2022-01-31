import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonUtilsService {
  public reloadHistoryList$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public textToSpeechList: any = [];
  constructor(private toast: ToastrService) { }

  showSuccess(message: string, title: string) {
    this.toast.success(message, title)
  }

  showError(message: string, title: string) {
    this.toast.error(message, title)
  }

  showInfo(message: string, title: string) {
    this.toast.info(message, title)
  }
}
