// Main functionality
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
});

function setupEventListeners() {
  // Visit site links
  document.addEventListener('click', (e) => {
    if (e.target.matches('a.visit')) {
      // Links work normally with href
    }

    // View profile buttons
    if (e.target.matches('.link-btn[data-company]')) {
      e.preventDefault();
      const companyId = e.target.getAttribute('data-company');
      openProfile(companyId);
    }

    // Close profile overlay
    if (e.target.matches('#profileOverlay') || e.target.matches('.profile-close')) {
      closeProfile();
    }

    // Get Started button
    if (e.target.matches('#getStarted')) {
      alert('Connect with our team to find the perfect waterproofing company for your project!');
    }
  });

  // Read More links
  document.addEventListener('click', (e) => {
    if (e.target.matches('.readmore')) {
      e.preventDefault();
      const card = e.target.closest('.card');
      const company = companies.find(c => c.id === card.dataset.company);
      if (company) {
        openProfile(company.id);
      }
    }
  });

  // Jump to list
  document.addEventListener('click', (e) => {
    if (e.target.matches('.jump')) {
      e.preventDefault();
      document.getElementById('company-list').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function openProfile(companyId) {
  const company = companies.find(c => c.id === companyId);
  if (!company) return;

  const profilePanel = document.getElementById('profilePanel');
  const overlay = document.getElementById('profileOverlay');

  profilePanel.innerHTML = createProfileHTML(company);
  overlay.classList.add('open');
  document.body.classList.add('profile-locked');

  // Attach close listener
  const closeBtn = profilePanel.querySelector('.profile-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeProfile);
  }

  // Attach action buttons listeners
  profilePanel.querySelectorAll('.pbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.classList.contains('primary')) {
        const isOurCompany = company.rank <= 3;
        if (isOurCompany) {
          window.location.href = company.website;
        } else {
          window.open(company.website, '_blank');
        }
      }
    });
  });
}

function closeProfile() {
  document.getElementById('profileOverlay').classList.remove('open');
  document.body.classList.remove('profile-locked');
}

function createProfileHTML(company) {
  const {
    name,
    logo,
    logoColor,
    rank,
    rating,
    ratings,
    profileInfo,
    focusAreas,
    platform,
    website,
    description,
    highlight
  } = company;

  const isOurCompany = rank <= 3;

  const starsHTML = (count) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < Math.floor(count) ? '★' : '☆';
    }
    return stars;
  };

  const focusChipsHTML = focusAreas
    .map(area => `
      <div class="chip">
        <i class="uil ${area.icon}"></i>
        ${area.label}
      </div>
    `)
    .join('');

  const visitBtn = isOurCompany
    ? `<a class="pbtn primary" href="${website}">VISIT WEBSITE <i class="uil uil-arrow-up-right"></i></a>`
    : `<a class="pbtn primary" href="${website}" target="_blank" rel="nofollow noopener noreferrer">VISIT WEBSITE <i class="uil uil-arrow-up-right"></i></a>`;

  return `
    <div class="profile-hero">
      <button class="profile-close"><i class="uil uil-times"></i></button>
      <div class="inner">
        <div class="profile-top">
          <div class="profile-logo" style="background:${logoColor}">${logo}</div>
          <div>
            <div class="profile-rankchip">#${rank} PICK</div>
            <div class="profile-name">${name}</div>
            <div class="profile-tagline">${profileInfo.service}</div>
          </div>
        </div>
        <div class="profile-scorebar">
          <div class="profile-score">
            <div class="num">${rating.toFixed(1)}</div>
            <div class="meta">Editorial<br>Rating</div>
          </div>
          <div class="profile-score">
            <div class="num">${ratings.reputation.toFixed(1)}</div>
            <div class="meta">Reputation<br>Score</div>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-body">
      <div class="profile-section">
        <h4>About</h4>
        <p>${profileInfo.description}</p>
      </div>

      <div class="profile-section">
        <h4>Company Facts</h4>
        <div class="profile-facts">
          <div class="pf">
            <i class="uil uil-calendar-alt"></i>
            <div>
              <div class="k">Operating Since</div>
              <div class="v">${profileInfo.since}</div>
            </div>
          </div>
          <div class="pf">
            <i class="uil uil-shield-check"></i>
            <div>
              <div class="k">Warranty</div>
              <div class="v">${profileInfo.warranty}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h4>Service Ratings</h4>
        <div class="profile-scores">
          <div class="srow">
            <span>Reputation</span>
            <div class="sv">
              ${ratings.reputation.toFixed(1)}
              <span class="stars">${starsHTML(ratings.reputation)}</span>
              <div class="bar"><span style="width: ${(ratings.reputation / 5) * 100}%"></span></div>
            </div>
          </div>
          <div class="srow">
            <span>Service Breadth</span>
            <div class="sv">
              ${ratings.breadth.toFixed(1)}
              <span class="stars">${starsHTML(ratings.breadth)}</span>
              <div class="bar"><span style="width: ${(ratings.breadth / 5) * 100}%"></span></div>
            </div>
          </div>
          <div class="srow">
            <span>Warranty / Trust</span>
            <div class="sv">
              ${ratings.warranty.toFixed(1)}
              <span class="stars">${starsHTML(ratings.warranty)}</span>
              <div class="bar"><span style="width: ${(ratings.warranty / 5) * 100}%"></span></div>
            </div>
          </div>
          <div class="srow">
            <span>Availability</span>
            <div class="sv">
              ${ratings.availability.toFixed(1)}
              <span class="stars">${starsHTML(ratings.availability)}</span>
              <div class="bar"><span style="width: ${(ratings.availability / 5) * 100}%"></span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h4>Focus Areas</h4>
        <div class="profile-services">
          ${focusChipsHTML}
        </div>
      </div>

      <div class="profile-actions">
        ${visitBtn}
        <button class="pbtn ghost">SHARE COMPANY</button>
      </div>
    </div>
  `;
}

// Close profile when clicking outside
document.addEventListener('click', (e) => {
  const overlay = document.getElementById('profileOverlay');
  if (e.target === overlay) {
    closeProfile();
  }
});
