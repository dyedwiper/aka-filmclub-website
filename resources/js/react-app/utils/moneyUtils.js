import { MONEY_CONVERSION_FACTOR } from '../constants';

export function toEuroWithSymbol(amountInCents) {
    return (amountInCents / MONEY_CONVERSION_FACTOR).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
}

export function toEuro(amountInCents) {
    return (amountInCents / MONEY_CONVERSION_FACTOR).toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
