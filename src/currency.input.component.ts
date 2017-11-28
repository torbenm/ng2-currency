import { CurrencySymbolSide } from './currency.config';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, HostBinding } from '@angular/core';
import { addThousandsSeparator, safeParseString } from './currency.util';
import { isNumeric } from './util';

@Component({
    selector: 'currency-input',
    template: `
        <input  #input 
                class="currency-input"
                (keyup)="handleKeyUp($event)"
                (keypress)="handleKeyPress($event)"
                (focus)="focus($event)"
                (blur)="blur($event)"/>
        <span class="currency-input-symbol currency-input-symbol-right">{{ symbol }}</span>
    `,
    styles: [
        `:host {
            display: flex;
            position: relative;
            align-items: center;
        }`,
        `.currency-input {
            width: 100%;
            font-size: inherit;
            font-family: inherit;
        }`,
        `.currency-input-symbol {
            font-size: inherit;
            font-family: inherit;
        }`,
        `:host.currency-left span {
            position: absolute;
            left: 0.3em;   
        }`,
        `:host.currency-right span {
            position: absolute;
            right: 0.3em;   
        }`,
        `:host.currency-left input {
            text-align: left;
            padding-left: 1em;
        }`,
        `:host.currency-right input {
            text-align: right;
            padding-right: 1em;  
        }`
    ]
})
export class CurrencyInputComponent implements OnInit {

 
    // -- inputs
    @Input('value') set value(newValue: number) {
        if(!this.isFocused) {
            this.inputField.nativeElement.value = this.transformNumber(newValue);
        }
    }
    @Input() symbol: string;
    @Input() fractionSize: number = 2;
    @Input() side: CurrencySymbolSide = CurrencySymbolSide.LEFT; 

    // -- outputs
    @Output() valueChange = new EventEmitter<number>();
    @Output('focus') onFocus = new EventEmitter<any>();
    @Output('blur') onBlur = new EventEmitter<any>();
    @Output('keypress') onKeyPress = new EventEmitter<any>();
    @Output('keyup') onKeyUp = new EventEmitter<any>();

    @ViewChild('input') inputField: ElementRef;   
    @HostBinding('class') get sideClass() {
        return `currency-${this.side.toString()}`
    } 

    // -- private variables
    private isFocused = false;
    private parsedValue: number;

    constructor(){}

    // -- public methods
    public ngOnInit(){}

    public select() {
        this.inputField.nativeElement.select();
    }

    // -- private methods


    private handleKeyPress(event) {
        this.onKeyPress.emit(event);
        return isNumeric(event.key) ||
            (event.key === '.' && this.inputField.nativeElement.value.indexOf('.') === -1);
    }

    private handleKeyUp(event) {
        this.onKeyUp.emit(event);
        this.onChange();
    }

    private onChange() {
        let newParsedValue = safeParseString(this.inputField.nativeElement.value);
        if(newParsedValue != this.parsedValue) {
            this.valueChange.emit(newParsedValue);
            this.parsedValue = newParsedValue;
        }
    }

    private focus(event){
        this.isFocused = true;
        this.inputField.nativeElement.value = safeParseString(this.inputField.nativeElement.value);
        this.onFocus.emit(event);
    }

    private blur(event) {
        this.isFocused = false;
        this.inputField.nativeElement.value =this.transformNumber(this.inputField.nativeElement.value);
        this.onBlur.emit(event);        
    }

    private transformNumber(value: any) {
        return addThousandsSeparator(safeParseString(value).toFixed(this.fractionSize));
    }
}
