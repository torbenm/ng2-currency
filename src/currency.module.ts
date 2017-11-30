import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyInputComponent } from './input';
import { CurrencyPipe } from './pipe';

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