export async function loadHeaderFooter() {
    const header = await loadTemplate("../partials/header.html");
    const footer = await loadTemplate("../partials/footer.html");
    const headerElement = document.querySelector("#main-header");
    const footerElemtnt = document.querySelector("#main-footer");
    renderWithTemplate(header, headerElement);
    renderWithTemplate(footer, footerElemtnt);
  }
