(() => {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        const footer = document.querySelector('footer');
        const loadInfo = document.createElement('p');
        loadInfo.textContent = `Page loaded in ${loadTime}ms`;
        loadInfo.style.color = '#333';
        footer.appendChild(loadInfo);
    });
})();


(() => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPage = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (linkPage === '' && currentPage === 'index.html')) {
            link.classList.add('active');
        }

        link.addEventListener('mouseover', () => {
            link.style.backgroundColor = '#f0f0f0';
        });

        link.addEventListener('mouseout', () => {
            link.style.backgroundColor = '';
        });
    });
})();
