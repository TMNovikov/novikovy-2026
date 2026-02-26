document.addEventListener('DOMContentLoaded', () => {
    const envelopeScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-content');
    const envelopeClick = document.getElementById('envelope-click');

    envelopeClick.addEventListener('click', () => {
        envelopeScreen.classList.add('fade-out');
        
        setTimeout(() => {
            envelopeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 800);
    });
});
