const form = document.querySelector("#generator-form");
const input = document.querySelector("#destination");
const result = document.querySelector("#result");
const output = document.querySelector("#redirect-url");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const link = new URL("redirect/", location.href);
  link.searchParams.set("target", input.value);
  output.textContent = link.toString();
  await navigator.clipboard.writeText(link.toString());
  result.hidden = false;
  input.select();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  event.preventDefault();
  form.reset();
  output.textContent = "";
  result.hidden = true;
  input.focus();
});

document.addEventListener("pointerdown", (event) => {
  if (event.target === input) return;
  event.preventDefault();
  input.focus();
});

window.addEventListener("focus", () => input.focus());
