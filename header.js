class CommonHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initMobileMenu();
        this.highlightActiveLink();
    }

    render() {
        const accent = this.getAttribute('accent') || '#D4500A';
        this.style.setProperty('--header-accent', accent);

        this.innerHTML = `
            <nav class="common-nav">
                <a class="nav-logo" href="index.html">DSA <span>Zero→Hero</span></a>
                <ul class="nav-links">
                    <li><a href="index.html#foundations">Foundations</a></li>
                    <li><a href="index.html#structures">Structures</a></li>
                    <li><a href="index.html#algorithms">Algorithms</a></li>
                    <li><a href="real-world.html" class="special-link">🏭 Real World</a></li>
                    <li><a href="war-stories.html" class="special-link">🔥 Battles</a></li>
                </ul>
                <button class="hamburger" id="hbg" aria-label="Toggle menu">
                    <span></span><span></span><span></span>
                </button>
            </nav>
            <div class="mobile-drawer" id="drawer">
                <a href="index.html#foundations" class="drawer-link">Foundations</a>
                <a href="index.html#structures" class="drawer-link">Structures</a>
                <a href="index.html#algorithms" class="drawer-link">Algorithms</a>
                <a href="real-world.html" class="drawer-link">🏭 Real World</a>
                <a href="war-stories.html" class="drawer-link">🔥 Programming Battles</a>
            </div>
        `;
    }

    initMobileMenu() {
        const hbg = this.querySelector('#hbg');
        const drawer = this.querySelector('#drawer');
        if (!hbg || !drawer) return;

        hbg.addEventListener('click', () => {
            hbg.classList.toggle('open');
            drawer.classList.toggle('open');
            document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
        });

        const drawerLinks = drawer.querySelectorAll('a');
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                hbg.classList.remove('open');
                drawer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    highlightActiveLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        const links = this.querySelectorAll('.nav-links a, .drawer-link');

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === 'index.html' && href.startsWith('index.html#'))) {
                link.classList.add('active');
            }
        });
    }
}

customElements.define('common-header', CommonHeader);
