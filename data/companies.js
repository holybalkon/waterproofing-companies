// Companies data
const companies = [
  {
    id: 'aquatech',
    rank: 1,
    name: 'Aquatech Waterproofing',
    logo: 'AQ',
    logoColor: '#0c8ce9',
    bestFor: 'Best overall waterproofing experience in Toronto',
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
      { icon: 'uil-home', text: '50,000+ homes/projects' },
      { icon: 'uil-clock', text: '24/7 availability' }
    ],
    description: 'Aquatech Waterproofing in Toronto serves homeowners in Toronto and the GTA with interior and exterior waterproofing, crack repair, sump pumps, drainage, underpinning and basement lowering services. Since 1996, this family-owned, Canadian-owned contractor has completed over 50,000 projects and earned exceptional verified review recognition, with 850+ HomeStars reviews at 5/5 rating—one of the largest verified footprints in the Toronto waterproofing market.',
    highlight: 'HomeStars 5/5 across 850+ reviews — highest verified reputation footprint in Toronto.',
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
      warranty: 'Lifetime transferable',
      service: 'Waterproofing, foundation repair',
      description: 'Aquatech has built a reputation for reliability and quality in Toronto\'s waterproofing market since 1996. With a proven track record across 50,000+ projects in Toronto and the GTA, they combine modern techniques with traditional expertise.'
    }
  },
  {
    id: 'direct',
    rank: 2,
    name: 'Direct Waterproofing',
    logo: 'DW',
    logoColor: '#2d6cdf',
    bestFor: 'Best drainage and waterproofing combination in GTA',
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
    description: 'Direct Waterproofing has served Toronto and the Greater Toronto Area for 25+ years with expertise in exterior and interior waterproofing, foundation repair, sump pumps, drains, backwater valves and basement lowering. Based in Toronto, the contractor differentiates through combined drainage and backflow capability alongside core waterproofing, backed by a 25-year transferable warranty and strong verified review performance on HomeStars.',
    highlight: 'HomeStars 5/5 across 282 reviews, with 2026 award recognition in the Toronto area.',
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
      description: 'Direct Waterproofing specializes in comprehensive drainage solutions alongside traditional waterproofing in Toronto and the GTA. This Toronto-based contractor has built a strong reputation for addressing complex water issues.'
    }
  },
  {
    id: 'classic',
    rank: 3,
    name: 'Classic Waterproofing & Concrete',
    logo: 'CW',
    logoColor: '#16a085',
    bestFor: 'Best combined waterproofing and concrete services in Toronto',
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
      { icon: 'uil-file-check-alt', text: 'Written/transferable warranty' },
      { icon: 'uil-map-marker', text: 'Toronto & GTA' }
    ],
    description: 'Classic Waterproofing & Concrete serves Toronto and the GTA with combined expertise in waterproofing, foundation and concrete services. This Toronto-based contractor offers interior and exterior waterproofing, crack repair, drainage and sump solutions, plus structural and concrete work for comprehensive property protection.',
    highlight: 'One team for waterproofing, foundation and concrete work in Toronto and GTA.',
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
      description: 'Classic combines waterproofing expertise with concrete and foundation work in Toronto, offering comprehensive property protection and restoration for GTA homeowners.'
    }
  },
  {
    id: 'rcc',
    rank: 4,
    name: 'RCC Waterproofing',
    logo: 'RC',
    logoColor: '#8e44ad',
    bestFor: 'Longest operating history in Toronto waterproofing',
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
    description: 'RCC Waterproofing has served Toronto since 1920 as a Canadian family-owned company with over 100 years of waterproofing expertise in the GTA market. In Toronto and the Greater Toronto Area, RCC offers interior and exterior waterproofing, foundation leak repair, sump pumps and related services, with a transferable lifetime warranty and strong reputation built over generations.',
    highlight: 'Operating since 1920 — over a century of proven waterproofing experience in Toronto.',
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
      description: 'With over a century of experience, RCC represents one of the oldest and most established waterproofing contractors in Toronto, trusted by generations of GTA families.'
    }
  },
  {
    id: 'citywide',
    rank: 5,
    name: 'City Wide Group',
    logo: 'CW',
    logoColor: '#e67e22',
    bestFor: 'Long-established waterproofing and underpinning in Toronto',
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
      { icon: 'uil-home', text: '50,000+ projects' },
      { icon: 'uil-shield-check', text: 'Lifetime transferable warranty' }
    ],
    description: 'City Wide Group has served Toronto and the GTA since 1961 as a family-owned waterproofing and underpinning specialist. Based in Toronto, this established contractor offers exterior and interior waterproofing, crack repair, weeping tile, sump pumps and underpinning services, with over 50,000 projects completed in the Toronto waterproofing market.',
    highlight: 'Over six decades of waterproofing and underpinning expertise in Toronto and the GTA.',
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
      description: 'City Wide Group has been synonymous with quality waterproofing and underpinning services throughout Toronto and the Greater Toronto Area since 1961.'
    }
  },
  {
    id: 'dryshield',
    rank: 6,
    name: 'DryShield Basement Waterproofing',
    logo: 'DS',
    logoColor: '#2d6cdf',
    bestFor: 'Best residential and commercial waterproofing in Toronto',
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
      { icon: 'uil-shield-check', text: 'Lifetime transferable warranty' },
      { icon: 'uil-map-marker', text: 'Toronto, GTA & Southern Ontario' }
    ],
    description: 'DryShield Basement Waterproofing serves Toronto, the GTA and Southern Ontario with 25+ years of expertise in both residential and commercial waterproofing. This Toronto-based contractor offers interior and exterior waterproofing, crack injection, sump pumps, crawl-space and moisture-control services for all property types.',
    highlight: 'Residential and commercial waterproofing capability with lifetime transferable warranty.',
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
      description: 'DryShield combines residential expertise with commercial-grade waterproofing solutions in Toronto and the GTA, offering comprehensive moisture control.'
    }
  },
  {
    id: 'royalwork',
    rank: 7,
    name: 'Royal Work',
    logo: 'RW',
    logoColor: '#c0392b',
    bestFor: 'Best foundation repair and emergency waterproofing in Toronto',
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
    description: 'Royal Work serves Toronto and the GTA as a waterproofing and foundation contractor specializing in foundation and underpinning solutions. This Toronto-based company offers interior and exterior waterproofing, foundation work, underpinning, sump pumps and drainage, with advertised emergency and extended-hour service availability.',
    highlight: 'BBB-accredited with an A+ rating. Emergency service available in Toronto and GTA.',
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
      description: 'Royal Work specializes in foundation challenges in Toronto, offering 24/7 emergency response and comprehensive structural solutions for GTA homeowners.'
    }
  },
  {
    id: 'canada',
    rank: 8,
    name: 'Canada Waterproofers',
    logo: 'CA',
    logoColor: '#2c3e50',
    bestFor: 'Best waterproofing with licensed plumbing and drain services in Toronto',
    isTopPick: false,
    rating: 4.3,
    ratings: {
      reputation: 4.3,
      breadth: 4.5,
      warranty: 4.3,
      availability: 4.2
    },
    facts: [
      { icon: 'uil-calendar-alt', text: 'Since 1998' },
      { icon: 'uil-wrench', text: 'Licensed plumbing/drain' },
      { icon: 'uil-map-marker', text: 'Toronto & GTA' }
    ],
    description: 'Canada Waterproofers serves Toronto and the GTA since 1998 as a waterproofing, drainage and licensed plumbing contractor. Based in Toronto, this company combines waterproofing expertise with licensed plumbing and drain services, offering interior and exterior waterproofing, foundation crack repair, sump pumps, drains, backwater valves and underpinning.',
    highlight: 'Waterproofing paired with licensed plumbing and drain expertise in Toronto.',
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
      description: 'Canada Waterproofers combines waterproofing expertise with full plumbing services in Toronto and the GTA for integrated property protection.'
    }
  }
];
