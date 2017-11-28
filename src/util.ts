/**
 * Checks whether the given value is a number
 * @param value The value to check
 */
export function isNumeric(value): boolean {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

/**
 * Checks whether the given value is a string.
 * @param value The value to check
 */
export function isString(value): boolean {
    return typeof value === 'string';
}