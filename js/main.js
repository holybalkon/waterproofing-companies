// Main functionality
document.addEventListener('DOMContentLoaded', () => {
  renderCompanies();
  setupEventListeners();
});

function renderCompanies() {
  const listingContainer = document.getElementById('company-list');
  if (!listingContainer) return;

  companies.forEach((company) => {
    const cardHTML = createCardHTML(company);
    listingContainer.insertAdjacentHTML('beforeend', cardHTML);
  });

  // Add promo after first company
  const promoHTML = createPromoHTML();
  const firstCard = listingContainer.querySelector('.card');
  if (firstCard) {
    firstCard.insertAdjacentHTML('afterend', promoHTML);
  }

  // Add event listeners to all cards
  attachCardListeners();
}

function createCardHTML(company) {
  const {
    id,
    rank,
    name,
    logo,
    logoColor,
    bestFor,
    isTopPick,
    sponsored,
    rating,
    ratings,
    facts,
    description,
    highlight,
    focusAreas,
    platform,
    website
  } = company;

  let ribbonHTML = '';

  // Positions #1-#3 reflect project direction; the rest are competitors
  const isOurCompany = rank <= 3;

  if (isTopPick) {
    const linkAttrs = isOurCompany
      ? `href="${website}"`
      : `href="${website}" target="_blank" rel="nofollow noopener noreferrer"`;

    ribbonHTML = `
      <div class="pick-ribbon">
        <span class="pick-label"><i class="uil uil-trophy"></i> #1 PICK</span>
        <span class="pick-fact">Best overall evidence footprint</span>
        <span class="pick-fact">HomeStars 5/5 &middot; 850+ reviews*</span>
        <span class="pick-fact">Serving Toronto since 1996</span>
        <a class="visit" ${linkAttrs}>Visit site <i class="uil uil-arrow-up-right"></i></a>
      </div>
    `;
  }

  const starsHTML = (count) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < Math.floor(count) ? '★' : '☆';
    }
    return stars;
  };

  const focusAreasHTML = focusAreas
    .map(area => `
      <span class="i">
        <i class="uil ${area.icon}"></i>
        <span class="lbl">${area.label}</span>
      </span>
    `)
    .join('');

  const sponsorLabel = sponsored ? `<div class="sponsored">${sponsored}</div>` : '';

  // Visit site button
  const visitLink = isOurCompany
    ? `<a class="visit" href="${website}">Visit site <i class="uil uil-arrow-up-right"></i></a>`
    : `<a class="visit" href="${website}" target="_blank" rel="nofollow noopener noreferrer">Visit site <i class="uil uil-arrow-up-right"></i></a>`;

  return `
    <article class="card ${isTopPick ? 'top-pick' : ''}" data-company="${id}" data-rating="${rating}">
      ${ribbonHTML}
      <div class="rank">${rank}</div>
      <div class="card-head">
        <div class="card-logo" style="background:${logoColor}">${logo}</div>
        <div>
          <div class="card-name">${name}</div>
          <div class="best-for">Best for: <b>${bestFor}</b></div>
        </div>
        ${sponsorLabel}
      </div>

      <div class="card-body">
        <div class="ratings">
          <div class="overall">
            <div>
              <div class="label">Editorial Rating</div>
              <div class="count">Our score — not a platform rating</div>
            </div>
            <div class="score">${rating.toFixed(1)}</div>
          </div>
          <div class="rrow">
            <span>Reputation</span>
            <span class="right">${ratings.reputation.toFixed(1)} <span class="stars">${starsHTML(ratings.reputation)}</span></span>
          </div>
          <div class="rrow">
            <span>Service Breadth</span>
            <span class="right">${ratings.breadth.toFixed(1)} <span class="stars">${starsHTML(ratings.breadth)}</span></span>
          </div>
          <div class="rrow">
            <span>Warranty / Trust</span>
            <span class="right">${ratings.warranty.toFixed(1)} <span class="stars">${starsHTML(ratings.warranty)}</span></span>
          </div>
          <div class="rrow">
            <span>Availability</span>
            <span class="right">${ratings.availability.toFixed(1)} <span class="stars">${starsHTML(ratings.availability)}</span></span>
          </div>
          <div class="platform">
            <span class="tag">${platform.includes('HomeStars') ? 'LIVE PLATFORM' : platform.includes('BBB') ? 'LIVE PLATFORM' : 'NOTE'}</span><br>
            ${platform}
          </div>
        </div>

        <div class="detail">
          <div class="facts">
            ${facts.map(fact => `<span><i class="uil ${fact.icon}"></i> ${fact.text}</span>`).join('')}
          </div>
          <p>
            ${description}
            <span class="highlight"><i class="uil uil-award"></i> ${highlight}</span>
            <a class="readmore">Read More</a>
          </p>
          <div class="ind-title">FOCUS AREAS</div>
          <div class="inds">
            ${focusAreasHTML}
          </div>
          <div class="actions">
            <a class="link-btn" data-company="${id}">VIEW PROFILE</a>
            ${visitLink}
          </div>
        </div>
      </div>
    </article>
  `;
}

function createPromoHTML() {
  return `
    <div class="promo">
      <div class="icon"><i class="uil uil-raindrops"></i></div>
      <div>
        <h3>Get Connected With A Company For Free</h3>
        <p>Tell us about your project, and we'll match you with vetted Toronto waterproofing companies that meet your requirements.</p>
      </div>
      <button class="btn-site" id="getStarted">GET STARTED</button>
    </div>
  `;
}

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

    // Jump to list
    if (e.target.matches('.jump')) {
      e.preventDefault();
      const listingElement = document.getElementById('company-list');
      if (listingElement) {
        listingElement.scrollIntoView({ behavior: 'smooth' });
      }
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
}

function attachCardListeners() {
  // Event listeners attached via delegation in setupEventListeners
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
  if (overlay && e.target === overlay) {
    closeProfile();
  }
});
