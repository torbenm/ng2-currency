import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyInputComponent } from './input';
import { CurrencyPipe } from './pipe';
import { CurrencyEditComponent } from './edit';

let publicComponents = [
    CurrencyPipe,
    CurrencyInputComponent,
    CurrencyEditComponent
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