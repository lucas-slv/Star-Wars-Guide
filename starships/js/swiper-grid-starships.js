const swiper = new Swiper(".mySwiper", {
  slidesPerView: 4,
  grid: {
    rows: 2,
  },
  spaceBetween: 40,
  loop: false,
  fade: "true",
  grabCursor: "true",
  centerSlide: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      grid: {
        rows: 3,
      },
    },
    
    320: {
      slidesPerView: 2,
      grid: {
        rows: 3,
      },
    },

    768: {
      slidesPerView: 3,
      grid: {
        rows: 2,
      },
    },

    1024: {
      slidesPerView: 4,
      grid: {
        rows: 2,
      },
    },
  },
})