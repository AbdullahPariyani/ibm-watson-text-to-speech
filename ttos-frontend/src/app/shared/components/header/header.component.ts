import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../../utils/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() isUserOnline: boolean = false;
  constructor() {
  }

  ngOnInit(): void {
  }

}
