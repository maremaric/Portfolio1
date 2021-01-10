

/*-------------------------- About setion tabs ------------------------*/

(() => {
    const aboutSection = document.querySelector(".about__section"),
    tabsContainer = document.querySelector(".about__tabs");

    tabsContainer.addEventListener("click", (event) => {
        /* if event.target contains 'tab__item' class and not contains 'active' class */
        if(event.target.classList.contains("tab__item") && !event.target.classList.contains("active")) {
            // console.log("event.target contains 'tab__item class and not contains 'active' class");
            // console.log(event.target);
            const target = event.target.getAttribute("data-target");
            // Deactivate existing active 'tab__item'
            tabsContainer.querySelector(".active").classList.remove("outer__shadow","active");
            // active new 'tab__item'
            event.target.classList.add("active","outer__shadow");
            // deactivate existing active 'tab__content'
            aboutSection.querySelector(".tab__content.active").classList.remove("active");
            // active new 'tab__content'
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

/*-------------------------- About setion tabs ends ------------------------*/

/*-------------------------- Portfolio filter and popup ------------------------*/


