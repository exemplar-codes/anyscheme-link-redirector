const form = document.querySelector("#generator-form");
const input = document.querySelector("#destination");
const result = document.querySelector("#result");
const output = document.querySelector("#redirect-url");
const copy = document.querySelector("#copy");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const link = new URL("redirect/", location.href);
  link.searchParams.set("target", input.value);
  output.textContent = link;
  result.hidden = false;
  copy.textContent = "Copy";
});

copy.addEventListener("click", async () => {
  await navigator.clipboard.writeText(output.textContent);
  copy.textContent = "Copied";
});
