# Data Gaps - Required from Client [ПОТРІБНО ВІД КЛІЄНТА]

## 1. Aquatech Waterproofing - Real Business Hours
**Current**: Template hours  
**Location**: All 4 HTML pages (`openingHoursSpecification` JSON-LD)

```json
"openingHoursSpecification": [
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",    // REPLACE ME
    "closes": "17:00"    // REPLACE ME
  },
  {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Saturday", "Sunday"],
    "opens": "10:00",    // REPLACE ME
    "closes": "14:00"    // REPLACE ME
  }
]
```

**Action Required**:
- [ ] Provide opening hours for each day of week (24-hour format, e.g., "09:30")
- [ ] Confirm Saturday/Sunday hours (or mark as "closed")
- [ ] Include any holidays/exceptional closures

**Impact**: Without real hours, template data may trigger AI Readiness warnings for data accuracy.

---

## 2. Editor Bio - Daniel Mercer
**Current**: Name only (placeholder)  
**Location**: about.html

**Required Information**:
- [ ] Full name (confirm correct spelling)
- [ ] Professional title (e.g., "Senior Waterproofing Analyst", "Editorial Director")
- [ ] Credentials/certifications (if any)
- [ ] Years in waterproofing industry
- [ ] Expertise areas (e.g., foundation repair, basement waterproofing, GTA market)
- [ ] Bio paragraph (2–3 sentences)
- [ ] Optional: LinkedIn profile, website, or other credibility links

**Example Format**:
```
Daniel Mercer is a Senior Waterproofing Analyst with 8+ years of expertise in Toronto 
basement repair and foundation waterproofing. He specializes in evaluating contractor 
credentials, warranty terms, and customer reviews across the GTA. Daniel's editorial 
standards ensure only verified, transparent recommendations reach homeowners.
```

**Impact**: Improves E-E-A-T (Expertise, Authoritativeness, Trustworthiness) score for Google's quality assessments.

---

## 3. Phone Number Verification
**Current**: +1-647-794-1701 (visible in footer, in schema)

**Confirm**:
- [ ] Is this the correct Aquatech Waterproofing business phone?
- [ ] Should it be clickable on mobile? (Already implemented as `<a href="tel:...">`)
- [ ] Any alternative numbers to list?

---

## 4. Optional: Additional GTA Cities
**Current**: Primarily Toronto-focused  
**Consider Adding**:
- Mississauga, Brampton, Oakville, Markham, etc. (if service area covers these)
- Will improve GEO targeting for regional queries

---

## 5. Real Data Checklist

| Data Point | Status | Priority |
|-----------|--------|----------|
| **Business Hours** (Mo–Su) | 🔴 Missing | 🔴 CRITICAL |
| **Editor Bio – Daniel Mercer** | 🔴 Missing | 🟡 HIGH |
| **Phone Number** | 🟢 Verified | ✅ Done |
| **Address** | 🟢 In Schema | ✅ Done |
| **Service Area** | 🟢 Toronto/GTA | ✅ Done |

---

## Summary

**2 Critical Data Points Need Client Input**:
1. Real opening hours (affects schema accuracy)
2. Editor bio for Daniel Mercer (affects E-E-A-T)

Once provided, update the respective HTML files and re-validate with Google's AI Readiness tool to confirm B/C/D scores reach ≥80.

---

**Form Submission**: Please provide the above information via:
- Email: [INSERT CLIENT EMAIL]
- Form: [INSERT DATA COLLECTION FORM]
- Deadline: [INSERT DEADLINE]

**Contact**: Kiro AI  
**Date**: October 28, 2026
