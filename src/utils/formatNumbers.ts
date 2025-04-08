/**
 * Formats a number to have commas and optional decimal places.
 * @param value - The number to format.
 * @param decimals - Number of decimal places (optional).
 * @returns A string with formatted number (e.g., "1,000", "25,430.50").
 */
export function formatNumber(value: number, decimals: number = 0): string {
    if (isNaN(value)) return '0';

    return value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}
