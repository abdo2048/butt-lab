/**
 * Touch behaviour for glossary terms.
 *
 * A term is a real link to `/glossary/#<id>`, and that must keep working for
 * mouse and keyboard users. On a touch pointer the first tap opens the term's
 * own definition instead of leaving the page; a second tap follows the link.
 * Escape or a tap elsewhere closes it. No definition text is added here: the card already
 * renders the term's `data-tip`, so open/close only toggles a class.
 */

const OPEN_CLASS = "term--open";

let lastPointerType = "mouse";
let openTerm: HTMLAnchorElement | null = null;

function close(): void {
  if (openTerm === null) return;
  openTerm.classList.remove(OPEN_CLASS);
  openTerm = null;
}

// Capture before the click so a touch tap can be told apart from a mouse click.
document.addEventListener(
  "pointerdown",
  (event: PointerEvent) => {
    lastPointerType = event.pointerType;
  },
  true,
);

document.addEventListener("click", (event: MouseEvent) => {
  const target = event.target;
  const term = target instanceof Element ? target.closest("a.term") : null;

  // A keyboard activation has detail 0: let it follow the glossary link.
  if (event.detail === 0 || !(term instanceof HTMLAnchorElement) || lastPointerType !== "touch") {
    close();
    return;
  }

  // A second tap follows the link so touch users can reach the full entry.
  if (openTerm === term) {
    close();
    return;
  }

  event.preventDefault();
  close();
  openTerm = term;
  term.classList.add(OPEN_CLASS);
});

document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Escape") close();
});
