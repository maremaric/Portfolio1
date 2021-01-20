/*------------------- Toggle style switcher --------------------- */

const styleSwitcherToggler = document.querySelector(".style__switcher__toggler");

styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style__switcher").classList.toggle("open");
});

// Hide style - switcher on scroll
window.addEventListener("scroll", () => {
    console.log("hi")
});

