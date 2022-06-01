function convertToText(res) {
  if (!res.ok) {
    throw new Error("Bad Response");
  } else {
    return res.text();
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(template, parent, list, callback) {
  list.forEach((item) => {
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parent.appendChild(templateWithData);
  });
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

  if(location.pathname.indexOf("src") >= 0) {
    header = await loadTemplate("../src/partials/header.html");
    footer = await loadTemplate("../src//partials/footer.html");
  } else if(location.pathname.indexOf("build") >= 0) {
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
