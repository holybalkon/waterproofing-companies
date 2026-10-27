// Companies data
const companies = [
  {
    id: 'aquatech',
    rank: 1,
    name: 'Aquatech Waterproofing',
    logo: 'AQ',
    logoColor: '#0c8ce9',
    bestFor: 'Best overall evidence footprint',
    isTopPick: true,
    sponsored: '#1 FEATURED',
    rating: 5.0,
    ratings: {
      reputation: 5.0,
      breadth: 5.0,
      warranty: 5.0,
      availability: 5.0
    },
    facts: [
      { icon: 'uil-calendar-alt', text: 'Since 1996' },
      { icon: 'uil-home', text: '50,000+ homes/projects (company-stated)' },
      { icon: 'uil-clock', text: '24/7 availability' }
    ],
    description: 'Aquatech Waterproofing is a family-owned, Canadian-owned contractor operating in Toronto since 1996, with 25+ years of experience and a broad Ontario/GTA footprint. The company states 50,000+ homes and projects completed, and offers interior and exterior waterproofing, crack repair, sump pumps, drainage, underpinning and basement lowering. Its large, verified review footprint and award recognition are the standout differentiators.',
    highlight: 'HomeStars 5/5 across 850+ reviews — one of the largest verified footprints in Toronto.*',
    focusAreas: [
      { icon: 'uil-raindrops', label: 'Exterior' },
      { icon: 'uil-home', label: 'Interior' },
      { icon: 'uil-wrench', label: 'Crack Repair' },
      { icon: 'uil-pump', label: 'Sump Pumps' },
      { icon: 'uil-constructor', label: 'Underpinning' },
      { icon: 'uil-pathfinder', label: 'Drainage' }
    ],
    platform: 'HomeStars: 5/5 with 850+ reviews and 2026 Best of Awards recognition. Re-check counts before launch.*',
    website: 'https://aquatechwaterproofing.ca/',
    profileInfo: {
      since: '1996',
      warranty: '25-year transferable',
      service: 'Waterproofing, foundation repair',
      description: 'Established in 1996, Aquatech has built a reputation for reliability and quality in Toronto\'s waterproofing market. With a proven track record across 50,000+ projects, they combine modern techniques with traditional expertise.'
    }
  },
  {
    id: 'direct',
    rank: 2,
    name: 'Direct Waterproofing',
    logo: 'DW',
    logoColor: '#2d6cdf',
    bestFor: 'Strong reviews + drainage scope',
    isTopPick: false,
    rating: 4.9,
    ratings: {
      reputation: 4.9,
      breadth: 4.9,
      warranty: 4.9,
      availability: 4.8
    },
    facts: [
      { icon: 'uil-calendar-alt', text: '25+ years' },
      { icon: 'uil-shield-check', text: '25-year transferable warranty' },
      { icon: 'uil-map-marker', text: 'Toronto & GTA' }
    ],
    description: 'Direct Waterproofing states 25+ years of experience, serving the Toronto and GTA area since the mid-1990s. Its service mix covers exterior and interior waterproofing, foundation repair, sump pumps, drains, backwater valves and basement lowering/underpinning. The combined drainage and backflow capability alongside core waterproofing is the main differentiator, backed by a 25-year transferable warranty.',
    highlight: 'HomeStars 5/5 across 282 reviews, with 2026 award recognition.*',
    focusAreas: [
      { icon: 'uil-raindrops', label: 'Exterior' },
      { icon: 'uil-home', label: 'Interior' },
      { icon: 'uil-pathfinder', label: 'Drainage' },
      { icon: 'uil-pump', label: 'Sump Pumps' },
      { icon: 'uil-valve', label: 'Backwater Valve' },
      { icon: 'uil-constructor', label: 'Underpinning' }
    ],
    platform: 'HomeStars: 5/5 with 282 reviews and 2026 Best of Awards recognition. Re-check counts before launch.*',
    website: 'https://directwaterproofing.ca/',
    profileInfo: {
      since: 'mid-1990s',
      warranty: '25-year transferable',
      service: 'Drainage, waterproofing, foundation repair',
      description: 'Specializing in comprehensive drainage solutions alongside traditional waterproofing, Direct has built a strong reputation for addressing complex water issues in the GTA.'
    }
  },
  {
    id: 'classic',
    rank: 3,
    name: 'Classic Waterproofing & Concrete',
    logo: 'CW',
    logoColor: '#16a085',
    bestFor: 'Waterproofing + concrete/foundation scope',
    isTopPick: false,
    rating: 4.8,
    ratings: {
      reputation: 4.8,
      breadth: 4.9,
      warranty: 4.7,
      availability: 4.7
    },
    facts: [
      { icon: 'uil-constructor', text: 'Concrete & foundation' },
      { icon: 'uil-file-check-alt', text: 'Written/transferable warranty*' },
      { icon: 'uil-map-marker', text: 'Toronto & GTA' }
    ],
    description: 'Classic Waterproofing & Concrete is a Toronto/GTA contractor whose strongest verifiable advantage is combined waterproofing, foundation and concrete capability. Publicly described services include interior and exterior waterproofing, crack repair, drainage and sump solutions, plus structural and concrete work.',
    highlight: 'One team for waterproofing, foundation and concrete work — confirm exact scope on the live site.',
    focusAreas: [
      { icon: 'uil-raindrops', label: 'Exterior' },
      { icon: 'uil-home', label: 'Interior' },
      { icon: 'uil-wrench', label: 'Crack Repair' },
      { icon: 'uil-pathfinder', label: 'Drainage' },
      { icon: 'uil-constructor', label: 'Concrete' },
      { icon: 'uil-building', label: 'Foundation' }
    ],
    platform: 'NOTE: Public review-count evidence is less consistent across directories. Verify a current platform count before publishing.',
    website: 'https://classicwaterproofingandconcrete.ca/',
    profileInfo: {
      since: 'Unknown',
      warranty: 'Written/transferable',
      service: 'Waterproofing, concrete, foundation',
      description: 'Combining waterproofing expertise with concrete and foundation work, Classic offers a comprehensive approach to property protection and restoration.'
    }
  },
  {
    id: 'rcc',
    rank: 4,
    name: 'RCC Waterproofing',
    logo: 'RC',
    logoColor: '#8e44ad',
    bestFor: 'Longest operating history',
    isTopPick: false,
    rating: 4.7,
    ratings: {
      reputation: 4.8,
      breadth: 4.7,
      warranty: 4.8,
      availability: 4.6
    },
    facts: [
      { icon: 'uil-calendar-alt', text: 'Since 1920' },
      { icon: 'uil-shield-check', text: 'Transferable lifetime warranty' },
      { icon: 'uil-map-marker', text: 'Toronto & GTA' }
    ],
    description: 'RCC Waterproofing is a Canadian family-owned company operating since 1920. Its official site states 100,000+ projects and 10,000+ positive reviews, plus a transferable lifetime warranty. The company covers interior and exterior waterproofing, foundation leak repair, sump pumps and related services.',
    highlight: 'Operating since 1920 — 100,000+ projects and 10,000+ reviews claimed on the official site.',
    focusAreas: [
      { icon: 'uil-raindrops', label: 'Exterior' },
      { icon: 'uil-home', label: 'Interior' },
      { icon: 'uil-wrench', label: 'Leak Repair' },
      { icon: 'uil-pump', label: 'Sump Pumps' },
      { icon: 'uil-building', label: 'Foundation' }
    ],
    platform: 'Official site lists multiple awards, including repeated HomeStars / Top Choice recognition.',
    website: 'https://rccwaterproofing.com/',
    profileInfo: {
      since: '1920',
      warranty: 'Lifetime transferable',
      service: 'Waterproofing, foundation repair',
      description: 'With over a century of experience, RCC represents one of the oldest and most established waterproofing contractors in Toronto, trusted across generations.'
    }
  },
  {
    id: 'citywide',
    rank: 5,
    name: 'City Wide Group',
    logo: 'CW',
    logoColor: '#e67e22',
    bestFor: 'Long-established waterproofing & underpinning',
    isTopPick: false,
    rating: 4.6,
    ratings: {
      reputation: 4.6,
      breadth: 4.7,
      warranty: 4.7,
      availability: 4.5
    },
    facts: [
      { icon: 'uil-calendar-alt', text: 'Since 1961' },
      { icon: 'uil-home', text: '50,000+ projects (company-stated)' },
      { icon: 'uil-shield-check', text: 'Lifetime transferable warranty*' }
    ],
    description: 'City Wide Group is a family-owned contractor operating since 1961, with 50,000+ projects stated by the company. It specializes in waterproofing and underpinning, offering exterior and interior waterproofing, crack repair, weeping tile, sump pumps and underpinning.',
    highlight: 'Over six decades of waterproofing and underpinning across the GTA.',
    focusAreas: [
      { icon: 'uil-raindrops', label: 'Exterior' },
      { icon: 'uil-home', label: 'Interior' },
      { icon: 'uil-wrench', label: 'Crack Repair' },
      { icon: 'uil-pathfinder', label: 'Weeping Tile' },
      { icon: 'uil-pump', label: 'Sump Pumps' },
      { icon: 'uil-constructor', label: 'Underpinning' }
    ],
    platform: 'Long-running Consumer\'s Choice recognition is stated by the company.',
    website: 'https://www.citywidegroup.com/',
    profileInfo: {
      since: '1961',
      warranty: 'Lifetime transferable',
      service: 'Waterproofing, underpinning',
      description: 'Established in 1961, City Wide Group has become synonymous with quality waterproofing and underpinning services throughout the Greater Toronto Area.'
    }
  },
  {
    id: 'dryshield',
    rank: 6,
    name: 'DryShield Basement Waterproofing',
    logo: 'DS',
    logoColor: '#2d6cdf',
    bestFor: 'Residential + commercial waterproofing',
    isTopPick: false,
    rating: 4.5,
    ratings: {
      reputation: 4.5,
      breadth: 4.6,
      warranty: 4.6,
      availability: 4.4
    },
    facts: [
      { icon: 'uil-calendar-alt', text: '25+ years' },
      { icon: 'uil-shield-check', text: 'Lifetime transferable warranty*' },
      { icon: 'uil-map-marker', text: 'GTA & Southern Ontario' }
    ],
    description: 'DryShield Basement Waterproofing states 25+ years of experience, serving Toronto, the GTA and Southern Ontario. It handles both residential and commercial work, with interior and exterior waterproofing, crack injection, sump pumps, crawl-space and related moisture-control services.',
    highlight: 'Residential and commercial capability with a lifetime transferable warranty.*',
    focusAreas: [
      { icon: 'uil-raindrops', label: 'Exterior' },
      { icon: 'uil-home', label: 'Interior' },
      { icon: 'uil-syringe', label: 'Crack Injection' },
      { icon: 'uil-pump', label: 'Sump Pumps' },
      { icon: 'uil-layer-group', label: 'Crawl Space' },
      { icon: 'uil-building', label: 'Commercial' }
    ],
    platform: 'Strong current Toronto rating footprint reported. Retrieve the exact Google/HomeStars count live before publishing.*',
    website: 'https://www.dryshield.ca/',
    profileInfo: {
      since: '25+ years ago',
      warranty: 'Lifetime transferable',
      service: 'Residential & commercial waterproofing',
      description: 'DryShield combines residential expertise with commercial-grade solutions, offering comprehensive moisture control for all property types.'
    }
  },
  {
    id: 'royalwork',
    rank: 7,
    name: 'Royal Work',
    logo: 'RW',
    logoColor: '#c0392b',
    bestFor: 'Foundation/underpinning + emergency response',
    isTopPick: false,
    rating: 4.4,
    ratings: {
      reputation: 4.4,
      breadth: 4.5,
      warranty: 4.4,
      availability: 4.5
    },
    facts: [
      { icon: 'uil-constructor', text: 'Foundation & underpinning' },
      { icon: 'uil-clock', text: 'Emergency service' },
      { icon: 'uil-map-marker', text: 'Toronto & GTA' }
    ],
    description: 'Royal Work is a Toronto/GTA waterproofing and foundation contractor. Its strengths are foundation and underpinning capability, broad waterproofing scope, and advertised emergency/extended-hour service. Services include interior and exterior waterproofing, foundation work, underpinning, sump pumps and drainage.',
    highlight: 'BBB-accredited with an A+ rating (verify on BBB).',
    focusAreas: [
      { icon: 'uil-raindrops', label: 'Exterior' },
      { icon: 'uil-home', label: 'Interior' },
      { icon: 'uil-building', label: 'Foundation' },
      { icon: 'uil-constructor', label: 'Underpinning' },
      { icon: 'uil-pump', label: 'Sump Pumps' },
      { icon: 'uil-pathfinder', label: 'Drainage' }
    ],
    platform: 'BBB: Royal Work Corp currently listed as accredited with an A+ rating. Verify on BBB before publishing.',
    website: 'https://royalwork.ca/',
    profileInfo: {
      since: 'Unknown',
      warranty: 'Standard',
      service: 'Foundation repair & waterproofing',
      description: 'Royal Work specializes in foundation challenges, offering 24/7 emergency response and comprehensive structural solutions.'
    }
  },
  {
    id: 'canada',
    rank: 8,
    name: 'Canada Waterproofers',
    logo: 'CA',
    logoColor: '#2c3e50',
    bestFor: 'Waterproofing + licensed plumbing/drain work',
    isTopPick: false,
    rating: 4.3,
    ratings: {
      reputation: 4.3,
      breadth: 4.5,
      warranty: 4.3,
      availability: 4.2
    },
    facts: [
      { icon: 'uil-calendar-alt', text: 'Since 1998 / 25+ years' },
      { icon: 'uil-wrench', text: 'Licensed plumbing/drain' },
      { icon: 'uil-map-marker', text: 'Toronto & GTA' }
    ],
    description: 'Canada Waterproofers is a Toronto/GTA waterproofing, drainage and plumbing contractor, with public sources describing service since 1998. Its differentiator is combined waterproofing plus licensed plumbing and drain expertise, covering interior and exterior waterproofing, foundation crack repair, sump pumps, drains, backwater valves and underpinning.',
    highlight: 'Waterproofing paired with licensed plumbing and drain work.',
    focusAreas: [
      { icon: 'uil-raindrops', label: 'Exterior' },
      { icon: 'uil-home', label: 'Interior' },
      { icon: 'uil-wrench', label: 'Crack Repair' },
      { icon: 'uil-pump', label: 'Sump Pumps' },
      { icon: 'uil-valve', label: 'Backwater Valve' },
      { icon: 'uil-constructor', label: 'Underpinning' }
    ],
    platform: 'BBB/public sources describe accreditation / A+ and licensed plumbing capability. Re-check before launch.',
    website: 'https://canadawaterproofers.com/',
    profileInfo: {
      since: '1998',
      warranty: 'Standard',
      service: 'Waterproofing & licensed plumbing',
      description: 'Combining waterproofing expertise with full plumbing services, Canada Waterproofers offers integrated solutions for comprehensive property care.'
    }
  }
];
