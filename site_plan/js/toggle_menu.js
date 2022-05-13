function toggleMenu() {
    document.querySelector("#navigation").classList.toggle("open");
}

document.querySelector("#hamburger-btn").onclick = toggleMenu;