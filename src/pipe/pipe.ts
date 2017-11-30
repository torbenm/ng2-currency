import { Pipe, PipeTransform } from '@angular/core';
import { CurrencySymbolSide } from '../model';
import { removeThousandsSeperator, addThousandsSeparator, safeParseString, isString } from '../utils';

@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {

    /**
     * Appends or prepends the currency symbol to the value and formats it 
     * to include thousands separators and the defined number of fractions.
     * 
     * Example:
     * ```
     *  {{ 1234.12312 | currency:'€':'right':2:' '}}
     * ```
     * will output
     * ```
     * 1,234.12 €
     * ```
     * @param value The amount
     * @param symbol The symbol for the currency, e.g. €
     * @param side The side, either 'left' or 'right'
     * @param fractionSize The number of digits after the decimal point
     * @param gap The characters between the value and the currency symbol.
     */
    public transform(value: number | string,
        symbol = '$',
        side = CurrencySymbolSide.LEFT,
        fractionSize = 2,
        gap = ' '): string {

        let numberValue: number = isString(value) ? safeParseString(<string>value) : <number>value;
        let stringValue = addThousandsSeparator(numberValue.toFixed(fractionSize));
        console.log(stringValue);
        return this.embeddInCurrencySymbol(stringValue, symbol, side, gap);
    }


    private embeddInCurrencySymbol(value: string, symbol: string, side: CurrencySymbolSide, gap: string) {
        return side === CurrencySymbolSide.LEFT ?
            `${symbol}${gap}${value}` : `${value}${gap}${symbol}`;
    }

}