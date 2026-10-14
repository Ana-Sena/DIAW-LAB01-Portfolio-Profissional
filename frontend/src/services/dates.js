// Datas de domínio têm precisão mensal. O dia 1 é usado somente para formatar o mês.
export function formatMonth(value) {
  if (!value) return "Período não informado";
  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T12:00:00Z`));
}

export function formatPeriod({ startDate, endDate, approximateDate, ongoing }) {
  let label = formatMonth(startDate);
  if (endDate && endDate !== startDate) label += ` — ${formatMonth(endDate)}`;
  if (ongoing) label += " — em andamento";
  if (approximateDate) label += " (aprox.)";
  return label;
}
