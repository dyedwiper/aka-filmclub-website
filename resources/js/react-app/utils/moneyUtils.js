export function toEuro(amountInCents) {
    return (amountInCents / 100).toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
    });
}
