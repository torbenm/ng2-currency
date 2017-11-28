import { Pipe, PipeTransform } from '@angular/core';
import { CurrencySymbolSide } from './currency.config';
import { removeThousandsSeperator, addThousandsSeparator, safeParseString } from './currency.util';
import { isString } from './util';

@Pipe({ name: 'currency' })
export class CurrencyPipe implements PipeTransform {

    public transform(value: number | string,
        symbol = '$',
        side = CurrencySymbolSide.LEFT,
        fractionSize = 2,
        gap = ' '): string {

        let numberValue: number = isString(value) ? safeParseString(<string>value) : <number>value;
        let stringValue = addThousandsSeparator(numberValue.toFixed(fractionSize));
        return this.embeddInCurrencySymbol(stringValue, symbol, side, gap);
    }


    private embeddInCurrencySymbol(value: string, symbol: string, side: CurrencySymbolSide, gap: string) {
        return side === CurrencySymbolSide.LEFT ?
            `${symbol}${gap}${value}` : `${value}${gap}${symbol}`;
    }

}