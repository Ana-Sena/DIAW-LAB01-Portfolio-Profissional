// Datas de domínio têm precisão mensal. O dia 1 é usado somente para formatar o mês.
export function formatMonth(value, language = "pt") {
  if (!value)
    return language === "en" ? "Period not provided" : "Período não informado";
  return new Intl.DateTimeFormat(language === "en" ? "en-US" : "pt-BR", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}-01T12:00:00Z`));
}

export function formatPeriod(
  { startDate, endDate, approximateDate, ongoing },
  language = "pt",
) {
  let label = formatMonth(startDate, language);
  if (endDate && endDate !== startDate)
    label += ` — ${formatMonth(endDate, language)}`;
  if (ongoing) label += language === "en" ? " — ongoing" : " — em andamento";
  if (approximateDate) label += language === "en" ? " (approx.)" : " (aprox.)";
  return label;
}
