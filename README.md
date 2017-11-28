# Angular 2+ Currency Directives

Directives that support currencies.

## Currency Pipe

### Usage
```
 {{ value | currency:SYMBOL:SIDE:DIGITS:GAP}}
```

with
```
    SYMBOL      The symbol for the currency, e.g. €, $, etc.
    SIDE        'left' or 'right', depending on what side to add the currency symbol to, default 'left'
    DIGITS      The number of digits after the decimal point, default 2
    GAP         The content between the currency and the value, default ' '
```

### Example
```
 {{ 1234.12312 | currency:'€':'right':2:' '}}
```

will output
```
1,234.12 €
```