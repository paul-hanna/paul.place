#!/usr/bin/env node
// build-seo.js — Generate SEO-optimized HTML pages, sitemap.xml, and robots.txt
// Run: node build-seo.js
//
// This reads the sections data from js/main.js and generates:
//   - Per-item HTML pages (e.g. /fallout/index.html) with proper meta tags + noscript content
//   - Section index pages (/film/, /multimedia/, /writing/, /about/)
//   - sitemap.xml
//   - robots.txt

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DOMAIN = 'https://paul.place';
const GA_ID = 'G-RD0WKDV1GD';
const PORTRAIT = 'images/works/paul-portrait.png';
const OG_IMAGE = 'images/og-image.png';
const BUILD_DATE = new Date().toISOString().split('T')[0];

// ── 1. Extract data from main.js ──────────────────────────────────────────────

const mainJs = fs.readFileSync(path.join(ROOT, 'js/main.js'), 'utf8');

const dataStart = mainJs.indexOf('const sections = {');
const dataEnd = mainJs.indexOf('// ─── PANEL LOGIC ───');

if (dataStart === -1 || dataEnd === -1) {
  console.error('Could not find data boundaries in main.js');
  process.exit(1);
}

const dataCode = mainJs.slice(dataStart, dataEnd);

let sections, slugMap;
try {
  const fn = new Function(dataCode + '\nreturn { sections, slugMap };');
  ({ sections, slugMap } = fn());
} catch (e) {
  console.error('Failed to evaluate data from main.js:', e.message);
  process.exit(1);
}

console.log(`Extracted ${Object.keys(slugMap).length} slugs from main.js`);

// ── 2. Helpers ────────────────────────────────────────────────────────────────

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#\d+;/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Remove the "For all professional inquiries" contact paragraph before schema/meta use
function stripContactParagraph(html) {
  if (!html) return html;
  return html.replace(/<p[^>]*>For all professional inquiries[\s\S]*?<\/p>/gi, '').trim();
}

// Extract ISO upload date from item — year from sub field, fall back to build date
function extractUploadDate(item) {
  if (item.sub) {
    const m = item.sub.match(/\b(20\d{2})\b/);
    if (m) return m[1] + '-01-01';
  }
  return BUILD_DATE;
}

function truncate(str, len) {
  if (!str) return '';
  if (str.length <= len) return str;
  return str.slice(0, len).replace(/\s+\S*$/, '') + '...';
}

function esc(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getDescription(item) {
  if (item.description) return truncate(stripHtml(stripContactParagraph(item.description)), 160);
  if (item.body) return truncate(stripHtml(stripContactParagraph(item.body)), 160);
  if (item.sub) return item.sub;
  return 'By Paul Hanna — director, writer, producer, and multimedia artist based in NYC.';
}

function getImage(item) {
  return item.image || (item.images && item.images[0]) || OG_IMAGE;
}

// ── 3. Shared schema ─────────────────────────────────────────────────────────

const PERSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Paul Hanna",
  "jobTitle": "Director, Producer, Writer, Multimedia Artist",
  "url": DOMAIN,
  "@id": DOMAIN + "#paulhanna",
  "image": DOMAIN + '/' + OG_IMAGE,
  "sameAs": [
    "https://www.linkedin.com/in/paulhanna361/",
    "https://github.com/paul-hanna",
    "https://www.imdb.com/name/nm13039736/",
    "https://www.instagram.com/p.aulhanna/",
    "https://x.com/paullhanna",
    "https://substack.com/@paulsplace",
    "https://www.youtube.com/@paullhanna",
    "https://vimeo.com/user206178305",
    "https://laidlawscholars.network/users/404754-paul-hanna",
    "https://muckrack.com/paul-hanna-1",
    "https://soundcloud.com/paul_hanna",
    "https://paul.tube/",
    "https://www.wikidata.org/wiki/Q139032793",
    "https://orcid.org/0009-0000-8347-679X"
  ],
  "description": "NYC-based director, producer, writer, and multimedia artist.",
  "birthDate": "2001-02-02",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "representative",
    "name": "Lit Entertainment Group",
    "telephone": "+1-310-988-7700",
    "areaServed": "US"
  }
}, null, 2);

function getSchemaType(sectionKey, item) {
  if (sectionKey === 'film') return 'VideoObject';
  if (sectionKey === 'multimedia' && item.embed) return 'VideoObject';
  if (sectionKey === 'writing' && item.bodyType === 'poetry') return 'Poem';
  if (sectionKey === 'writing') return 'BlogPosting';
  return 'CreativeWork';
}

function getOgType(sectionKey, item) {
  if (sectionKey === 'film' || (sectionKey === 'multimedia' && item.embed)) return 'video.other';
  if (sectionKey === 'writing') return 'article';
  return 'article';
}

function itemLd(item, slug, sectionKey) {
  const type = getSchemaType(sectionKey, item);
  const ld = {
    "@context": "https://schema.org",
    "@type": type,
    "name": item.title,
    "url": DOMAIN + '/' + slug,
    "author": { "@type": "Person", "name": "Paul Hanna", "@id": DOMAIN + "#paulhanna" },
    "inLanguage": "en"
  };
  if (type === 'VideoObject' || type === 'Film') {
    ld.director = { "@type": "Person", "name": "Paul Hanna", "@id": DOMAIN + "#paulhanna" };
  }
  if (type === 'VideoObject') {
    ld['@id'] = DOMAIN + '/' + slug + '#video';
    ld.uploadDate = extractUploadDate(item);
  }
  if (type === 'BlogPosting') ld.headline = item.title;
  const cleanBody = stripContactParagraph(item.body);
  // VideoObject: only use a real prose description — credit lines (sub) are not descriptions
  let desc;
  if (type === 'VideoObject') {
    desc = item.description ? truncate(stripHtml(stripContactParagraph(item.description)), 300) : null;
  } else {
    desc = item.description ? truncate(stripHtml(stripContactParagraph(item.description)), 300)
         : cleanBody ? truncate(stripHtml(cleanBody), 300)
         : item.sub || null;
  }
  if (desc) ld.description = desc;
  const itemImage = (item.image || (item.images && item.images[0]));
  ld.image = DOMAIN + '/' + (itemImage || OG_IMAGE);
  if (type === 'VideoObject') ld.thumbnailUrl = DOMAIN + '/' + (itemImage || OG_IMAGE);
  if (item.embed) ld.embedUrl = item.embed.replace(/\?autoplay=1/, '');
  if (type === 'Poem' && cleanBody) ld.text = stripHtml(cleanBody);
  if (type === 'BlogPosting' && cleanBody) ld.articleBody = truncate(stripHtml(cleanBody), 500);
  return JSON.stringify(ld, null, 2);
}

function breadcrumbLd(sectionKey, sectionTitle, itemTitle, slug) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Paul Hanna", "item": DOMAIN + "/" },
      { "@type": "ListItem", "position": 2, "name": sectionTitle, "item": DOMAIN + "/" + sectionKey },
      { "@type": "ListItem", "position": 3, "name": itemTitle, "item": DOMAIN + "/" + slug }
    ]
  }, null, 2);
}

function itemListLd(sectionKey, section) {
  const items = [];
  let position = 1;
  if (section.items) {
    for (const item of section.items) {
      if (item.group && item.children) {
        for (const child of item.children) {
          if (child._slug) {
            items.push({ "@type": "ListItem", "position": position++, "url": DOMAIN + '/' + child._slug, "name": child.title });
          }
        }
      } else if (item._slug) {
        items.push({ "@type": "ListItem", "position": position++, "url": DOMAIN + '/' + item._slug, "name": item.title });
      }
    }
  }
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": section.title,
    "url": DOMAIN + '/' + sectionKey,
    "itemListElement": items
  }, null, 2);
}

// ── 4. HTML template ──────────────────────────────────────────────────────────

const SPA_BODY = `
<video id="reel-video" src="reel.mp4" loop muted playsinline crossorigin="anonymous"></video>
<div class="corner-tl">paul.place</div>
<div class="center-name" id="center-name">
  Paul Hanna
  <div class="center-sub">Director / Writer / Producer / Multimedia Artist</div>
</div>
<a class="nav-label" id="nav-film" data-idx="01" data-section="film">Film</a>
<a class="nav-label" id="nav-multimedia" data-idx="02" data-section="multimedia">Multimedia</a>
<a class="nav-label" id="nav-writing" data-idx="03" data-section="writing">Writing</a>
<a class="nav-label" id="nav-about" data-idx="04" data-section="about">About</a>
<div class="bottom-info">
  <span>NYC &mdash; 2026</span>
  <a href="mailto:paul@paul.place">paul@paul.place</a>
</div>
<div class="panel-overlay" id="panel-overlay"></div>
<div class="panel" id="panel">
  <button class="panel-close" id="panel-close">&larr; back to frog</button>
  <div id="panel-content"></div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/DRACOLoader.js"></script>
<script src="js/main.js"></script>`;

function pageHtml({ title, description, canonical, ogImage, ogType, extraLds, noscriptContent }) {
  const ldBlocks = (extraLds || []).map(ld => `<script type="application/ld+json">\n${ld}\n</script>`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<base href="/">
<title>${esc(title)}</title>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');</script>
<script type="application/ld+json">
${PERSON_LD}
</script>
${ldBlocks}
<meta name="description" content="${esc(description)}">
<meta name="author" content="Paul Hanna">
<meta name="theme-color" content="#000000">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${ogType || 'article'}">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="paul.place">
<meta property="og:locale" content="en_US">
<meta property="og:image" content="${DOMAIN}/${ogImage || OG_IMAGE}">
<meta property="og:image:alt" content="${esc(title)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${DOMAIN}/${ogImage || OG_IMAGE}">
<meta name="twitter:site" content="@paullhanna">
<meta name="twitter:creator" content="@paullhanna">
<link rel="icon" href="frog_favicon.gif" type="image/gif">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@300;400;500;600;700;800;900&family=Instrument+Serif:ital@0;1&display=swap">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<noscript>
<div style="max-width:680px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;color:#1a1a1a">
${noscriptContent}
<hr style="margin:2rem 0;border:none;border-top:1px solid #ccc">
<p><a href="/">← paul.place</a></p>
</div>
</noscript>
${SPA_BODY}
</body>
</html>`;
}

// ── 5. Generate item pages ────────────────────────────────────────────────────

let generated = 0;
const allUrls = [{ loc: DOMAIN + '/', priority: '1.0', changefreq: 'weekly' }];

for (const [slug, entry] of Object.entries(slugMap)) {
  const section = sections[entry.sectionKey];
  let item;

  if (entry.childIdx !== undefined) {
    const group = section.items[entry.groupIdx];
    item = group.children[entry.childIdx];
  } else {
    item = section.items[entry.itemIdx];
  }

  if (!item || item.group) continue;

  // Build noscript content
  let nsc = `<h1>${esc(item.title)}</h1>\n`;
  if (item.sub) nsc += `<p><em>${esc(item.sub)}</em></p>\n`;
  if (item.image) nsc += `<img src="${item.image}" alt="${esc(item.title)}" style="max-width:100%;height:auto">\n`;
  if (item.description) nsc += `<p>${item.description}</p>\n`;
  if (item.body) {
    if (item.bodyType === 'poetry') {
      nsc += `<pre style="white-space:pre-wrap;font-family:system-ui,sans-serif">${esc(item.body)}</pre>\n`;
    } else {
      nsc += item.body + '\n';
    }
  }
  if (item.link) {
    nsc += `<p><a href="${item.link}">${item.linkLabel || 'View project'} →</a></p>\n`;
  }

  const sectionKey = entry.sectionKey;
  const dir = path.join(ROOT, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml({
    title: item.title + ' — Paul Hanna',
    description: getDescription(item),
    canonical: DOMAIN + '/' + slug,
    ogImage: getImage(item),
    ogType: getOgType(sectionKey, item),
    extraLds: [
      itemLd(item, slug, sectionKey),
      breadcrumbLd(sectionKey, sections[sectionKey].title, item.title, slug)
    ],
    noscriptContent: nsc,
  }));

  // Warn about VideoObject items missing a prose description
  if (getSchemaType(entry.sectionKey, item) === 'VideoObject' && !item.description) {
    console.warn(`  ⚠  Missing description on VideoObject: /${slug}`);
  }

  allUrls.push({ loc: DOMAIN + '/' + slug, priority: '0.7', changefreq: 'monthly' });
  generated++;
}

console.log(`Generated ${generated} item pages`);

// ── 6. Generate section index pages ───────────────────────────────────────────

const sectionPages = {
  film: {
    title: 'Film — Paul Hanna',
    desc: 'Narrative, experimental, and commercial directing work by Paul Hanna. Music videos, short films, and commercial projects.',
  },
  multimedia: {
    title: 'Multimedia — Paul Hanna',
    desc: 'Experimental video, web art, installation, and interactive work by Paul Hanna.',
  },
  writing: {
    title: 'Writing — Paul Hanna',
    desc: 'Poetry, journals, fiction, and screenplays by Paul Hanna. Published in the Michigan Quarterly Review.',
  },
};

for (const [key, meta] of Object.entries(sectionPages)) {
  const section = sections[key];
  let nsc = `<h1>${esc(section.title)}</h1>\n`;
  if (section.description) nsc += `<p>${esc(section.description)}</p>\n`;
  nsc += '<ul>\n';

  if (section.items) {
    for (const item of section.items) {
      if (item.group && item.children) {
        nsc += `<li><strong>${esc(item.title)}</strong>\n<ul>\n`;
        for (const child of item.children) {
          const s = child._slug;
          nsc += `  <li><a href="/${s}">${esc(child.title)}</a>`;
          if (child.sub) nsc += ` — ${esc(child.sub)}`;
          nsc += `</li>\n`;
        }
        nsc += '</ul></li>\n';
      } else {
        const s = item._slug;
        nsc += `<li><a href="/${s}">${esc(item.title)}</a>`;
        if (item.sub) nsc += ` — ${esc(item.sub)}`;
        nsc += `</li>\n`;
      }
    }
  }
  nsc += '</ul>\n';

  const dir = path.join(ROOT, key);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml({
    title: meta.title,
    description: meta.desc,
    canonical: DOMAIN + '/' + key,
    ogType: 'website',
    extraLds: [itemListLd(key, section)],
    noscriptContent: nsc,
  }));

  allUrls.push({ loc: DOMAIN + '/' + key, priority: '0.8', changefreq: 'weekly' });
}

// About page
const about = sections.about;
let aboutNsc = `<h1>About Paul Hanna</h1>\n`;
if (about.portrait) aboutNsc += `<img src="${about.portrait}" alt="Paul Hanna" style="max-width:200px">\n`;
aboutNsc += `<p>${esc(about.bio)}</p>\n`;
aboutNsc += '<h2>Education</h2>\n<ul>\n';
for (const e of about.education) {
  aboutNsc += `<li><strong>${esc(e.school)}</strong> — ${esc(e.degree)}</li>\n`;
}
aboutNsc += '</ul>\n';
aboutNsc += '<h2>Links</h2>\n<ul>\n';
for (const l of about.links) {
  aboutNsc += `<li><a href="${l.href}">${esc(l.label)}</a></li>\n`;
}
aboutNsc += '</ul>\n';
aboutNsc += `<p>Contact: <a href="mailto:${about.contact}">${about.contact}</a></p>\n`;

const aboutDir = path.join(ROOT, 'about');
fs.mkdirSync(aboutDir, { recursive: true });
fs.writeFileSync(path.join(aboutDir, 'index.html'), pageHtml({
  title: 'About — Paul Hanna',
  description: 'Paul Hanna is a first-generation Iraqi-Assyrian-American filmmaker, writer, director, and multimedia artist based in New York City.',
  canonical: DOMAIN + '/about',
  ogImage: OG_IMAGE,
  ogType: 'profile',
  extraLds: [],
  noscriptContent: aboutNsc,
}));

allUrls.push({ loc: DOMAIN + '/about', priority: '0.8', changefreq: 'monthly' });
console.log('Generated 4 section pages (film, multimedia, writing, about)');

// ── 7. Generate sitemap.xml ───────────────────────────────────────────────────

const today = new Date().toISOString().split('T')[0];
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

for (const u of allUrls) {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${u.loc}</loc>\n`;
  sitemap += `    <lastmod>${today}</lastmod>\n`;
  sitemap += `    <changefreq>${u.changefreq}</changefreq>\n`;
  sitemap += `    <priority>${u.priority}</priority>\n`;
  sitemap += `  </url>\n`;
}

sitemap += `</urlset>\n`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
console.log(`Generated sitemap.xml with ${allUrls.length} URLs`);

// ── 8. Generate robots.txt ────────────────────────────────────────────────────

const robots = `User-Agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml

# Block aggressive crawlers (matching existing Cargo site config)
User-Agent: CuteStat
Disallow: /

User-Agent: SemrushBot-BA
Disallow: /

User-Agent: SemrushBot-SI
Disallow: /

User-Agent: SemrushBot-SWA
Disallow: /

User-Agent: SemrushBot-CT
Disallow: /

User-Agent: SemrushBot-COUB
Disallow: /

User-Agent: MJ12bot
Disallow: /

User-Agent: PetalBot
Disallow: /

User-Agent: SiteAuditBot
Disallow: /

User-Agent: SplitSignalBot
Disallow: /

User-Agent: rogerbot
Disallow: /

User-Agent: dotbot
Disallow: /
`;

fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots);
console.log('Generated robots.txt');

console.log('\nDone! Run "node build-seo.js" again after updating content in main.js.');
