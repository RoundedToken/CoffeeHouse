const burger = document.querySelector('.burger-div');
const burgerTop = document.querySelector('.burger-top');
const burgerBottom = document.querySelector('.burger-bottom');
const headerMenu = document.querySelector('.header-menu');
const burgerMenu = document.querySelector('.burger-menu');

function switchBurger() {
    const headerHeight = headerMenu.getBoundingClientRect().height;
    const windowHeight = document.body.offsetHeight;
    const isClose = burgerMenu.classList.contains('burger-open');

    burgerMenu.classList.toggle('burger-open');

    //Переключение кнопки бургера
    burgerTop.classList.toggle('burger-top-active');
    burgerBottom.classList.toggle('burger-bottom-active');

    //Скролл наверх
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    if (isClose) {
        //Убираем стили для body
        document.body.style.maxWidth = 'none';
        document.body.style.overflow = 'auto';
    } else {
        //Высота burger-menu
        burgerMenu.style.height = `${windowHeight - headerHeight}px`;
        burgerMenu.style.marginTop = `${headerHeight + 20}px`;

        //Стили для body
        document.body.style.maxWidth = '100vh';
        document.body.style.overflow = 'hidden';
    }
}

function closeBurger() {
    burgerMenu.classList.remove('burger-open');
    burgerTop.classList.remove('burger-top-active');
    burgerBottom.classList.remove('burger-bottom-active');
    document.body.style.maxWidth = 'none';
    document.body.style.overflow = 'auto';
}

//Закрываем бургер при переходе по ссылке
document.body.addEventListener(
    'click',
    (e) => e.target.classList.contains('menu-item') && switchBurger()
);

//Закрываем бургер и отменяем все стили при ширине > 768px
window.onresize = () => window.innerWidth > 768 && closeBurger();

burger.addEventListener('click', switchBurger);
