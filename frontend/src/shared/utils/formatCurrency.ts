// formatCurrency.ts — ShelfMate
// Format numbers as GBP currency strings

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatPence = (pence: number): string => {
  return formatCurrency(pence / 100);
};
