// Q&A accordion: click a question to expand/collapse its answer.
// SEO/GEO-safe — answers stay in the DOM at all times (collapsed via CSS grid-rows,
// never display:none), so crawlers and AI models can always read the full text.
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.qa-section .qa-item'));
  if (!items.length) return;

  // Open the first item by default so there is visible content on load.
  items[0].classList.add('open');

  items.forEach((item) => {
    const question = item.querySelector('.qa-question');
    if (!question) return;

    // Accessibility: make the heading behave like a button.
    question.setAttribute('role', 'button');
    question.setAttribute('tabindex', '0');
    question.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');

    const toggle = () => {
      const isOpen = item.classList.toggle('open');
      question.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    question.addEventListener('click', toggle);
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});
