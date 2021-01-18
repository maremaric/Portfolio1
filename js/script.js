
/*-------------------------- Navigation menu start --------------------------*/

(() => {

    const hmaburgerBtn = document.querySelector(".hamburger__btn"),
    navMenu = document.querySelector(".nav__menu"),
    closeNavBtn = navMenu.querySelector(".close__nav__menu");

    hmaburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
        navMenu.classList.add("open");
        bodyScrollingToggle();
    };

    function hideNavMenu() {
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    };

    function fadeOutEffect() {
        document.querySelector(".fade__out__effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade__out__effect").classList.remove("active");
        },300);
    }
    // attach an event handler to document
    document.addEventListener("click", (event) => {
        if(event.target.classList.contains("link__item")) {
            // make sure event.target.hash has a value before overridding default behavior
            if(event.target.hash !== "") {
                // prevent default anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                // deactivate existing active 'section'
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                // active new 'section'
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
            }
        }
    });

})();

/*-------------------------- Navigation menu end --------------------------*/

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

function bodyScrollingToggle() {
    document.body.classList.toggle("hidden__scrolling");
}

/*-------------------------- About setion tabs ends ----------------------------*/

/*-------------------------- Portfolio filter and popup ------------------------*/

(() => {
    
    const filterContainer = document.querySelector(".portfolio__filter"),
    portfolioItemsContainer = document.querySelector(".portfolio__items"),
    portfolioItems = document.getElementsByClassName("portfolio__item"),
    popup = document.querySelector(".portfolio__popup"),
    prevBtn = popup.querySelector(".pp__prev"),
    nextBtn = popup.querySelector(".pp__next"),
    closeBtn = popup.querySelector(".pp__close"),
    projectDetailsContainer = popup.querySelector(".pp__details"),
    projectDetailsBtn = popup.querySelector(".pp__project__details__btn");
    let itemIndex, slideIndex, screenshots;

    // filter portfolio items
    filterContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("filter__item") && !event.target.classList.contains("active")) {
            // deactivate existing active 'filter__item'
            filterContainer.querySelector(".active").classList.remove("outer__shadow","active");
            // activeate new 'filter item'
            event.target.classList.add("active","outer__shadow");
            const target = event.target.getAttribute("data-target");

            [...portfolioItems].forEach((item) => {
                if(target === item.getAttribute("data-category") || target === "all") {
                    item.classList.remove("hide");
                    item.classList.add("show");
                } else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            });
        }
    });

    portfolioItemsContainer.addEventListener("click", (event) => {
        if(event.target.closest(".portfolio__item__inner")) {
            const portfolioItem = event.target.closest(".portfolio__item__inner").parentElement;
            // get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio__item__img img").getAttribute("data-screenshots");
            // convert screenshots into array
            screenshots = screenshots.split(",");
            if(screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            } else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }

            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    });

    closeBtn.addEventListener("click", () => {
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")) {
            popupDetailsToggle();
        }
    });

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow() {
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp__img");
        // activate loader until the popupImg loaded
        popup.querySelector(".pp__loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate loader after the popupImg loaded
            popup.querySelector(".pp__loader").classList.remove("active");
        }

        screenshots = screenshots.map(function (el) {
            return el.trim();
        });
        
        for(let i = 0; i < screenshots.length; i++) {
            if(screenshots[i] === "") {
                screenshots.pop();
            }
        }
        
        // console.log(screenshots);
       
        popup.querySelector(".pp__counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;

    }

    // next slide
    nextBtn.addEventListener("click", () => {
        if(slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        popupSlideshow();
        // console.log("slideIndex: " + slideIndex);
    });

    // prev slide
    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0) {
            slideIndex = screenshots.length - 1
        } else {
            slideIndex--;
        }
        popupSlideshow();
        // console.log("slideIndex: " + slideIndex);
    });

    function popupDetails() {

        // if portfolio__item__details not exists
        if(!portfolioItems[itemIndex].querySelector(".portfolio__item__details")) {
            projectDetailsBtn.style.display = "none";
            return; /* end function execution*/
        }
        projectDetailsBtn.style.display = "block"; 

        // get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio__item__details").innerHTML;
        // set the project details
        popup.querySelector(".pp__project__details").innerHTML = details;
        // get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio__item__title").innerHTML;
        // set the project title
        popup.querySelector(".pp__title h2").innerHTML = title;
        // get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        // set the project category
        popup.querySelector(".pp__project__category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    });

    function popupDetailsToggle() {
        if(projectDetailsContainer.classList.contains("active")) {
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        } else {
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }

})();

/*-------------------------- Portfolio filter and popup end ------------------------*/

/*-------------------------- Testimonial slider --------------------------*/

(() => {

    const sliderContainer = document.querySelector(".testi__slider__container"),
    slides = sliderContainer.querySelectorAll(".testi__item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi__slider__nav .prev"),
    nextBtn = document.querySelector(".testi__slider__nav .next"),
    activeSlide = sliderContainer.querySelector(".testi__item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    
    // set width of all slides
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    });
    // set width of sliderContainer
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener("click", () => {
        if(slideIndex === slides.length - 1) {
            slideIndex = 0;
        } else {
            slideIndex++;
        }
        slider();
    });

    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0) {
            slideIndex = slides.length - 1;
        } else {
            slideIndex--;
        }
        slider();
    });

    function slider() {
        // deactivate existing active slides
        sliderContainer.querySelector(".testi__item.active").classList.remove("active");
        // activate new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();

})();

/*-------------------------- Testimonial slider end --------------------------*/

/*-------------------------- Hide all sections except active --------------------------*/

(() => {

    const sections = document.querySelectorAll(".section");
    sections.forEach((section) => {
        if(!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    });

})();


