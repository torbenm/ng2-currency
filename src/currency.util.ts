import { isNumeric } from "./util";

/**
 * Removes all seperators from a given value.
 *
 * Example:
 * `1,000,000.00 => 1000000.00`
 *
 * @param value The value to strip the seperators off
 * @param separator The seperator to remove
 */
export function removeThousandsSeperator(value: string, separator: string = ','): string {
   return value.replace(new RegExp(separator, 'g'), '');
}

/**
 * Adds a thousands separators to the value.
 * Can be modified to add hundreds seperators or other custom lengths.
 *
 * Example:
 * `1000000.123 => 1,000,000.123``
 *
 * @param value The value to add the separators to. It is assumed that a decimal point (`.`) is used.
 * @param separator The separator to insert
 * @param groupSize The size of the separator group, e.g. 3 for 1,000,000 or 2 for 1,00,00,00
 */
export function addThousandsSeparator(value: string, separator: string = ',', groupSize: number = 3): string {
    let valueParts = value.split('.');
    let withSeparator = valueParts[0].replace(new RegExp('\\B(?=(\\d{'+groupSize+'})+(?!\\d))', 'g'), separator);
    if (valueParts[1]) {
        withSeparator += `.${valueParts[1]}`;
    }
    return withSeparator;
}

/**
 * Parses a string with thousands separators to a number.
 * Returns isNaN if it is not a valid number.
 *
 * @param value The value to parse
 * @param separator The thousands separator
 */
export function parseString(value: string, separator: string = ','): number {
    return parseFloat(removeThousandsSeperator(value, separator));
}

/**
 * Parses a string with thousands separators to a number.
 * Returns 0 if it is not a valid number.
 *
 * @param value The value to parse
 * @param separator The thousands separator
 */
export function safeParseString(value: string, separator: string = ','): number {
    let number = parseString(value, separator);
    return isNumeric(number) ? number : 0;
}

/**
 * Replaces the decimal point with a custom value.
 * 
 * Example:
 * `100.123 => 100,123``
 *
 * @param value The value to replace the decimal point with the custom decimal point
 * @param customDecimalPoint The custom decimal point
 */
export function replaceSeparators(value: string, customDecimalPoint: string = ','): string {
    return value.replace(new RegExp('.', 'g'), customDecimalPoint);
}

/**
 * Removes the custom decimal point and uses the standard decimal point.
 * 
 * Example:
 * `100,123 => 100.123``
 *
 * @param value The value to remove the custom decimal point from
 * @param customDecimalPoint The custom decimal point
 */
export function undoCustomDecimalPoint(value: string, customDecimalPoint: string = ','): string {
    return value.replace(new RegExp(customDecimalPoint, 'g'), '.');
}