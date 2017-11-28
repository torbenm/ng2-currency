import { CurrencyPipe } from './currency.pipe';
import { NgModule } from "@angular/core";

let publicComponents = [
    CurrencyPipe
];

@NgModule({
    declarations: [
        ...publicComponents
    ],
    exports: [
        ...publicComponents
    ]
})
export class CurrencyModule {
}