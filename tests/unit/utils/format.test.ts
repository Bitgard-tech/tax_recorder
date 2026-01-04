import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/utils/format';

describe('formatCurrency', () => {
    it('formats positive numbers correctly', () => {
        const result = formatCurrency(1000);
        expect(result).toContain('1,000');
    });

    it('formats zero correctly', () => {
        const result = formatCurrency(0);
        expect(result).toContain('0');
    });

    it('handles string input', () => {
        const result = formatCurrency('1500');
        expect(result).toContain('1,500');
    });

    it('handles null and undefined', () => {
        expect(formatCurrency(null)).toBe('LKR 0.00');
        expect(formatCurrency(undefined)).toBe('LKR 0.00');
    });

    it('handles decimal values', () => {
        const result = formatCurrency(99.99);
        expect(result).toContain('99.99');
    });
});
