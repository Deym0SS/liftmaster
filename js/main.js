document.addEventListener('DOMContentLoaded', () => {

    /* ================== MODAL ================== */
    const modalFormWrapper = document.getElementById('modalFormWrapper');
    const showFormBtn = document.getElementById('showFormBtn');
    const modalForm = document.getElementById('modalForm');
    const header = document.querySelector('header');
    const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');

    // открыть форму
    showFormBtn?.addEventListener('click', () => { 
        modalFormWrapper.classList.add('show'); 
        header.classList.add('is-hidden'); 
        document.body.style.overflow = 'hidden'; 
        mobileMenuWrapper.style.display = 'none'; 
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

    const modalCloseBtn = modalFormWrapper.querySelector('.modal-close');
    modalCloseBtn?.addEventListener('click', closeForm);

    // единая функция закрытия
    function closeForm() {
        modalFormWrapper.classList.remove('show');
        header.classList.remove('is-hidden');
        document.body.style.overflow = '';
        mobileMenuWrapper.style.display = '';
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
    const closeBtn = document.querySelector('.mobile-menu-close');
    const logo = document.querySelector('.logo');

    const MOBILE_BREAKPOINT = 560;

    /* helpers */
    const isMobile = () => window.innerWidth <= MOBILE_BREAKPOINT;

    const openMobileMenu = () => {
        mobileMenuWrapper.classList.add('active');
        document.body.style.overflow = 'hidden';
        toggle.style.display = 'none';
        toggle.style.opacity = '0';
        logo.style.display = 'none';
    };

    const closeMobileMenu = () => {
        mobileMenuWrapper.classList.remove('active');
        document.body.style.overflow = '';
        toggle.style.display = '';
        toggle.style.opacity = '1';
        logo.style.display = '';
    };

    /* toggle button */
    toggle.addEventListener('click', () => {
        if (isMobile()) {
            mobileMenuWrapper.classList.contains('active')
                ? closeMobileMenu()
                : openMobileMenu();
        } else {
            toggle.classList.toggle('is-open');
            nav.classList.toggle('is-open');
        }
    });

    /* close button */
    closeBtn.addEventListener('click', closeMobileMenu);

    /* close on link click */
    document.querySelectorAll('.mobile-menu-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    /* close on resize */
    window.addEventListener('resize', () => {
        if (!isMobile()) {
            closeMobileMenu();
        }
    });

    /* ===== отправка форм ===== */
    document.querySelectorAll('.js-form').forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch('send.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.text();

                if (response.ok && result.trim() === 'OK') {
                    alert('Заявка успешно отправлена!');
                    form.reset();

                    if (typeof closeForm === 'function') {
                        closeForm();
                    }
                } else {
                    alert('Ошибка отправки. Попробуйте позже.');
                }
            } catch (err) {
                alert('Ошибка соединения с сервером');
            }
        });
    });

   document.querySelectorAll('.js-phone').forEach(input => {

        input.addEventListener('focus', () => {
            if (input.value === '') {
                input.value = '+7 ';
            }
        });

        input.addEventListener('input', () => {
            let digits = input.value.replace(/\D/g, '');

            // всегда начинаем с 7
            if (digits[0] !== '7') {
                digits = '7' + digits;
            }

            digits = digits.substring(0, 11); // +7 + 10 цифр

            let formatted = '+7';

            if (digits.length > 1) {
                formatted += ' (' + digits.substring(1, 4);
            }
            if (digits.length >= 5) {
                formatted += ') ' + digits.substring(4, 7);
            }
            if (digits.length >= 8) {
                formatted += '-' + digits.substring(7, 9);
            }
            if (digits.length >= 10) {
                formatted += '-' + digits.substring(9, 11);
            }

            input.value = formatted;
        });

        input.addEventListener('keydown', (e) => {
            // запрещаем удалить "+7"
            if ((e.key === 'Backspace' || e.key === 'Delete') && input.selectionStart <= 3) {
                e.preventDefault();
            }
        });

    });





});
