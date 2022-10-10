export function toEuroWithSymbol(amountInCents) {
    return (amountInCents / 100).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
}

export function toEuro(amountInCents) {
    return (amountInCents / 100).toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
