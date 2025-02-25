export default function getLastFourYears(): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => currentYear - (4 - i));
  }
  