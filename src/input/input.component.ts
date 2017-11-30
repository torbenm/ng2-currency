import { Component, Input, Output, ViewChild, HostBinding, OnChanges, EventEmitter, ElementRef, SimpleChanges, OnInit } from '@angular/core';

import { CurrencySymbolSide } from '../model';
import { frac, isString, safeParseString, addThousandsSeparator, isNumeric } from '../utils';

@Component({
    selector: 'currency-input',
    templateUrl: 'input.component.html',
    styles: [`:host {
        display: flex;
        position: relative;
        align-items: center;
    }
    .currency-input {
        width: 100%;
        font-size: inherit;
        font-family: inherit;
    }
    .currency-input-symbol {
        font-size: inherit;
        font-family: inherit;
    }
    :host.currency-left span {
        position: absolute;
        left: 0.3em;   
    }
    :host.currency-right span {
        position: absolute;
        right: 0.3em;   
    }
    :host.currency-left input {
        text-align: left;
        padding-left: 1em;
    }
    :host.currency-right input {
        text-align: right;
        padding-right: 1em;  
    }` ]
})
export class CurrencyInputComponent implements OnChanges, OnInit {

    // -- public variables
    @Input('value') model: number;
    @Input() symbol: string = '€';
    @Input() fractionSize: number = 2;
    @Input() side: CurrencySymbolSide = CurrencySymbolSide.LEFT;
    @Input() inputClass: string = '';

    // -- event emitters

    @Output() valueChange = new EventEmitter<number>();
    @Output('focus') onFocus = new EventEmitter<any>();
    @Output('blur') onBlur = new EventEmitter<any>();
    @Output('keypress') onKeyPress = new EventEmitter<any>();
    @Output('keyup') onKeyUp = new EventEmitter<any>();

    // -- view bindings

    @ViewChild('input') inputField: ElementRef;
    @HostBinding('class') get sideClass() {
        return `currency-${this.side.toString()}`
    }

    // -- private variables
    private hasFocus = false;

    // -- public methods

    constructor() { }

    public ngOnChanges(changes: SimpleChanges) {
        if (!this.hasFocus && ('model' in changes || 'fractionSize' in changes)) {
            this.updateModel(this.model);
            this.displayFormattedModel();
        }
    }

    public ngOnInit() {
        this.displayFormattedModel();
    }

    /**
     * Puts the focus on the input.
     */
    public select() {
        this.inputField.nativeElement.select();
    }

    // -- private methods
    private format(model: number): string {
        return addThousandsSeparator(model.toFixed(this.fractionSize));
    }

    private updateModel(value: number | string) {
        value = isString(value) ? safeParseString(<string>value) : <number>value;
        let newModel = frac(value, this.fractionSize);
        if (newModel !== this.model) {
            this.valueChange.emit(newModel);
            this.model = newModel;
        }
    }

    private displayFormattedModel() {
        this.inputField.nativeElement.value = this.format(this.model);
    }

    // -- event handlers
    private handleKeyUp(event: any) {
        this.updateModel(this.inputField.nativeElement.value);
        this.onKeyUp.emit(event);
    }

    private handleKeyPress(event: any) {
        this.onKeyPress.emit(event);
        return isNumeric(event.key) ||
            (event.key === '.' && this.inputField.nativeElement.value.indexOf('.') === -1);
    }

    private blur(event: any) {
        this.hasFocus = false;
        this.displayFormattedModel();
        this.onBlur.emit(event);
    }

    private focus(event: any) {
        this.hasFocus = true;
        this.inputField.nativeElement.value = this.model;
        this.onFocus.emit(event);
    }
}
