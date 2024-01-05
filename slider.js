let currentSlide = 0;
let intervalTime = Date.now();
let allTime = 5000;
let restTime;
let timeout;
let w;

const slider = document.querySelector('.row-slider');
const slides = document.querySelectorAll('.slide');
const controls = document.querySelectorAll('.control-bar');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

let animation = controls[0].animate(
    { width: '0%', width: '100%' },
    { duration: 5000, iterations: 1 }
);

function autoSlide() {
    animation.cancel();

    currentSlide = currentSlide === 2 ? 0 : currentSlide + 1;

    //После переключения
    animation = controls[currentSlide].animate(
        { width: '0%', width: '100%' },
        { duration: 5000, iterations: 1 }
    );

    const sliderOffsetLeft = slider.offsetLeft;
    const nextScrollLeft = slides[currentSlide].offsetLeft - sliderOffsetLeft;
    slider.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });
}

function startInterval() {
    intervalTime = Date.now();
    allTime = 5000;

    return setInterval(() => {
        autoSlide();
    }, 5000);
}

let interval = startInterval();

function moveSlide(isNext = false) {
    animation.cancel();

    if (isNext) {
        currentSlide = currentSlide === 2 ? 0 : currentSlide + 1;
    } else {
        currentSlide = currentSlide === 0 ? 2 : currentSlide - 1;
    }

    animation = controls[currentSlide].animate(
        { width: '0%', width: '100%' },
        { duration: 5000, iterations: 1 }
    );

    const sliderOffsetLeft = slider.offsetLeft;
    const nextScrollLeft = slides[currentSlide].offsetLeft - sliderOffsetLeft;
    slider.scrollTo({ left: nextScrollLeft, behavior: 'smooth' });

    clearInterval(interval);
    clearTimeout(timeout);
    interval = startInterval();
}

nextArrow.addEventListener('click', () => moveSlide(true));
prevArrow.addEventListener('click', () => moveSlide());
slides.forEach((s) => {
    s.addEventListener('mouseenter', () => {
        const diffTime = Date.now() - intervalTime;
        restTime = allTime - diffTime;
        allTime = restTime;
        clearInterval(interval);
        clearTimeout(timeout);

        animation.pause();
    });
    s.addEventListener('mouseleave', () => {
        intervalTime = Date.now();
        animation.play();

        timeout = setTimeout(() => {
            intervalTime = Date.now();
            allTime = 5000;
            autoSlide();
            interval = startInterval();
        }, restTime);
    });
});
