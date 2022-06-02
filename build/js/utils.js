function convertToText(res) {
  if (!res.ok) {
    throw new Error("Bad Response");
  } else {
    return res.text();
  }
}

export function renderWithTemplate(template, parent, data, callback) {
  let clone = template.content.cloneNode(true);
  if (callback) {
    clone = callback(clone, data);
  }

  parent.appendChild(clone);
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

export async function loadHeaderFooter() {
  let header = "";
  let footer = "";

  if (location.pathname.indexOf("src") >= 0) {
    header = await loadTemplate("../src/partials/header.html");
    footer = await loadTemplate("../src//partials/footer.html");
  } else if (location.pathname.indexOf("build") >= 0) {
    header = await loadTemplate("../build/partials/header.html");
    footer = await loadTemplate("../build/partials/footer.html");
  } else {
    header = await loadTemplate("../partials/header.html");
    footer = await loadTemplate("../partials/footer.html");
  }

  const headerElement = document.querySelector("#main-header");
  const footerElemtnt = document.querySelector("#main-footer");
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElemtnt);
}
