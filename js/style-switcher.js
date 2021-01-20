/*------------------- Toggle style switcher --------------------- */

const styleSwitcherToggler = document.querySelector(".style__switcher__toggler");

styleSwitcherToggler.addEventListener("click", () => {
    document.querySelector(".style__switcher").classList.toggle("open");
});

// Hide style - switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style__switcher").classList.toggle("open")) {
        document.querySelector(".style__switcher").classList.remove("open");
    }
});

/*------------------- Theme colors --------------------- */

const alternateStyles = document.querySelectorAll(".alternate__style");

function setActiveStyle(color) {
    alternateStyles.forEach((style) => {
        if(color === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        } else {
            style.setAttribute("disabled","true");
        }
        console.log(style);
    });
    
}