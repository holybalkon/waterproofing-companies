// Profile-related functionality
// This file handles additional profile interactions

document.addEventListener('DOMContentLoaded', () => {
  // Add keyboard support for closing profile
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const overlay = document.getElementById('profileOverlay');
      if (overlay.classList.contains('open')) {
        closeProfile();
      }
    }
  });

  // Add smooth scrolling for jump links
  document.addEventListener('click', (e) => {
    if (e.target.matches('.jump')) {
      e.preventDefault();
      const listingElement = document.getElementById('company-list');
      if (listingElement) {
        listingElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });

  // Handle "Read More" expandable intro
  const moreLink = document.querySelector('.intro .more');
  if (moreLink) {
    let isExpanded = false;
    const intro = document.querySelector('.intro');
    const fullText = intro.innerHTML;

    moreLink.addEventListener('click', (e) => {
      e.preventDefault();
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        // Show full intro (in a real implementation, this would expand)
        moreLink.textContent = 'READ LESS -';
      } else {
        moreLink.textContent = 'READ MORE +';
      }
    });
  }
});

// Utility function to format numbers
function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

// Utility function to generate star rating
function generateStars(rating, size = 'medium') {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  
  let stars = '★'.repeat(fullStars);
  if (hasHalf) stars += '⭐'; // Half star representation
  stars += '☆'.repeat(emptyStars);
  
  return stars;
}

// Function to handle profile sharing
function shareCompany(companyName) {
  const shareText = `Check out ${companyName} - Top waterproofing company in Toronto`;
  
  if (navigator.share) {
    navigator.share({
      title: 'Top Waterproofing Companies in Toronto',
      text: shareText,
      url: window.location.href
    });
  } else {
    // Fallback: copy to clipboard
    const textarea = document.createElement('textarea');
    textarea.value = shareText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('Company info copied to clipboard!');
  }
}

// Analytics helper (for tracking interactions)
function trackEvent(action, label, value = null) {
  if (window.gtag) {
    gtag('event', action, {
      'event_category': 'engagement',
      'event_label': label,
      'value': value
    });
  }
}
