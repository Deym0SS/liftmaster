document.addEventListener('DOMContentLoaded', () => {

    /* ================== MODAL ================== */
    const modalFormWrapper = document.getElementById('modalFormWrapper');
    const showFormBtn = document.getElementById('showFormBtn');
    const modalForm = document.getElementById('modalForm');
    const header = document.querySelector('header');

    // открыть форму
    showFormBtn?.addEventListener('click', () => {
        modalFormWrapper.classList.add('show');
        header.classList.add('is-hidden');
        document.body.style.overflow = 'hidden';
    });

    // закрыть по клику на фон
    modalFormWrapper?.addEventListener('click', (e) => {
        if (e.target === modalFormWrapper) {
            closeForm();
        }
    });

    // закрыть по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalFormWrapper.classList.contains('show')) {
            closeForm();
        }
    });

    // запрет закрытия при клике внутри формы
    modalForm?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // единая функция закрытия
    function closeForm() {
        modalFormWrapper.classList.remove('show');
        header.classList.remove('is-hidden');
        document.body.style.overflow = '';
    }

    /* ================== BRANDS MARQUEE ================== */
    const marquee = document.querySelector('.brands-marquee');
    if (marquee) {
        const originalList = marquee.querySelector('.brands-list');
        const clonedList = originalList.cloneNode(true);
        marquee.appendChild(clonedList);
    }


    /* ================== SWIPER ================== */
    new Swiper('.certificates-slider', {
        slidesPerView: 3,
        spaceBetween: 24,
        loop: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });


    /* ================== FANCYBOX ================== */
    Fancybox.bind('[data-fancybox]', {
        animated: true,
        hideScrollbar: true,

        on: {
            reveal: (fancybox) => {
                header.classList.add('is-hidden');
            },
            destroy: () => {
                header.classList.remove('is-hidden');
            }
        }
    });


    // ===== КНОПКА "ДАЛЕЕ / СВЕРНУТЬ" =====
document.querySelectorAll('.reviews-more').forEach(button => {
    button.addEventListener('click', () => {
        const wrapper = button
            .closest('.reviews-item-content')
            .querySelector('.reviews-item-text-wrapper');

        const isOpen = wrapper.classList.toggle('is-open');
        button.textContent = isOpen ? 'Свернуть' : 'Далее...';
    });
});


// ===== СЛАЙДЕР ОТЗЫВОВ =====
const reviews = document.querySelectorAll('.reviews-item');
const prevBtn = document.querySelector('.counter-prev');
const nextBtn = document.querySelector('.counter-next');
const currentEl = document.getElementById('currentReview');
const totalEl = document.getElementById('totalReviews');

let currentIndex = 0;
const total = reviews.length;

if (!total) return;

totalEl.textContent = total;

// 👉 получаем состояние текущего отзыва
const getReviewState = (index) => {
    const wrapper = reviews[index].querySelector('.reviews-item-text-wrapper');
    return wrapper?.classList.contains('is-open');
};

// 👉 применяем состояние к отзыву
const applyReviewState = (index, isOpen) => {
    const wrapper = reviews[index].querySelector('.reviews-item-text-wrapper');
    const button = reviews[index].querySelector('.reviews-more');

    if (!wrapper || !button) return;

    wrapper.classList.toggle('is-open', isOpen);
    button.textContent = isOpen ? 'Свернуть' : 'Далее...';
};

const updateReview = (prevState) => {
    reviews.forEach((item, index) => {
        item.classList.toggle('reviews-item-active', index === currentIndex);
    });

    // применяем состояние раскрытия
    applyReviewState(currentIndex, prevState);

    currentEl.textContent = currentIndex + 1;
};

// ===== PREV =====
prevBtn.addEventListener('click', () => {
    const prevState = getReviewState(currentIndex);

    currentIndex = (currentIndex - 1 + total) % total;
    updateReview(prevState);
});

// ===== NEXT =====
nextBtn.addEventListener('click', () => {
    const prevState = getReviewState(currentIndex);

    currentIndex = (currentIndex + 1) % total;
    updateReview(prevState);
});



    /* ===== Menu ===== */
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const logo = document.querySelector('.logo');

    const mobileMQ = window.matchMedia('(max-width: 767px)');
    const mobileMQ2 = window.matchMedia('(max-width: 560px)')

    toggle.addEventListener('click', () => {
        if (mobileMQ.matches & mobileMQ2.matches) {
            // 📱 МОБИЛКА — выезд справа
            mobileMenuWrapper.classList.toggle('active');
            toggle.style.display = 'none';
            logo.style.display = 'none';

            document.body.style.overflow =
                mobileMenuWrapper.classList.contains('active')
                    ? 'hidden'
                    : '';
        } else {
            // 📲 ПЛАНШЕТ / ДЕСКТОП — строка меню
            toggle.classList.toggle('is-open');
            nav.classList.toggle('is-open');
        }
    });

    /* кнопка закрытия */
    closeBtn.addEventListener('click', () => {
        mobileMenuWrapper.classList.remove('active');
        document.body.style.overflow = '';
        toggle.style.display = '';
        logo.style.display = '';
    });

    /* закрытие по клику на ссылку */
    document.querySelectorAll('.mobile-menu-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuWrapper.classList.remove('active');
            document.body.style.overflow = '';
            toggle.style.display = '';
            logo.style.display = '';
        });
    });

    /* закрытие при ресайзе */
    window.addEventListener('resize', () => {
        if (!mobileMQ.matches) {
            mobileMenuWrapper.classList.remove('active');
            document.body.style.overflow = '';
            toggle.style.display = '';
            logo.style.display = '';
        }
    });

});
