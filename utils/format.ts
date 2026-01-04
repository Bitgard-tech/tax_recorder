export function formatCurrency(amount: number | string | null | undefined): string {
    if (amount === null || amount === undefined) return 'LKR 0.00';
    const value = typeof amount === 'string' ? parseFloat(amount) : Number(amount);
    if (isNaN(value)) return 'LKR 0.00';

    return new Intl.NumberFormat('en-LK', {
        style: 'currency',
        currency: 'LKR',
        minimumFractionDigits: 2,
    }).format(value);
}
