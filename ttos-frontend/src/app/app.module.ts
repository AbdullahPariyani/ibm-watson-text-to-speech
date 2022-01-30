import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TextToSpeechTableComponent } from './text-to-speech-table/text-to-speech-table.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component';

@NgModule({
  declarations: [
    AppComponent,
    TextToSpeechTableComponent,
    TextToSpeechComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
