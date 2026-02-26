document.addEventListener('DOMContentLoaded', () => {
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    const envelopeClick = document.getElementById('envelope-click');

    // Открытие приглашения по клику на конверт
    envelopeClick.addEventListener('click', () => {
        envelopeScreen.classList.add('fade-out');
        
        setTimeout(() => {
            envelopeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            initScrollReveal();
        }, 800);
    });

    // Счётчик обратного отсчёта до 23.04.2026 13:00 МСК
    const weddingDate = new Date('2026-04-23T13:00:00+03:00');
    const monthsEl = document.getElementById('countdown-months');
    const daysEl = document.getElementById('countdown-days');
    const minutesEl = document.getElementById('countdown-minutes');

    function updateCountdown() {
        const now = new Date();
        let diff = weddingDate - now;

        if (diff <= 0) {
            if (monthsEl) monthsEl.textContent = '0';
            if (daysEl) daysEl.textContent = '0';
            if (minutesEl) minutesEl.textContent = '0';
            return;
        }

        const totalMinutes = Math.floor(diff / (1000 * 60));
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const totalDays = Math.floor(totalHours / 24);
        const days = totalDays % 30;
        const months = Math.floor(totalDays / 30);
        const remainderMinutes = hours * 60 + minutes;

        if (monthsEl) {
            monthsEl.textContent = months;
            monthsEl.classList.add('updating');
            setTimeout(() => monthsEl.classList.remove('updating'), 400);
        }
        if (daysEl) {
            daysEl.textContent = days;
            daysEl.classList.add('updating');
            setTimeout(() => daysEl.classList.remove('updating'), 400);
        }
        if (minutesEl) {
            minutesEl.textContent = remainderMinutes;
            minutesEl.classList.add('updating');
            setTimeout(() => minutesEl.classList.remove('updating'), 400);
        }
    }

    if (monthsEl && daysEl && minutesEl) {
        updateCountdown();
        setInterval(updateCountdown, 60000);
    }

    if (mainContent && !mainContent.classList.contains('hidden')) {
        initScrollReveal();
    }

    // Scroll reveal — появление блоков при прокрутке
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        
        function reveal() {
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const revealPoint = 150;

                if (elementTop < windowHeight - revealPoint) {
                    el.classList.add('visible');
                }
            });
        }

        reveal();
        window.addEventListener('scroll', reveal);
    }
});
