

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

(() => {
    const filterContainer = document.querySelector(".portfolio__filter"),
    portfolioItemsFilter = document.querySelector(".portfolio__items"),
    portfolioItems = document.querySelector(".portfolio__item"),
    popup = document.querySelector(".portfolio__popup"),
    prevBtn = popup.querySelector(".pp__prev"),
    nextBtn = popup.querySelector(".pp__next"),
    closeBtn = popup.querySelector(".pp__close"),
    projectDetailsContainer = popup.querySelector(".pp__details"),
    projectDetailsBtn = popup.querySelector(".pp__project__details__btn");
    let itemIndex, slideIndex, screenshots;

    /* Filter portfolio items */
    filterContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("filter__item") && !event.target.classList.contains("active")) {
            // deactivate existing active 'filter__item'
            filterContainer.querySelector(".active").classList.remove("outer__shadow","active");
            // activate new 'filter item'
            event.target.classList.add("active","outer__shadow");
            const target = event.target.getAttribute("data-target");
            portfolioItems.forEach((item) => {
                if(target === item.getAttribute("data-category")) {
                    
                }
            })
        }
    })

})();
