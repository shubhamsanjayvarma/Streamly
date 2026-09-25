/**
 * Streamly / Reference Assets Application Logic
 * Interactive handlers for the reference landing page:
 * - Mobile navigation menu toggle
 * - Streamer vs Supporter tab switching
 * - Interactive YouTube vs Direct UPI savings calculator
 * - Live Alertbox interactive preview simulator
 * - FAQ accordion expandable cards
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize calculator with default slider value if present
    const slider = document.getElementById('monthly-tips-slider');
    if (slider) {
        updateCalculator(slider.value);
        slider.addEventListener('input', (e) => {
            updateCalculator(e.target.value);
        });
    }

    // Initialize FAQ accordions
    initFaqAccordion();

    // Initialize Alert Simulator buttons
    initAlertSimulator();
});

/**
 * Mobile Navigation Toggle
 */
function toggleMobileMenu() {
    const nav = document.getElementById('main-nav-links');
    const toggleBtn = document.querySelector('.mobile-menu-btn');
    if (nav) {
        const isOpen = nav.classList.toggle('mobile-open');
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-expanded', String(isOpen));
        }
    }
}

/**
 * Switch Home Page Hero Tabs (Streamers vs Supporters)
 * @param {'streamers' | 'supporters'} tab
 */
function switchHomeTab(tab) {
    const streamersTab = document.getElementById('streamers-home-tab');
    const supportersTab = document.getElementById('supporters-home-tab');
    const buttons = document.querySelectorAll('.tab-btn');

    if (!streamersTab || !supportersTab) return;

    buttons.forEach((btn) => btn.classList.remove('active'));

    if (tab === 'supporters') {
        streamersTab.classList.remove('active');
        supportersTab.classList.add('active');
        if (buttons[1]) buttons[1].classList.add('active');
    } else {
        supportersTab.classList.remove('active');
        streamersTab.classList.add('active');
        if (buttons[0]) buttons[0].classList.add('active');
    }
}

/**
 * Update Fee Savings Calculator
 * Compares standard platform cuts (e.g. YouTube 30% take rate)
 * with Streamly Direct UPI (streamer keeps 95-100% of tips)
 * @param {number|string} val
 */
function updateCalculator(val) {
    const amount = parseFloat(val) || 0;
    const displayAmount = document.getElementById('calc-display-amount');
    const ytPayoutEl = document.getElementById('calc-yt-payout');
    const stzPayoutEl = document.getElementById('calc-stz-payout');
    const savingsMsgEl = document.getElementById('calc-savings-msg');

    if (displayAmount) {
        displayAmount.textContent = '₹' + Math.round(amount).toLocaleString('en-IN');
    }

    // YouTube Superchat keeps ~30% (creator receives 70%)
    const ytPayout = amount * 0.70;
    // Direct UPI platform fee (~5% standard or 0% direct)
    const stzPayout = amount * 0.95;
    const savings = stzPayout - ytPayout;

    if (ytPayoutEl) {
        ytPayoutEl.textContent = '₹' + Math.round(ytPayout).toLocaleString('en-IN');
    }
    if (stzPayoutEl) {
        stzPayoutEl.textContent = '₹' + Math.round(stzPayout).toLocaleString('en-IN');
    }
    if (savingsMsgEl) {
        savingsMsgEl.textContent = '🎉 You save ₹' + Math.round(savings).toLocaleString('en-IN') + ' every month with direct UPI!';
    }
}

/**
 * Quick Preset Button click for Calculator
 * @param {number|string} val
 */
function setCalcValue(val) {
    const slider = document.getElementById('monthly-tips-slider');
    if (slider) {
        slider.value = val;
        updateCalculator(val);
    }
}

/**
 * Interactive Alertbox Simulator
 * Allows user to trigger sample tipping alerts with simulated names and amounts
 */
function initAlertSimulator() {
    const demoTipper = document.getElementById('demo-tipper');
    const demoAmount = document.getElementById('demo-amount');
    const demoMessage = document.getElementById('demo-message');
    const alertBox = document.querySelector('.live-alert-card');

    if (!demoTipper || !alertBox) return;

    const sampleDonations = [
        { name: 'Aarav Sharma', amount: '₹500', msg: 'Clutch god! GG bro 🔥' },
        { name: 'Rohan Joshi', amount: '₹200', msg: 'Big fan of your headshots!' },
        { name: 'Ananya Verma', amount: '₹1,000', msg: 'Road to 100k subscribers! 🚀' },
        { name: 'Vikram Singh', amount: '₹350', msg: 'Next game with subscribers please' },
        { name: 'Sneha Patel', amount: '₹2,500', msg: 'Amazing stream as always! ❤️' }
    ];

    let currentIndex = 0;

    // Add a subtle click-to-preview trigger to the alert card
    alertBox.style.cursor = 'pointer';
    alertBox.title = 'Click to simulate a new live tipping alert!';

    alertBox.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % sampleDonations.length;
        const sample = sampleDonations[currentIndex];

        // Animate card pulse
        alertBox.style.transform = 'scale(1.03)';
        alertBox.style.transition = 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';

        setTimeout(() => {
            demoTipper.textContent = sample.name;
            if (demoAmount) demoAmount.textContent = sample.amount;
            if (demoMessage) demoMessage.textContent = sample.msg;
            alertBox.style.transform = 'scale(1)';
        }, 150);
    });
}

/**
 * Initialize FAQ Accordion Interactions
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item, .faq-card');
    faqItems.forEach((item) => {
        const question = item.querySelector('.faq-question, h3, h4');
        const answer = item.querySelector('.faq-answer, p');

        if (question && answer) {
            question.style.cursor = 'pointer';
            question.addEventListener('click', () => {
                const isExpanded = item.classList.toggle('open');
                question.setAttribute('aria-expanded', String(isExpanded));
            });
        }
    });
}

// Expose functions globally for inline onclick handlers in HTML
window.toggleMobileMenu = toggleMobileMenu;
window.switchHomeTab = switchHomeTab;
window.updateCalculator = updateCalculator;
window.setCalcValue = setCalcValue;
