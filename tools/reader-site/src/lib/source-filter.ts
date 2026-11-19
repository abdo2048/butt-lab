function searchable(text: string): string {
  return text.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
}

export function initSourceFilter(doc: Document): void {
  const controls = doc.querySelector<HTMLElement>("#source-filter-controls");
  const input = doc.querySelector<HTMLInputElement>("#source-filter");
  const status = doc.querySelector<HTMLElement>("#source-filter-status");
  const reset = doc.querySelector<HTMLButtonElement>("#source-filter-reset");
  const groups = [...doc.querySelectorAll<HTMLElement>("[data-source-group]")];
  if (!controls || !input || !status || !reset || groups.length === 0) return;

  const indexed = groups.map((group) => ({
    group,
    jump: doc.getElementById(`jump-${group.dataset.sourceGroup}`),
    cards: [...group.querySelectorAll<HTMLElement>(".source-card")].map((card) => ({
      card,
      text: searchable(card.textContent ?? ""),
    })),
  }));
  const total = indexed.reduce((sum, { cards }) => sum + cards.length, 0);
  const update = () => {
    const terms = searchable(input.value).trim().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const { group, jump, cards } of indexed) {
      let visible = 0;
      for (const { card, text } of cards) {
        const matches = terms.every((term) => text.includes(term));
        card.hidden = !matches;
        if (matches) visible++;
      }
      group.hidden = visible === 0;
      if (jump) jump.hidden = visible === 0;
      count += visible;
    }
    status.textContent = count ? `Showing ${count} of ${total} references.` : "No sources match. Try another keyword or clear the filter.";
  };
  input.addEventListener("input", update);
  reset.addEventListener("click", () => {
    input.value = "";
    update();
    input.focus();
  });
  controls.hidden = false;
  update();
}
