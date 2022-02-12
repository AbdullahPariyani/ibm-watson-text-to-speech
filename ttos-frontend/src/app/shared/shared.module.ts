import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonUtilsService } from './utils/common-utils.service';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpService } from './utils/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        HttpClientModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HeaderComponent
    ],
    providers: [
        HttpService,
        CommonUtilsService
    ],
    declarations: [
        HeaderComponent
    ]
})
export class SharedModule { }
