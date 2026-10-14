import { chromium, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const base = process.env.PORTFOLIO_FRONTEND_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const checks = [],
  errors = [],
  backendRequests = [];
mkdirSync("docs/screenshots", { recursive: true });
const passed = (label) => {
  checks.push(label);
  console.log("PASS", label);
};

try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (
      url.pathname.startsWith("/api/") ||
      ["8080", "8081", "8082"].includes(url.port)
    ) {
      backendRequests.push(url.pathname);
      return route.abort();
    }
    return route.continue();
  });
  await page.goto(base);
  await expect(page.locator(".project-card h3")).toHaveText([
    "PetMatch",
    "Laje — Plataforma de FIIs",
  ]);
  await expect(page.locator("#projetos")).toContainText(
    "jan. de 2026 (aprox.)",
  );
  await expect(page.locator("#projetos")).toContainText(
    "set. de 2026 — em andamento",
  );
  await expect(page.locator("#experiencias")).toContainText("dti digital");
  await expect(page.locator("#experiencias")).toContainText(
    "mar. de 2026 — Atual",
  );
  passed("Conteúdo local completo e projetos em ordem cronológica");
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "About me", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "PT", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Sobre mim", exact: true }),
  ).toBeVisible();
  passed("Seletor PT/EN");
  await expect(
    page.getByRole("link", { name: "Escrever um e-mail" }),
  ).toHaveAttribute("href", "mailto:anajulia.senaoliveira@gmail.com");
  await expect(
    page.getByRole("link", { name: "GitHub", exact: true }),
  ).toHaveAttribute("href", "https://github.com/Ana-Sena");
  await expect(
    page.getByRole("link", { name: "LinkedIn", exact: true }),
  ).toHaveAttribute(
    "href",
    "https://www.linkedin.com/in/ana-júlia-sena-a68b86350/",
  );
  await expect(page.locator("form")).toHaveCount(0);
  await expect(page.getByText("WhatsApp")).toHaveCount(0);
  await expect(page.locator("footer")).toHaveText(
    String(new Date().getFullYear()),
  );
  passed(
    "Contato direto por e-mail, links confirmados e footer somente com ano",
  );
  for (const [slug, title] of [
    ["petmatch", "PetMatch"],
    ["fiis", "Laje — Plataforma de FIIs"],
    ["experiencia-po", "Atuação como Product Owner na dti digital"],
  ]) {
    await page.goto(`${base}/cases/${slug}`);
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Aprendizados", exact: true }),
    ).toBeVisible();
    await page.screenshot({
      path: `docs/screenshots/case-${slug}.png`,
      fullPage: true,
    });
    await page.locator(".back-link").click();
    await expect(page).toHaveURL(
      new RegExp(slug === "experiencia-po" ? "#experiencias$" : "#projetos$"),
    );
  }
  passed("Três cases locais, acesso direto e retorno às seções");
  await page.goto(`${base}/cases/inexistente`);
  await expect(
    page.getByRole("heading", { name: "Este case não foi encontrado." }),
  ).toBeVisible();
  await page.goto(`${base}/inexistente`);
  await expect(page.getByText("404 · Página não encontrada")).toBeVisible();
  passed("404 para rotas e cases desconhecidos");
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base);
    await expect(
      page.getByRole("link", { name: "Ver detalhes de PetMatch" }),
    ).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await page.screenshot({
      path: `docs/screenshots/home-${width}.png`,
      fullPage: true,
    });
    if (width === 360) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .getByRole("navigation", { name: "Navegação principal" })
        .getByRole("link", { name: "Contato", exact: true })
        .click();
      await expect(page).toHaveURL(/#contato$/);
      await expect(
        page.getByRole("button", { name: "Abrir menu" }),
      ).toHaveAttribute("aria-expanded", "false");
      passed("Menu móvel e âncoras");
    }
    await page.goto(`${base}/cases/petmatch`);
    await expect(
      page.getByRole("heading", { name: "PetMatch", exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    if (width === 360)
      await page.screenshot({
        path: "docs/screenshots/case-mobile.png",
        fullPage: true,
      });
    passed(`Home e case sem rolagem horizontal em ${width}px`);
  }
  expect(errors).toEqual([]);
  expect(backendRequests).toEqual([]);
  passed("Nenhuma chamada ao backend e nenhum erro JavaScript");
  writeFileSync(
    "docs/browser-check.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        browser: "Chrome headless",
        mode: "Frontend estático",
        checks,
        errors,
        backendRequests,
      },
      null,
      2,
    ) + "\n",
  );
} finally {
  await browser.close();
}
