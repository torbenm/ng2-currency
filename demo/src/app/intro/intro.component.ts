import { Component } from '@angular/core';

@Component({
    selector: 'intro',
    templateUrl: 'intro.component.html',
    styleUrls: [ 'intro.component.css' ]
})
export class IntroComponent {

    private currencyValue = 1000.23;
    private currencySide = 'left';
    private currencySymbol = '€';
    private fractionSize = 2;

    constructor(){}
    
}