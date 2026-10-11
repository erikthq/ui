// Search overlay: lists every page, and filters them as the user types
import MiniSearch from "../minisearch.js";

const { items, icons } = JSON.parse(
  document.getElementById("search-data").textContent,
);

const ms = new MiniSearch({
  fields: ["title"],
  storeFields: ["title", "description", "path", "type", "badgeClass"],
});
ms.addAll(items);

const dialog = document.getElementById("search-dialog");
const input = document.getElementById("search-input");
const list = document.getElementById("search-list");
const empty = document.getElementById("search-empty");

dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});

dialog.addEventListener("close", () => {
  input.value = "";
  renderAll();
});

list.addEventListener("click", (e) => {
  if (e.target.closest("a")) dialog.close();
});

const html = String.raw;

// The only place results are drawn, for the full list and for search results
function renderItem(r) {
  return html`<li role="presentation">
    <a href="${r.path}" class="search-result" role="option" tabindex="-1">
      ${icons[r.type]}
      <span class="flex-col gap-1">
        <span class="search-result-title">${r.title}</span>
        <!-- <small>{r.description}</small> -->
      </span>
      <!-- <span class="badge {r.badgeClass}">{r.type}</span> -->
      ${icons.arrow}
    </a>
  </li>`;
}

// Results are shown in groups, in this order. Each group keeps the search ranking
const groups = [
  { type: "guide", heading: "Pages" },
  { type: "component", heading: "Components" },
  { type: "block", heading: "Blocks" },
];

function renderGroup({ type, heading }, results) {
  const groupResults = results.filter((r) => r.type === type);
  if (!groupResults.length) return "";

  return html`<li role="group" aria-labelledby="search-group-${type}">
    <h3 class="search-group" id="search-group-${type}">${heading}</h3>
    <ul role="presentation">
      ${groupResults.map(renderItem).join("")}
    </ul>
  </li>`;
}

function show(results) {
  const hasResults = results.length > 0;
  list.hidden = !hasResults;
  empty.hidden = hasResults;
  if (hasResults)
    list.innerHTML = groups.map((g) => renderGroup(g, results)).join("");

  options = [...list.querySelectorAll(".search-result")];
  options.forEach((option, i) => (option.id = `search-result-${i}`));
  setActive(0);
}

// The highlighted result. Focus stays in the input, so typing still works,
// and aria-activedescendant tells screen readers which result is highlighted.
// -1 is the input itself, so the arrows go from the top result back to it
let options = [];
let active = -1;

function setActive(i, scroll = true) {
  options[active]?.setAttribute("aria-selected", "false");
  const steps = options.length + 1;
  active = ((((i + 1) % steps) + steps) % steps) - 1;
  const option = options[active];
  if (!option) {
    if (scroll) list.parentElement.scrollTop = 0;
    return input.removeAttribute("aria-activedescendant");
  }

  option.setAttribute("aria-selected", "true");
  input.setAttribute("aria-activedescendant", option.id);
  if (scroll) option.scrollIntoView({ block: "nearest" });
}

input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") setActive(active + 1);
  else if (e.key === "ArrowUp") setActive(active - 1);
  else if (e.key === "Enter" && options[active]) options[active].click();
  else return;
  e.preventDefault();
});

// The mouse moves the same highlight, so hover and keys never show two results
list.addEventListener("mousemove", (e) => {
  const i = options.indexOf(e.target.closest(".search-result"));
  if (i !== -1 && i !== active) setActive(i, false);
});

function renderAll() {
  show(items);
}

function renderResults(q) {
  show(ms.search(q, { prefix: true, fuzzy: 0.2 }));
}

renderAll();

input.addEventListener("input", function () {
  const q = this.value.trim();
  if (q) renderResults(q);
  else renderAll();
});

document.addEventListener("keydown", (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "f") {
    e.preventDefault();
    dialog.showModal();
    input.select();
  }
});
