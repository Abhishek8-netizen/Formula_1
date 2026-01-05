function showTitle() {

    let firstButton = document.getElementById("imageGalleryList").querySelector("img");
    firstButton.style.opacity = "50%";

    let firstTyreButton = document.getElementById("slickTyreButtons").querySelector("button");
    firstTyreButton.style.borderBottom = "solid 2px red";

    homepageTitle = document.getElementById("homeTitle");

    setTimeout(() => {
        homepageTitle.style.opacity = 1;
    }, 500);
}

/***************************************************************************************** */

function changeNavColor(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navBar.classList.remove("changeBgColor");
        }
        else {
            navBar.classList.add("changeBgColor");
        }
    })
}

let navBar = document.querySelector("nav");
let homePageImage = document.getElementById("homepage").querySelector("img");
let observerHomePage = new IntersectionObserver(changeNavColor, { threshold: 0.2 });
observerHomePage.observe(homePageImage);

/***************************************************************************************** */

let images = ["Pictures/imageGallery_1.webp", "Pictures/imageGallery_2.webp", "Pictures/imageGallery_3.webp", "Pictures/imageGallery_4.webp"];

function changePhotoGallery(number) {

    let container = document.getElementById("imageGalleryContainer");
    let buttonContainer = document.getElementById("imageGalleryList").querySelectorAll("img");


    let image = container.querySelector("img");
    image.style.opacity = 0;


    setTimeout(() => {
        image.setAttribute("src", images[number]);

        buttonContainer.forEach(item => {
            item.style.opacity = 1;
        })

        buttonContainer[number].style.opacity = "50%";

        image.style.opacity = 1;
    }, 500);
}

/***************************************************************************************** */

// Keeps track of the last known vertical scroll position
let lastScrollTop = 0;

// Intersection Observer callback function for the tyre section
function showTyreSection(entries) {
    entries.forEach(entry => {
        // Get the vertical position of the tyre section relative to the document
        let tyreSectionPosition = entry.target.offsetTop;

        // Current vertical scroll position of the user
        let currentUserPosition = window.pageYOffset;

        // Determine if the user is scrolling up by comparing current and last scroll positions
        let scrollingUp = currentUserPosition < lastScrollTop;

        if (entry.isIntersecting) {
            // If the tyre section is in view:
            // Add classes to show animations & buttons
            headingMain.classList.add("show");
            buttonContainer.classList.add("showButtons");

            // Show the tyre image with a delay of 500ms (for smooth animation)
            setTimeout(() => {
                imageMain.classList.add("showTyreImage");
                imageMain.style.opacity = 1;
            }, 500);

            // Show the tyre description text with a delay of 1000ms
            setTimeout(() => {
                tyreDescriptionContainer.style.opacity = 1;
            }, 1000)
        }
        else {
            // If the tyre section is NOT intersecting (out of viewport)
            // BUT only remove classes if:
            // 1) The user is scrolling UP
            // 2) The user has scrolled above the tyre section position (meaning passed it going upwards)
            if (scrollingUp && currentUserPosition < tyreSectionPosition) {
                // Hide the tyre description text
                tyreDescriptionContainer.style.opacity = 0;

                // Remove the image animation and hide it
                imageMain.classList.remove("showTyreImage");
                imageMain.style.opacity = 0;

                // Remove the heading animation and hide the buttons
                headingMain.classList.remove("show");
                buttonContainer.classList.remove("showButtons");
            }
        }

        // Update the lastScrollTop to current position for next scroll event check
        lastScrollTop = currentUserPosition;
    });
}

// Grab the elements needed for animation toggling
let tyreContainer = document.getElementById("slickTyres");
let tyreDescriptionContainer = document.getElementById("tyreDescription");
let buttonContainer = document.getElementById("slickTyreButtons");
let headingMain = tyreContainer.querySelector("h1");
let imageMain = tyreContainer.querySelector("img");

// Create an IntersectionObserver to watch when the tyre section is visible
// Threshold 0.7 means 70% of the element should be visible to trigger intersection
let observerSlickTyres = new IntersectionObserver(showTyreSection, { threshold: 0.7 });

// Start observing the tyre section
observerSlickTyres.observe(tyreContainer);


/***************************************************************************************** */

let tyreImages = ["Pictures/tyreRed.webp", "Pictures/tyreYellow.webp", "Pictures/tyreWhite.webp"];

let tyreHeading = ["Red", "Yellow", "White"];

let tyreContent = ["The red tyre signifies the soft compound, designed for maximum grip and performance over shorter stints. It offers top lap times but wears out quickly, ideal for qualifying and short races. Typically <strong>C5</strong> compounds has red sidewalls, but also <strong>C3</strong>, <strong>C4</strong>, and <strong>C6</strong> can be used.",

    "The yellow tyre is the medium compound and offers a balance between performance and durability, providing moderate grip and longevity. It is typically used for longer stints than the soft tyre. <strong>C2</strong>, <strong>C3</strong>, <strong>C4</strong>, and <strong>C5</strong> are used with yellow sidewalls.",

    "The white tyre, known as the hard compound, offers maximum durability and longevity, ideal for long stints and hot conditions. Typically <strong>C1</strong> compounds has white sidewalls, but also <strong>C2</strong>, <strong>C3</strong>, and <strong>C4</strong> can be used."
];

function changeTyre(number) {
    let buttonList = document.getElementById("slickTyreButtons").querySelectorAll("button");
    let container = document.getElementById("tyreDescription");
    let heading = container.querySelector("h2");
    let image = document.getElementById("slickTyres").querySelector("img");
    let para = container.querySelector("p");

    image.style.opacity = 0;
    heading.style.opacity = 0;
    para.style.opacity = 0;

    setTimeout(() => {
        heading.innerHTML = tyreHeading[number];
        para.innerHTML = tyreContent[number];
        image.setAttribute("src", tyreImages[number]);

        buttonList.forEach(item => {
            item.style.borderBottom = "none"
        })

        buttonList[number].style.borderBottom = "solid 2px red";

        image.style.opacity = 1;
        heading.style.opacity = 1;
        para.style.opacity = 1;
    }, 500);
}

/******************************************************************************************** */

wet_tyre_cards = document.querySelectorAll(".wet_tyre_card");
wet_tyre_section = document.getElementById("wet_tyres");

let lastScrolled = 0
function show_wet_tyre_card(entries) {

    wet_tyre_position = wet_tyre_section.offsetTop;
    currentUserPosition = window.pageYOffset;
    scrollingUp = currentUserPosition < lastScrolled;

    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add("show_wet_tyre_card");
            }, index * 800);
        }
        else {
            if (scrollingUp && currentUserPosition < wet_tyre_position) {
                wet_tyre_cards.forEach(card => {
                    card.classList.remove("show_wet_tyre_card");
                });
            }
        }
    });

    lastScrolled = currentUserPosition;
}

const wetTyreObserver = new IntersectionObserver(show_wet_tyre_card, { threshold: 0.3 });
wet_tyre_cards.forEach(card => wetTyreObserver.observe(card));
