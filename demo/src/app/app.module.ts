import { IntroComponent } from './intro/intro.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CurrencyModule } from '../../../index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CurrencyModule
    ],
    declarations: [
        AppComponent,
        IntroComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule{ }