const colorScheme = (localStorage.getItem("_x_scheme") ?? "system").replaceAll(
  '"',
  "",
);

if (colorScheme !== "system") {
  document.documentElement.style.colorScheme = colorScheme;
}

const storedFont = localStorage.getItem("ui-font");

if (storedFont) {
  document.documentElement.style.fontFamily = storedFont;
}

const storedRadius = localStorage.getItem("ui-rounded-scale");

if (storedRadius) {
  document.documentElement.style.setProperty(
    "--ui-rounded-scale",
    storedRadius,
  );
}

localStorage.removeItem("ui-primary-dark");

const storedColor = localStorage.getItem("ui-primary");

if (storedColor) {
  document.documentElement.style.setProperty("--ui-primary", storedColor);
}

function syncSwatch() {
  var stored = localStorage.getItem("ui-primary");

  document.querySelectorAll('input[name="color"]').forEach(function (b) {
    b.checked = b.value === stored;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  syncSwatch();
});

window.updateColor = (form) => {
  const color = new FormData(form).get("color");

  document.documentElement.style.setProperty("--ui-primary", color);
  localStorage.setItem("ui-primary", color);
  syncSwatch();
};
