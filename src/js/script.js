document.addEventListener("DOMContentLoaded", function () {
    const productImage = document.querySelector('.product-image img');
    const originalWidth = productImage.width;
    const originalHeight = productImage.height;
    const zoomLevel = 2;

    productImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = productImage.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;

        const offsetX = mouseX * (zoomLevel - 1);
        const offsetY = mouseY * (zoomLevel - 1);

        const zoomWidth = originalWidth * zoomLevel;
        const zoomHeight = originalHeight * zoomLevel;

        productImage.style.transform = `scale(${zoomLevel})`;
        productImage.style.transformOrigin = `${mouseX}px ${mouseY}px`;
        productImage.style.transition = 'transform 0.2s ease-out';

        productImage.style.cursor = 'zoom-out';
    });

    productImage.addEventListener('mouseleave', () => {
        productImage.style.transform = 'none';
        productImage.style.cursor = 'zoom-in';
    });

    const carouselImages = document.querySelector('.carousel-images');
    const images = carouselImages.querySelectorAll('img');
    let currentIndex = 0;

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            productImage.src = image.src;
            currentIndex = index;
        });
    });

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    nextBtn.addEventListener('click', () => {
        currentIndex = Math.min(currentIndex + 1, images.length - 1);
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateCarousel();
    });

    function updateCarousel() {
        const imageWidth = images[currentIndex].width;
        const scrollX = images[currentIndex].offsetLeft - (carouselImages.offsetWidth - imageWidth) / 2;
        carouselImages.scrollTo({
            left: scrollX,
            behavior: 'smooth'
        });
    }
});


function createSnowflake() {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = Math.random() * window.innerWidth + "px";
    snowflake.style.animationDuration = Math.random() * 3 + 2 + "s";
    snowflake.style.opacity = Math.random();
    snowflake.innerHTML = "❆";

    document.querySelector(".snow-container").appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}


setInterval(createSnowflake, 100);
