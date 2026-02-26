/**
 * Свадебное приглашение — интерактивность
 * Тимур и Алина, 23.04.2026
 */

document.addEventListener('DOMContentLoaded', () => {
    const FADE_DURATION = 800;
    const REVEAL_POINT = 150;
    const COUNTDOWN_INTERVAL = 1000;
    const WEDDING_DATE = new Date('2026-04-23T13:00:00+03:00');

    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    const envelopeClick = document.getElementById('envelope-click');
    const countdownEls = {
        days: document.getElementById('countdown-days'),
        hours: document.getElementById('countdown-hours'),
        minutes: document.getElementById('countdown-minutes'),
        seconds: document.getElementById('countdown-seconds'),
    };

    if (envelopeClick && envelopeScreen && mainContent) {
        envelopeClick.addEventListener('click', () => {
            envelopeScreen.classList.add('fade-out');
            setTimeout(() => {
                envelopeScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                initScrollReveal();
            }, FADE_DURATION);
        });
    }

    function updateCountdown() {
        const diff = WEDDING_DATE - Date.now();

        if (diff <= 0) {
            Object.values(countdownEls).forEach((el) => {
                if (el) el.textContent = '0';
            });
            return;
        }

        const totalSeconds = Math.floor(diff / 1000);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const totalHours = Math.floor(totalMinutes / 60);
        const hours = totalHours % 24;
        const days = Math.floor(totalHours / 24);
        const values = [days, hours, minutes, seconds];
        const keys = Object.keys(countdownEls);

        keys.forEach((key, i) => {
            const el = countdownEls[key];
            if (!el) return;
            el.textContent = values[i];
            el.classList.add('updating');
            setTimeout(() => el.classList.remove('updating'), 400);
        });
    }

    const hasCountdown = Object.values(countdownEls).every(Boolean);
    if (hasCountdown) {
        updateCountdown();
        setInterval(updateCountdown, COUNTDOWN_INTERVAL);
    }

    if (mainContent && !mainContent.classList.contains('hidden')) {
        initScrollReveal();
    }

    function initScrollReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');

        function reveal() {
            const threshold = window.innerHeight - REVEAL_POINT;
            reveals.forEach((el) => {
                if (el.getBoundingClientRect().top < threshold) {
                    el.classList.add('visible');
                }
            });
        }

        reveal();
        window.addEventListener('scroll', reveal, { passive: true });
    }
});
