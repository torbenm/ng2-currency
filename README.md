# Angular Currency Directives

Directives that support currencies.

Check out the demo: https://torbenm.github.io/ng2-currency/

## Getting started

### Installation

First, install the package via npm:

```
npm install --save ng2-currency
```

Then import it in your module:

```typescript
...
import { CurrencyModule } from 'n2-currency';

@NgModule({
    imports: [
        ...,
        CurrencyModule
    ],
    ...
})
export class AppModule{ }
```

## Currency Input

Allows you to edit the value of a currency.

### Usage
```html
<currency-input 
    [(value)]="value" 
    [symbol]="symbol" 
    [fractionSize]="fractionSize" 
    [side]="side" 
    [inputClass]="inputClass"
    (keyup)="onKeyUp($event)"
    (keypress)="onKeyPress($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    >
</currency-input>
```
The following inputs:


- **value**         The value to display
- **symbol**        The symbol for the currency, e.g. `'€'`, `'$'`, etc (default: '€').
- **side**          The side of the value to display the currency, can be `'left'` or `'right'` (default: `'left'`)
- **fractionSize**  The number of digits to display after the decimal point (default: `2`)
- **inputClass**    The class to add to the `<input>`. (default: '')

The following outputs/events:

- **value**         Fired on value change of the input
- **keyup**         Fired on key up in the input
- **keypress**      Fired on key pres in the input
- **blur**          Fired on loss of focus of the input
- **focus**         Fired on focus of the input


The following public methods:

- `select()`        Puts the focus on the input

### Example
```html
<currency-input [(value)]="value" symbol="$" inputClass="form-control"></currency-input>
```

Here, the value of `inputClass` makes it work with the styling of bootstrap.


## Currency Edit

Allows you to dynamically jump between editing and viewing a value.

### Usage
```html
<currency-edit 
    [(editing)]="editing"
    [(value)]="value" 
    [symbol]="symbol" 
    [fractionSize]="fractionSize" 
    [side]="side" 
    [gap]="gap"
    [inputClass]="inputClass"
    [autoEnabled]="autoEnabled"
    [saveKey]="saveKey"
    [cancelKey]="cancelKey"
    (keyup)="onKeyUp($event)"
    (keypress)="onKeyPress($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    (save)="save()"
    >
</currency-input>
```
The following inputs:

- **value**         The value to display
- **symbol**        The symbol for the currency, e.g. `'€'`, `'$'`, etc (default: '€').
- **side**          The side of the value to display the currency, can be `'left'` or `'right'` (default: `'left'`)
- **fractionSize**  The number of digits to display after the decimal point (default: `2`)
- **inputClass**    The class to add to the `<input>`. (default: `''`)
- **editing**       Whether or not the editing mode is active (default: `false`)
- **gap**           For viewing the value. The gap between the value and the currency symbol (default: `' '`)
- **autoEnabled**   Whether automatic jumping between editing and viewing through double click + keyboard shortcuts is enabled (default: `true`)
- **saveKey**       The key to use for automatic saving (default: `'enter'`)
- **cancelKey**       The key to use for automatic saving (default: `'escape'`)

The following outputs/events:

- **value**         Fired on value change of the input
- **keyup**         Fired on key up in the input
- **keypress**      Fired on key pres in the input
- **blur**          Fired on loss of focus of the input
- **focus**         Fired on focus of the input
- **save**          Fired when editing was confirmed
- **cancel**        Fired when editing was canceled

The following public methods:

- `save()`          Confirms the editing
- `cancel()`        Cancels the editing



## Currency Pipe

### Usage
```
 {{ value | currency:symbol:side:fractions:gap}}
```

- **symbol**    The symbol for the currency, e.g. `'€'`, `'$'`, etc.
- **side**      The side of the value to display the currency, can be `'left'` or `'right'` (default: `'left'`)
- **fractions** The number of digits to display after the decimal point (default: `2`)
- **gap**       The characters to display between the value and the currency symbol (default: `' '`)

### Example
```html
 {{ 1234.12312 | currency:'€':'right':2:' '}}
```

will output
```
1,234.12 €
```
