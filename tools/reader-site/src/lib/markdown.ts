import { Marked, type Tokens } from "marked";

/**
 * Markdown pipeline for the reader site.
 *
 * The site renders the approved publication pages as they were written, and adds
 * two things on top: glossary tooltips on recognised terms, and two markers where
 * a structured component takes over from prose (the criterion scorecard and the
 * source cards). Nothing in this module can change a claim, a score, an evidence
 * state or an approval - it only decides how the approved text is presented.
 */

export interface GlossaryTerm {
  id: string;
  preferredLabel: string;
  aliases: string[];
  tooltip: string;
}

export interface RenderOptions {
  terms?: GlossaryTerm[];
}

export interface SectionParts {
  prose: string;
  scorecard: string | undefined;
}

export interface DisclaimerParts {
  prose: string;
  disclaimer?: string | undefined;
}

export interface PageSection {
  heading: string;
  slug: string;
  body: string;
}

export interface ParsedPage {
  title: string;
  preamble: string;
  sections: PageSection[];
}

const SCORECARD_TABLE =
  /^\| *Criterion *\| *Result *\| *Basis *\| *Why *\|[^\n]*\n\|[^\n]*\n(?:\|[^\n]*\n)*/m;

const DISCLAIMER_PREFIX = "This page was produced by desk research on ";

const AMP = String.fromCharCode(38);
const ESCAPE_MAP: Record<string, string> = {
  "<": `${AMP}lt;`,
  ">": `${AMP}gt;`,
  '"': `${AMP}quot;`,
  "'": `${AMP}#39;`,
};

function escapeMarkup(value: string): string {
  return value.replace(/[<>"']/g, (character) => ESCAPE_MAP[character] ?? character);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

interface TermPattern {
  regex: RegExp;
  byLabel: Map<string, GlossaryTerm>;
}

function buildTermPattern(terms: GlossaryTerm[]): TermPattern | undefined {
  const byLabel = new Map<string, GlossaryTerm>();
  const labels: string[] = [];
  for (const term of terms) {
    for (const candidate of [term.preferredLabel, ...term.aliases]) {
      const label = candidate.trim();
      if (label.length === 0) continue;
      const key = label.toLowerCase();
      if (byLabel.has(key)) continue;
      byLabel.set(key, term);
      labels.push(label);
    }
  }
  if (labels.length === 0) return undefined;
  labels.sort((left, right) => right.length - left.length);
  const source = labels.map(escapeRegExp).join("|");
  return {
    regex: new RegExp(`(?<![\\w-])(?:${source})(?![\\w-])`, "gi"),
    byLabel,
  };
}

function wrapTerms(value: string, pattern: TermPattern | undefined): string {
  if (pattern === undefined) return value;
  return value.replace(pattern.regex, (match) => {
    const term = pattern.byLabel.get(match.toLowerCase());
    if (term === undefined) return match;
    const tip = escapeMarkup(term.tooltip);
    return `<a class="term" href="/glossary/#${term.id}" data-tip="${tip}">${match}</a>`;
  });
}

function createRenderer(pattern: TermPattern | undefined): Marked {
  const instance = new Marked({ gfm: true, async: false });
  instance.use({
    renderer: {
      text(token: Tokens.Text | Tokens.Escape): string {
        return wrapTerms(escapeMarkup(token.text), pattern);
      },
      heading(token: Tokens.Heading): string {
        const plain = this.parser.parseInline(token.tokens, this.parser.textRenderer);
        return `<h${token.depth}>${escapeMarkup(plain)}</h${token.depth}>\n`;
      },
    },
  });
  return instance;
}

/**
 * Split a published page into its title, its lead paragraph and its sections.
 * The section body never contains the `##` heading itself: the page component
 * renders the heading, so every section gets one id and one anchor.
 */
export function splitPage(markdown: string): ParsedPage {
  const lines = markdown.split(/\r?\n/);
  const preambleLines: string[] = [];
  const headings: string[] = [];
  const bodies: string[][] = [];
  let title = "";
  let inSection = false;

  for (const line of lines) {
    const headingOne = /^#\s+(.*)$/.exec(line);
    const headingTwo = /^##\s+(.*)$/.exec(line);
    if (headingOne !== null && title === "" && !inSection) {
      title = headingOne[1]?.trim() ?? "";
      continue;
    }
    if (headingTwo !== null) {
      headings.push(headingTwo[1]?.trim() ?? "");
      bodies.push([]);
      inSection = true;
      continue;
    }
    if (inSection) bodies[bodies.length - 1]?.push(line);
    else preambleLines.push(line);
  }

  return {
    title,
    preamble: preambleLines.join("\n").trim(),
    sections: headings.map((heading, index) => ({
      heading,
      slug: slugify(heading),
      body: (bodies[index] ?? []).join("\n").trim(),
    })),
  };
}

/**
 * Split a section body into its prose and the criterion scorecard table, if it
 * carries one. The scorecard is rendered from the structured assessment records
 * instead, so the page needs the prose without the table.
 */
export function splitSectionBody(body: string): SectionParts {
  const match = SCORECARD_TABLE.exec(body);
  if (match === null) return { prose: body.trim(), scorecard: undefined };
  const scorecard = match[0];
  const prose = `${body.slice(0, match.index)} ${body.slice(match.index + scorecard.length)}`;
  return { prose: prose.trim(), scorecard };
}

/**
 * Lift the standing disclaimer out of a section body.
 *
 * Every published page ends with one paragraph that states what the page does
 * not claim. A page section can be replaced by a structured component, and the
 * disclaimer must survive that replacement, so it is separated from the prose
 * before the section is rendered.
 */
export function splitDisclaimer(body: string): DisclaimerParts {
  const trimmed = body.trim();
  if (trimmed.length === 0) return { prose: body };
  const paragraphs = trimmed.split(/\n{2,}/);
  const last = paragraphs[paragraphs.length - 1];
  if (last === undefined || !last.startsWith(DISCLAIMER_PREFIX)) {
    return { prose: body };
  }
  const rest = paragraphs.slice(0, -1).join("\n\n");
  return { prose: rest, disclaimer: last };
}

/**
 * Render one section body to HTML.
 *
 * - Recognised glossary terms become links with a short tooltip.
 * - Raw HTML in the source is escaped: the published pages carry no markup.
 */
export function renderMarkdown(markdown: string, options: RenderOptions = {}): string {
  const pattern = buildTermPattern(options.terms ?? []);
  const safeSource = markdown.replace(/</g, AMP + "lt;");
  const html = createRenderer(pattern).parse(safeSource) as string;
  return html.replaceAll("<blockquote>", '<blockquote class="ai-note">');
}
