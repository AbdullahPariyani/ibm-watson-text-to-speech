import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextToSpeechTableComponent } from './text-to-speech-table.component';

describe('TextToSpeechTableComponent', () => {
  let component: TextToSpeechTableComponent;
  let fixture: ComponentFixture<TextToSpeechTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextToSpeechTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextToSpeechTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
