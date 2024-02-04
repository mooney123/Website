function handleSearchEnter(event) {
    if (event.key === 'Enter') {
        const searchTerm = document.getElementById('searchBar').value;
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}
 let slideIndex = 0;
let intervalId; // Declare the intervalId outside the functions

function showSlides() {
const slides = document.getElementsByClassName("mySlides");
for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
}
slideIndex++;
if (slideIndex > slides.length) {
    slideIndex = 1;
}
slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
clearInterval(intervalId);
showSlides();
intervalId = setInterval(showSlides, 4000); // Restart the interval after changing the slide
}

showSlides();
intervalId = setInterval(showSlides, 4000);
