$(function () {
    $('.header__btn').on('click', function () {
        $('.rightside-menu').removeClass('rightside-menu--close');
    });
    $('.rightside-menu__close').on('click', function () {
        $('.rightside-menu').addClass('rightside-menu--close');
    });


    $('.header__btn-mobile').on('click', function () {
        $('.menu').toggleClass('menu--open');
    });
});


//настройка слайдера
$('.top__slider').slick({
    dots: true,
    arrows: false
    // autoplay: true
    // fade: true
});

//настройка слайдера на странице "Контакты"
$('.contact-slider').slick({
    slidesToShow: 10,
    slidesToScroll: 10,
    dots: true,
    arrows: false,
    responsive: [
        {
          breakpoint: 1701,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,   
          }
        },
        {
          breakpoint: 1360,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            dots: false,                   
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4, 
            dots: false,
          }
        },
        {
          breakpoint: 680,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2, 
            dots: false,
            }
          }
      ]
});

//настройка слайдера на странице "Blog"
$('.article-slider__box').slick({
    prevArrow: '<button type="button" class="article-slider__arrow article-slider__arrowleft"><img src="../img/page_blog/arrow_slider_left.svg" alt="arrow"></button>',
    nextArrow: '<button type="button" class="article-slider__arrow article-slider__arrowright"><img src="../img/page_blog/arrow_slider_right.svg" alt="arrow"></button>'
});

//настройка Mixitup в галерее (смена картинок при нажатии на кнопку)
var mixer = mixitup('.gallery__inner', {
    load: {
        filter: '.living'
    }
});

//адаптация
if ($(window).width() < 651) {
    $('.work-path__item--measurement').appendTo($('.work-path__items-box'));
}
  