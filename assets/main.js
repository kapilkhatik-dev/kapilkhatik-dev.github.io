// Progressive enhancements only: every section and link works without this file.
const navLinks = [...document.querySelectorAll('.section-nav a[data-section]')];
const sections = navLinks.map(link => document.getElementById(link.dataset.section)).filter(Boolean);
if (sections.length && 'IntersectionObserver' in window) {
  const visible = new Map();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
    const first = sections.filter(section => visible.get(section.id)).at(-1);
    if (!first) return;
    for (const link of navLinks) {
      if (link.dataset.section === first.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-10% 0px -65% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
  navLinks.forEach(link => link.addEventListener('click', () => {
    for (const navLink of navLinks) {
      if (navLink === link) navLink.setAttribute('aria-current', 'location');
      else navLink.removeAttribute('aria-current');
    }
  }));
}
const copyButton = document.querySelector('.copy-email');
if (copyButton && navigator.clipboard && window.isSecureContext) {
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      status.textContent = 'Email copied.';
    } catch {
      status.textContent = 'Please use the email link above.';
    }
  });
}
