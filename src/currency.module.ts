import { CurrencyPipe } from './currency.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyInputComponent } from './currency.input.component';

let publicComponents = [
    CurrencyPipe,
    CurrencyInputComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ...publicComponents
    ],
    exports: [
        ...publicComponents
    ]
})
export class CurrencyModule { }