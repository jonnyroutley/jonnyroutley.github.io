
// When the user scrolls the page, execute myFunction 
window.onscroll = function() {stickyNavbar()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

var mainPage = document.getElementById("main_page")

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNavbar() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        mainPage.classList.add("buffer");
    } 
    else {
        navbar.classList.remove("sticky");
        mainPage.classList.remove("buffer");
    }
}

