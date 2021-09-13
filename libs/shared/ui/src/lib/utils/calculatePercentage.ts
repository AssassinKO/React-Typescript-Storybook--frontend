export const calculatePercentage = (value: number, total: number) =>
  total === 0 ? 0 : Math.ceil((value / total) * 100);
