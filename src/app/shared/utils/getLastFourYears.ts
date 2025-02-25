export default function getLastFourYears(): number[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 4 }, (_, i) => currentYear - (3 - i));
  }
  