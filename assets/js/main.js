// ============================================
// SOLANA SNIPER DOCS - MAIN JAVASCRIPT
// ============================================

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            toggleBtn.textContent = next === 'dark' ? '🌙' : '☀️';
        });
        toggleBtn.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
    }
}

// Mobile Sidebar
function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('open');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
}

// Active Link Highlighting
function initActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.sidebar-link');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/' && link.getAttribute('href') === '/index')) {
            link.classList.add('active');
        }
    });
}

// Copy Code Buttons
function initCopyButtons() {
    document.querySelectorAll('pre').forEach(pre => {
        const btn = document.createElement('button');
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';
        btn.addEventListener('click', () => {
            const code = pre.querySelector('code').textContent;
            navigator.clipboard.writeText(code).then(() => {
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = 'Copy', 2000);
            });
        });
        pre.appendChild(btn);
    });
}

// Search Functionality
function initSearch() {
    const searchBox = document.getElementById('search-box');
    if (!searchBox) return;
    
    const searchData = [
        { title: 'Getting Started', url: '/getting-started', keywords: 'start, wallet, setup, begin' },
        { title: 'Wallet Setup', url: '/wallet', keywords: 'wallet, balance, export, private key, fund' },
        { title: 'Channel Monitoring', url: '/channels', keywords: 'channel, monitor, scrape, signal, add' },
        { title: 'Buying Tokens', url: '/trading#buying', keywords: 'buy, purchase, snipe, auto-buy' },
        { title: 'Selling Tokens', url: '/trading#selling', keywords: 'sell, profit, take profit, auto-sell' },
        { title: 'Portfolio', url: '/portfolio', keywords: 'portfolio, positions, pnl, track' },
        { title: 'Transfers', url: '/transfers', keywords: 'transfer, send, sol, token, withdraw' },
        { title: 'Settings', url: '/settings', keywords: 'settings, configure, slippage, buy amount' },
        { title: 'Referrals', url: '/referrals', keywords: 'referral, invite, earn, commission' },
        { title: 'Private Channels', url: '/private-channels', keywords: 'private, 2fa, auth, login, qr' },
        { title: 'Fees', url: '/fees', keywords: 'fee, whitelist, charge, cost' },
        { title: 'FAQ', url: '/faq', keywords: 'faq, question, help, issue, problem' },
        { title: 'API', url: '/api', keywords: 'api, hash' },
    ];
    function initLogo() {
    const logoIcons = document.querySelectorAll('.logo-icon');
    logoIcons.forEach(icon => {
        const img = new Image();
        img.onerror = function() {
            icon.classList.add('error');
        };
        img.src = '/assets/images/logo.png';
    });
}

    searchBox.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.keywords.includes(query)
        );
        
        // Show results dropdown
        let dropdown = document.getElementById('search-results');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.id = 'search-results';
            dropdown.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--bg-card);
                border: 1px solid var(--border-primary);
                border-radius: 8px;
                margin-top: 4px;
                max-height: 300px;
                overflow-y: auto;
                z-index: 1000;
                box-shadow: var(--shadow-lg);
            `;
            searchBox.parentElement.style.position = 'relative';
            searchBox.parentElement.appendChild(dropdown);
        }
        
        if (query && results.length > 0) {
            dropdown.innerHTML = results.map(r => `
                <a href="${r.url}" style="display: block; padding: 10px 16px; color: var(--text-primary); border-bottom: 1px solid var(--border-secondary);">
                    <strong>${r.title}</strong>
                </a>
            `).join('');
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    });
    
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('search-results');
        if (dropdown && !searchBox.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initSidebar();
    initActiveLink();
    initCopyButtons();
    initSearch();
});