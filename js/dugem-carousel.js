(function($) {
    'use strict';
    $(document).ready(function() {
        var swiper = new Swiper('.blog-loop .swiper-container', {
            spaceBetween: 30,
            loop: true,
            speed: 2000,
            centeredSlides:true,
            breakpoints: {
                480: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 50,
                },
                1200: {
                    slidesPerView: 2.5,
                    spaceBetween: 200,
                },
                1600: {
                    slidesPerView: 2.5,
                    spaceBetween: 300,
                }
            },
            pagination: {
                clickable: true,
                el: '.blog-loop .swiper-pagination',
            },

        });

        var swiper2 = new Swiper('.testimonial-block .swiper-container', {
            spaceBetween: 30,
            loop: true,
            speed: 2000,
            breakpoints: {
                480: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 1,
                },
                1024: {
                    slidesPerView: 1,
                },
                1200: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                }
            },
            pagination: {
                clickable: true,
                el: '.testimonial-block .swiper-pagination',
            },
            navigation: {
            nextEl: '.testimonial-block  .swiper-button-next',
            prevEl: '.testimonial-block  .swiper-button-prev',
            },
        });
     });
})(jQuery);