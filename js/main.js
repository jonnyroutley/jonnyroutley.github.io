
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {stickyNavbar()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

var mainPage = document.getElementsByTagName("main")[0]

// Add the sticky class to the navbar when you reach its scroll position. 
// Remove "sticky" when you leave the scroll position
// Add a top margin to the content
function stickyNavbar() {
    // Store the height of the navbar
    var navHeight = Math.ceil(navbar.getBoundingClientRect().height) + 37.2;

    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        mainPage.style.marginTop = navHeight + "px";
        // mainPage.classList.add("buffer");
    } 
    else {
        navbar.classList.remove("sticky");
        mainPage.style.marginTop = "0";
        // mainPage.classList.remove("buffer");
    }
}

