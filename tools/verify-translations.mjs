import { chromium, expect } from "@playwright/test";
import { readFileSync, mkdirSync } from "node:fs";

const read = (file) => JSON.parse(readFileSync(file, "utf8"));
const cases = read("frontend/src/data/cases.json");
const translations = read("frontend/src/data/cases.en.json");
const experiences = read("frontend/src/data/experiences.json");
const englishExperiences = read("frontend/src/data/experiences.en.json");
expect(translations.map((item) => item.slug).sort()).toEqual(
  cases.map((item) => item.slug).sort(),
);
for (const item of cases) {
  const translated = translations.find((entry) => entry.slug === item.slug);
  for (const key of ["title", "category", "nature", "summary"])
    expect(translated[key]).toBeTruthy();
  expect(translated.tags).toHaveLength(item.tags.length);
  expect(translated.sections).toHaveLength(item.sections.length);
  for (const [index, section] of item.sections.entries()) {
    const en = translated.sections[index];
    expect(en.title).toBeTruthy();
    for (const key of ["paragraphs", "items"]) {
      expect(en[key]).toHaveLength(section[key].length);
      for (const text of en[key]) expect(text.trim().length).toBeGreaterThan(0);
    }
  }
}
expect(englishExperiences.map((item) => item.caseSlug)).toEqual(
  experiences.map((item) => item.caseSlug),
);
console.log(
  "PASS Traduções completas para todas as seções dos cases e experiências",
);

const base = process.env.PORTFOLIO_FRONTEND_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const errors = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("button", { name: "EN", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  for (const heading of [
    "About me",
    "Projects",
    "Experience",
    "Contact",
    "Product Owner Intern",
  ]) {
    await expect(
      page.getByRole("heading", { name: heading, exact: true }),
    ).toBeVisible();
  }
  await expect(page.locator(".hero-description")).toContainText(
    "Product Owner intern, helping turn business needs",
  );
  await expect(page.locator("#experiencias")).toContainText(
    "Mar 2026 — Present",
  );
  await expect(page.locator("#projetos")).toContainText("Jan 2026 (approx.)");
  await expect(page.locator("#projetos")).toContainText("Sep 2026 — ongoing");
  await expect(
    page.getByRole("link", { name: "Write an email" }),
  ).toHaveAttribute("href", "mailto:anajulia.senaoliveira@gmail.com");
  await expect(page.locator(".project-image img").first()).toHaveAttribute(
    "alt",
    /Illustrative cover/,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Software Engineering/,
  );
  await expect(page).toHaveTitle("Ana Júlia | Product & Technology");
  await expect(page.locator("main")).not.toContainText(
    /Ver detalhes|Capa ilustrativa|Aprendizados|Vamos conversar|Metodologias Ágeis/,
  );
  for (const image of await page
    .locator("main img")
    .evaluateAll((images) => images.map((img) => img.src))) {
    const response = await page.request.get(image);
    expect(response.ok()).toBeTruthy();
    expect(await response.text()).not.toMatch(/ADOÇÃO|REQUISITOS|COLABORAÇÃO/);
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page
    .getByRole("link", { name: "View details of PetMatch", exact: true })
    .click();
  await expect(page).toHaveURL(/\/cases\/petmatch$/);
  for (const item of translations) {
    await page.goto(`${base}/cases/${item.slug}`);
    await expect(
      page.getByRole("heading", { name: item.title, exact: true }),
    ).toBeVisible();
    await expect(page.locator(".case-sections h2")).toHaveText(
      item.sections.map((section) => section.title),
    );
    await expect(page).toHaveTitle(`${item.title} | Ana Júlia`);
    await page.getByRole("button", { name: "PT", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Aprendizados", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "EN", exact: true }).click();
    await expect(
      page.getByRole("heading", { name: "Lessons learned", exact: true }),
    ).toBeVisible();
    await page.locator(".back-link").click();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  }
  for (const path of ["/inexistente", "/cases/inexistente"]) {
    await page.goto(`${base}${path}`);
    await expect(
      page.getByText("404 · Page not found", { exact: true }),
    ).toBeVisible();
    await expect(page).toHaveTitle("404 · Page not found | Ana Júlia");
  }
  console.log(
    "PASS Idioma global, datas, acessibilidade, metadados, persistência, cases e 404",
  );

  mkdirSync("docs/screenshots", { recursive: true });
  for (const width of [320, 360, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const language of ["pt", "en"]) {
      await page.goto(base);
      await page
        .getByRole("button", { name: language.toUpperCase(), exact: true })
        .click();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await expect(
        page.getByRole("button", { name: "EN", exact: true }),
      ).toBeInViewport();
      if (width === 360) {
        await page
          .getByRole("button", {
            name: language === "en" ? "Open menu" : "Abrir menu",
          })
          .click();
        await page
          .getByRole("navigation")
          .getByRole("link", {
            name: language === "en" ? "Contact" : "Contato",
            exact: true,
          })
          .click();
        await expect(page).toHaveURL(/#contato$/);
        await expect(
          page.getByRole("button", {
            name: language === "en" ? "Open menu" : "Abrir menu",
          }),
        ).toHaveAttribute("aria-expanded", "false");
      }
      if ([360, 1440].includes(width)) {
        await page.evaluate(() => {
          document.activeElement?.blur();
          window.scrollTo({ top: 0, behavior: "instant" });
          return new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
          );
        });
        await page.screenshot({
          path: `docs/screenshots/home-${language === "en" ? "en-" : ""}${width}.png`,
          fullPage: true,
        });
      }
      for (const slug of ["petmatch", "fiis", "experiencia-po"]) {
        await page.goto(`${base}/cases/${slug}`);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(width);
      }
    }
  }
  console.log("PASS Menu móvel e layout nos dois idiomas entre 320px e 1440px");

  const blocked = await browser.newContext();
  await blocked.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
  });
  const blockedPage = await blocked.newPage();
  blockedPage.on("pageerror", (error) => errors.push(error.message));
  await blockedPage.goto(base);
  await blockedPage.getByRole("button", { name: "EN", exact: true }).click();
  await expect(
    blockedPage.getByRole("heading", { name: "About me", exact: true }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  console.log(
    "PASS Tradução com armazenamento bloqueado e sem erros JavaScript",
  );
} finally {
  await browser.close();
}
