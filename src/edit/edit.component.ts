import { Component, Input, Output, ViewChild, HostBinding, EventEmitter, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { CurrencySymbolSide } from '../model';
import { CurrencyInputComponent } from '../input';

@Component({
    selector: 'currency-edit',
    templateUrl: 'edit.component.html',
    styles: [`:host {
        display: block;   
    }`]
})
export class CurrencyEditComponent implements OnInit, OnChanges {

    // -- value
    @Input() value: number;
    @Output() valueChange = new EventEmitter<number>();
    private tempValue: number;

    // -- editing
    @Input() editing: boolean = false;
    @Output() editingChange = new EventEmitter<boolean>();

    // -- display inputs
    @Input() gap: string = ' ';
    @Input() fractionSize: number = 2;
    @Input() symbol: string = '€';
    @Input() side: CurrencySymbolSide = CurrencySymbolSide.LEFT;
    @Input() inputClass: string = '';

    // -- editing options
    @Input() autoEnabled: boolean = true;
    @Input() saveKey: string = 'enter';
    @Input() cancelKey: string = 'escape';

    // -- editing events
    @Output('save') onSave = new EventEmitter<number>();
    @Output('cancel') onCancel = new EventEmitter<number>();

    // -- input events
    @Output('focus') onFocus = new EventEmitter<any>();
    @Output('blur') onBlur = new EventEmitter<any>();
    @Output('keypress') onKeyPress = new EventEmitter<any>();
    @Output('keyup') onKeyUp = new EventEmitter<any>();

    @ViewChild('input') private inputChild: CurrencyInputComponent;


    // -- public methods
    constructor() { }

    public ngOnInit() {
        this.tempValue = this.value;
    }

    public ngOnChanges(changes: SimpleChanges) {
        if(!this.editing && 'value' in changes) {
            this.tempValue = this.value;
        }
    }

    public cancel() {
        if (this.editing) {
            this.editing = false;
            this.value = this.tempValue;
        }
    }

    public save() {
        if (this.editing) {
            this.editing = false;
            this.tempValue = this.value;
        }
    }

    // -- private methods

    private handleDoubleClick() {
        if (this.autoEnabled) {
            this.editing = true;
            this.editingChange.emit(this.editing);
            setTimeout(() => {
                this.inputChild.select();
            });
        }
    }

    private handleKeyUp(event) {
        if (this.autoEnabled) {
            if (event.code.toLowerCase() === this.saveKey) {
                this.save();
                this.editingChange.emit(this.editing);                
                this.onSave.emit(this.value);
            } else if (event.code.toLowerCase() === this.cancelKey) {
                this.cancel();
                this.editingChange.emit(this.editing);
                this.valueChange.emit(this.value);                
                this.onCancel.emit();
            }
        }
        this.forward('onKeyUp', event);
    }

    private forward(emitter, data) {
        this[emitter].emit(data);
    }

}
