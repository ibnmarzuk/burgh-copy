import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const EMAIL = 'mustaphakadri@yahoo.co.uk'
const PHONE = '+234 803 849 3510'
const WHATSAPP = 'https://wa.me/2348038493510'
const ASSET_BASE = import.meta.env.BASE_URL

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/homes', label: 'Properties' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact Us' },
]

const values = [
  ['01', 'Integrity', 'We act with clarity, honesty and accountability.'],
  ['02', 'Quality', 'We care about the standard of every experience we deliver.'],
  ['03', 'Customer Focus', 'We listen carefully and build around real needs.'],
  ['04', 'Innovation', 'We stay open to better, smarter ways forward.'],
  ['05', 'Sustainability', 'We think beyond today to create responsible value.'],
  ['06', 'Excellence', 'We keep raising the bar in service and execution.'],
]

// Add future featured developments here; the homepage and Projects page render from this collection.
const projectPortfolio = [
  {
    id: 'ocean-breeze-estate', number: '01', title: 'Ocean Breeze Estate', type: '3-Bedroom Semi-Detached Duplex',
    description: 'A contemporary multi-level residence featuring light and grey wall finishes, dark-framed glazing, glazed balcony elements and interlocking-paved external areas.',
    image: 'assets/ocean-breeze/ocean-001.jpg', alt: 'Ocean Breeze Estate 3-bedroom semi-detached duplex exterior',
    gallery: ['assets/ocean-breeze/ocean-001.jpg', 'assets/ocean-breeze/ocean-002.jpg'], videos: [{ src: 'assets/ocean-breeze/ocean-breeze-estate-tour.mp4', title: 'Ocean Breeze Estate project video' }], hasDetails: true
  },
  {
    id: 'project-02', number: '02', title: 'Project 02', description: 'Project details, photos and videos will be added here.',
    image: null, alt: '', gallery: [], videos: [], hasDetails: false
  },
  {
    id: 'project-03', number: '03', title: 'Project 03', description: 'Project details, photos and videos will be added here.',
    image: null, alt: '', gallery: [], videos: [], hasDetails: false
  }
]

const featuredProjects = projectPortfolio.filter(project => project.hasDetails)

const galleryImages = projectPortfolio.flatMap(project => project.gallery.map((src, index) => ({ src, alt: `${project.title} — residential project image ${index + 1}`, title: project.title, projectId: project.id })))

const Arrow = ({ light = false }) => <span className={`arrow ${light ? 'arrow-light' : ''}`} aria-hidden="true">↗</span>

function ContactIcon({ type }) {
  const common = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.7', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }
  if (type === 'phone') return <svg {...common}><path d="M21 16.7v2.1a1.5 1.5 0 0 1-1.6 1.5 14.9 14.9 0 0 1-6.5-2.3 14.7 14.7 0 0 1-4.5-4.5 14.9 14.9 0 0 1-2.3-6.5A1.5 1.5 0 0 1 7.6 5h2.1a1.5 1.5 0 0 1 1.5 1.3c.1.8.3 1.6.6 2.3a1.5 1.5 0 0 1-.3 1.6l-.9.9a12 12 0 0 0 4.5 4.5l.9-.9a1.5 1.5 0 0 1 1.6-.3c.7.3 1.5.5 2.3.6A1.5 1.5 0 0 1 21 16.7Z" /></svg>
  if (type === 'whatsapp') return <svg {...common}><path d="M20.5 3.5A10.5 10.5 0 0 0 3.9 16.2L3 21l4.9-1A10.5 10.5 0 1 0 20.5 3.5Z" /><path d="M8.3 7.7c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.6.7c.5 1 1.4 1.8 2.5 2.4l.7-.6c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.3.6-.2.9-1 1.6-2 1.6-1.1 0-3-.9-4.5-2.3-1.5-1.4-2.4-3.2-2.4-4.3 0-.6.2-1 .3-1.2Z" /></svg>
  if (type === 'email') return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m4 7 8 6 8-6" /></svg>
  return <svg {...common}><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.6" cy="6.7" r=".8" fill="currentColor" stroke="none" /></svg>
}

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '')

function getAppPath() {
  const pathname = window.location.pathname
  if (BASE_PATH && pathname.startsWith(BASE_PATH)) {
    const appPath = pathname.slice(BASE_PATH.length)
    return appPath || '/'
  }
  return pathname || '/'
}

function navigate(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const destination = `${BASE_PATH}${cleanPath}` || '/'
  window.history.pushState({}, '', destination)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Logo() {
  return (
    <button className="logo" onClick={() => navigate('/')} aria-label="BURGH home">
      <img className="logo-image" src={`${ASSET_BASE}burgh-logo.svg`} alt="BURGH" />
    </button>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const path = getAppPath()
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">
          <span></span><span></span>
        </button>
        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
          {navItems.map(item => (
            <button key={item.path} className={path === item.path ? 'active' : ''} onClick={() => { navigate(item.path); setOpen(false) }}>{item.label}</button>
          ))}
          <button className="header-cta" onClick={() => { navigate('/contact'); setOpen(false) }}>Make an enquiry <Arrow /></button>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>Residential property. Better places to call home.</p>
        </div>
        <div className="footer-links">
          <span className="eyebrow">Explore</span>
          {navItems.slice(1).map(item => <button key={item.path} onClick={() => navigate(item.path)}>{item.label}</button>)}
        </div>
        <div className="footer-contact">
          <span className="eyebrow">Start a conversation</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href="tel:+2348038493510">{PHONE}</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} BURGH HOMES. All rights reserved.</span>
        <span>Homes <i></i> Living <i></i> Future</span>
      </div>
    </footer>
  )
}

function PageIntro({ eyebrow, title, description, tone = 'navy' }) {
  return (
    <section className={`page-intro ${tone}`}>
      <div className="container page-intro-inner">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  )
}

function Values() {
  return (
    <section className="values-section section-pad">
      <div className="container">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">The BURGH HOMES standard</span><h2>Built on principles<br />that <em>last.</em></h2></div>
          <p>Quality, integrity and customer care guide the way we approach every home and every property conversation.</p>
        </div>
        <div className="values-grid">
          {values.map(([num, title, copy]) => <div className="value-item" key={title}><span className="value-number">{num}</span><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </div>
    </section>
  )
}

function Home() {
  const focusCards = [
    {
      number: '01',
      title: 'Affordable housing',
      copy: 'Thoughtful homeownership opportunities designed around practical needs and budgets.',
      image: 'assets/gallery/IMG_20261110_143136_220.jpg',
      alt: 'Residence representing affordable homeownership'
    },
    {
      number: '02',
      title: 'Luxury residential development',
      copy: 'Premium homes that bring together modern design, comfort and lasting value.',
      image: 'assets/gallery/Screenshot_2026-11-10-14-30-47-267_org.telegram.messenger-edit.jpg',
      alt: 'Modern luxury residential property'
    },
    {
      number: '03',
      title: 'Residential property sales',
      copy: 'Property options and guidance for individuals, families and real estate investors.',
      image: 'assets/gallery/IMG_20261110_143136_363.jpg',
      alt: 'Residential property available for homeowners and investors'
    }
  ]

  const focusItems = [
    ['01', 'Affordable homes', 'More accessible homeownership opportunities.'],
    ['02', 'Luxury residences', 'Comfort, thoughtful design and quality living.'],
    ['03', 'Property sales', 'Residential options for buyers and investors.'],
    ['04', 'Investment opportunities', 'Property decisions with long-term value in mind.']
  ]

  return <>
    <section className="hero homes-home-hero">
      <div className="hero-image"></div>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <span className="eyebrow hero-eyebrow">BURGH HOMES / RESIDENTIAL REAL ESTATE</span>
        <h1>Find your place.<br /><span>Build your future.</span></h1>
        <p>From accessible homeownership to premium residential living, BURGH HOMES creates property opportunities shaped around the way people want to live.</p>
        <div className="hero-actions">
          <button className="button button-gold" onClick={() => navigate('/homes')}>Explore our homes <Arrow light /></button>
          <button className="button button-outline-light" onClick={() => navigate('/contact?division=homes')}>Talk to our team <Arrow light /></button>
        </div>
      </div>
      <div className="hero-stamp"><span>01</span><span>BURGH HOMES<br />Thoughtful living<br />Lasting value</span></div>
    </section>

    <section className="home-services-strip" aria-label="BURGH HOMES property focus">
      <div className="container home-services-grid">
        {focusItems.map(([number, title, copy]) => (
          <button className="home-service-item" key={number} onClick={() => navigate('/homes')}>
            <span className="home-service-number">{number}</span>
            <span className="home-service-title">{title}</span>
            <span className="home-service-copy">{copy}</span>
          </button>
        ))}
      </div>
    </section>

    <section className="section-pad home-about-section">
      <div className="container home-about-grid">
        <div className="home-about-visual">
          <img src={`${ASSET_BASE}assets/gallery/IMG_20261110_143136_606.jpg`} alt="Residential interior representing better living" />
          <span className="home-image-caption">BURGH HOMES / OUR APPROACH</span>
        </div>
        <div className="home-about-copy">
          <span className="eyebrow">ABOUT BURGH HOMES</span>
          <h2>Built around better living and <em>lasting value.</em></h2>
          <p className="lead">A home is more than a building. It is where life happens, families grow and futures take shape.</p>
          <p>BURGH HOMES is focused on affordable housing, luxury residential development and property sales. We bring together thoughtful planning, modern design and a customer-focused approach to help people make confident property decisions.</p>
          <button className="text-link" onClick={() => navigate('/about')}>Learn more about us <Arrow /></button>
        </div>
      </div>
    </section>

    <section className="home-focus-section">
      <div className="container">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">WHAT WE FOCUS ON</span><h2>Property options for<br /><em>different ambitions.</em></h2></div>
          <p>Whether you are taking your first step towards homeownership or exploring a premium residence, discover the areas where BURGH HOMES can help.</p>
        </div>
        <div className="home-focus-grid">
          {focusCards.map(card => (
            <article className="home-focus-card" key={card.number}>
              <div className="home-focus-image">
                <img src={`${ASSET_BASE}${card.image}`} alt={card.alt} loading="lazy" />
                <span>{card.number}</span>
              </div>
              <div className="home-focus-copy">
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <button className="text-link" onClick={() => navigate('/homes')}>Explore this area <Arrow /></button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="featured-projects-section section-pad">
      <div className="container">
        <div className="section-heading split-heading"><div><span className="eyebrow">Featured projects</span><h2>Places shaped for<br /><em>better living.</em></h2></div><p>Explore Ocean Breeze Estate, a 3-bedroom semi-detached duplex presented through its exterior architectural photography.</p></div>
        <div className="project-card-grid">{featuredProjects.map(project => <article className="project-card" key={project.id}><div className="project-card-image"><img src={`${ASSET_BASE}${project.image}`} alt={project.alt} loading="lazy" /><span>{project.number}</span></div><div className="project-card-copy"><span className="project-status">FEATURED PROJECT</span><h3>{project.title}</h3><button className="text-link" onClick={() => navigate('/projects')}>View project details <Arrow /></button></div></article>)}</div>
      </div>
    </section>

    <Values />

    <section className="cta-band homes-cta">
      <div className="container cta-inner">
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h2>Let’s find a place<br /><em>to call yours.</em></h2>
        <button className="button button-light" onClick={() => navigate('/contact?division=homes')}>Make a property enquiry <Arrow /></button>
      </div>
    </section>
  </>
}

function About() {
  return <>
    <PageIntro eyebrow="About BURGH HOMES" title={<>A better place to<br /><em>build your future.</em></>} description="BURGH HOMES is a residential real estate development and housing company focused on creating affordable and luxury homes for individuals, families, professionals and investors." />
    <section className="section-pad about-overview">
      <div className="container about-overview-grid">
        <div className="about-visual" role="img" aria-label="Contemporary residential architecture surrounded by greenery"><span>BURGH HOMES / OUR PERSPECTIVE</span></div>
        <div className="narrow-copy">
          <span className="eyebrow">Our perspective</span>
          <h2>Thoughtfully planned.<br /><em>Made for living.</em></h2>
          <p className="lead">We believe a home should offer more than a place to stay. It should support comfort, belonging, opportunity and long-term value.</p>
          <p>Our focus spans affordable housing, luxury residential development and property sales. We aim to make quality homeownership more accessible while creating well-considered places where people and communities can thrive.</p>
        </div>
      </div>
    </section>
    <section className="vision-mission">
      <div className="container vm-grid">
        <div className="vm-card"><span className="eyebrow">Our vision</span><p>To be a trusted real estate company recognised for quality homes, thoughtful residential developments and a meaningful contribution to better living standards.</p></div>
        <div className="vm-card gold"><span className="eyebrow">Our mission</span><p>To develop and present quality residential properties that create accessible homeownership opportunities, exceptional living experiences and lasting value for homeowners and investors.</p></div>
      </div>
    </section>
    <Values />
    <section className="cta-band homes-cta">
      <div className="container cta-inner"><span className="eyebrow">Let’s talk about your next move</span><h2>Let’s find the right<br /><em>place for you.</em></h2><button className="button button-light" onClick={() => navigate('/contact?division=homes')}>Talk to BURGH HOMES <Arrow /></button></div>
    </section>
  </>
}

const homesAreas = [
  ['01', 'Affordable housing', 'BURGH HOMES is committed to making quality homeownership more accessible to low- and middle-income earners through cost-conscious residential developments.', ['Affordable homeownership opportunities', 'Modern, functional housing solutions', 'Flexible payment and financing options', 'Secure, well-planned communities', 'Durable and sustainable building standards']],
  ['02', 'Luxury residential development', 'Premium homes for discerning homeowners and investors, combining contemporary architecture, refined finishes, comfort and long-term value.', ['Contemporary architectural designs', 'High-end finishes and fittings', 'Smart-home technologies', 'Exclusive residential estates', 'Premium amenities and lifestyle facilities', 'Prime locations and investment opportunities']],
  ['03', 'Residential property sales', 'Residential property opportunities for first-time buyers, growing families, professionals and investors, supported by clear information and professional guidance.', ['Affordable and luxury property options', 'Buyer guidance and property information', 'Viewing and enquiry coordination', 'Opportunities for homeowners and investors']],
]

function Homes() {
  return <>
    <section className="division-hero homes-hero"><div className="division-hero-image"></div><div className="division-hero-shade"></div><img className="homes-brand-logo" src={`${ASSET_BASE}assets/burgh-homes-logo.svg`} alt="BURGH Homes logo" /><div className="container division-hero-content"><span className="eyebrow">BURGH HOMES</span><h1>BURGH<br /><em>HOMES</em></h1><p>A better place to call home.</p><div className="division-hero-actions"><button className="button button-gold" onClick={() => navigate('/contact?division=homes')}>Make a homes enquiry <Arrow light /></button></div></div></section>
    <section className="section-pad division-intro"><div className="container intro-grid"><div><span className="eyebrow">The homes perspective</span><h2>More than a building.<br /><em>A place to build a future.</em></h2></div><div><p className="lead">BURGH HOMES is a residential real estate development and housing company focused on affordable and luxury homes for individuals, families, professionals and investors.</p><p>We develop thoughtfully planned residential properties that bring together comfort, functionality, modern architecture and long-term value. Our work is guided by the belief that everyone deserves access to quality housing, whether buying a first home, moving into a premium residence or investing in real estate.</p><button className="text-link" onClick={() => navigate('/contact')}>Talk to BURGH HOMES <Arrow /></button></div></div></section>
    <section className="areas-section"><div className="container"><div className="section-heading split-heading"><div><span className="eyebrow">Our core business areas</span><h2>Room for every<br /><em>kind of ambition.</em></h2></div><p>From accessible opportunities to premium residential environments, our focus stays on thoughtful choices and long-term value.</p></div><div className="areas-list">{homesAreas.map(([num, title, copy, bullets]) => <article className={`area-row area-row-${num}`} key={title}><span className="area-num">{num}</span><div className="area-visual" role="img" aria-label={title}></div><div className="area-main"><h3>{title}</h3><p>{copy}</p></div><ul>{bullets.map(b => <li key={b}>{b}</li>)}</ul></article>)}</div></div></section>
    <section className="section-pad homes-values"><div className="container value-split"><div><span className="eyebrow">Our promise</span><h2>Homeownership should feel <em>possible.</em></h2></div><div><p className="lead">We are building a balanced portfolio of affordable and luxury residential developments that respond to changing housing needs. By combining quality construction, innovative design, strategic locations and customer-focused solutions, BURGH HOMES aims to create places where people can live, grow and thrive.</p><p>Our focus is on improving living standards, supporting sustainable urban growth and creating lasting value for homeowners, investors and communities.</p><div className="mini-values">{['Integrity', 'Quality', 'Customer Focus', 'Innovation', 'Sustainability', 'Excellence'].map(v => <span key={v}>{v}</span>)}</div></div></div></section>
    <section className="vision-mission homes-vision-mission"><div className="container vm-grid"><div className="vm-card"><span className="eyebrow">Our vision</span><p>To be a leading real estate company, transforming lives through affordable and luxury homes that inspire communities and elevate living standards.</p></div><div className="vm-card gold"><span className="eyebrow">Our mission</span><p>To develop high-quality residential properties that create accessible homeownership opportunities, exceptional living experiences and sustainable returns for homeowners, investors and stakeholders.</p></div></div></section>
    <section className="section-pad homes-values"><div className="container"><div className="section-heading split-heading"><div><span className="eyebrow">Strategic focus</span><h2>Affordable access.<br /><em>Lasting value.</em></h2></div><p>BURGH HOMES is shaping a balanced residential portfolio through quality construction, thoughtful design, strategic locations and customer-centred solutions.</p></div><div className="value-split"><div><h3>Homes that move communities forward.</h3></div><div><p className="lead">Through affordability, luxury and community building, BURGH HOMES seeks to contribute meaningfully to housing development and sustainable urban growth.</p></div></div></div></section>
    <section className="cta-band homes-cta"><div className="container cta-inner"><span className="eyebrow">BURGH HOMES</span><h2>Find a place to<br /><em>build your future.</em></h2><button className="button button-light" onClick={() => navigate('/contact?division=homes')}>Enquire about a property <Arrow /></button></div></section>
  </>
}


function Services() {
  return <>
    <PageIntro eyebrow="BURGH HOMES / SERVICES" title={<>Property solutions<br /><em>built around you.</em></>} description="Explore the residential property services and opportunities that BURGH HOMES is focused on delivering." />
    <section className="section-pad new-content-section">
      <div className="container">
        <div className="section-heading split-heading"><div><span className="eyebrow">What we do</span><h2>From first homes to<br /><em>lasting investments.</em></h2></div><p>Our work centres on residential property, with an approach shaped by quality, thoughtful planning and the needs of homeowners and investors.</p></div>
        <div className="service-page-grid">
          {/* intentionally empty */}
          {homesAreas.map(([num, title, copy, bullets]) => <article className="service-page-card" key={num}><span className="eyebrow">SERVICE / {num}</span><h3>{title}</h3><p>{copy}</p><ul>{bullets.slice(0,4).map(item => <li key={item}>{item}</li>)}</ul><button className="text-link" onClick={() => navigate('/contact?division=homes')}>Discuss your requirements <Arrow /></button></article>)}
        </div>
      </div>
    </section>
    <section className="cta-band homes-cta"><div className="container cta-inner"><span className="eyebrow">BURGH HOMES</span><h2>Tell us what<br /><em>you are looking for.</em></h2><button className="button button-light" onClick={() => navigate('/contact?division=homes')}>Make an enquiry <Arrow /></button></div></section>
  </>
}

function Projects() {
  return <>
    <PageIntro eyebrow="BURGH HOMES / PROJECTS" title={<>Projects, one by one.<br /><em>See the work.</em></>} description="Browse the BURGH project portfolio. Each project has its own place for photos and videos, ready to grow as more media is supplied." />
    <section className="section-pad new-content-section">
      <div className="container">
        <div className="section-heading split-heading"><div><span className="eyebrow">Project portfolio</span><h2>Every project.<br /><em>Its own story.</em></h2></div><p>Projects are numbered 01, 02 and 03. Add each project’s details, photos and videos to its own record without changing the page layout.</p></div>
        <div className="project-portfolio-list">
          {projectPortfolio.map(project => <article className={`project-portfolio-item ${project.hasDetails ? '' : 'is-pending'}`} key={project.id}>
            <div className="project-portfolio-heading"><span className="project-portfolio-number">{project.number}</span><div><span className="project-status">FEATURED PROJECT</span><h3>{project.title}</h3><p>{project.description}</p></div></div>
            <div className="project-media-grid">
              <div className="project-media-block"><span className="eyebrow">Photos</span>{project.gallery.length ? <div className="project-photo-grid">{project.gallery.map((src, index) => <img key={src} src={`${ASSET_BASE}${src}`} alt={`${project.title} exterior view ${index + 1}`} loading="lazy" />)}</div> : <div className="project-media-empty">Photos for this project will be added here.</div>}</div>
              <div className="project-media-block"><span className="eyebrow">Videos</span>{project.videos.length ? <div className="project-video-list">{project.videos.map(video => <figure className="project-video-item" key={video.src}><video controls preload="metadata" poster={`${ASSET_BASE}${project.gallery[0]}`} src={`${ASSET_BASE}${video.src}`} /><figcaption>{video.title}</figcaption></figure>)}</div> : <div className="project-media-empty">Video updates for this project will be added here.</div>}</div>
            </div>
          </article>)}
        </div>
      </div>
    </section>
  </>
}
function Gallery() {
  return <>
    <PageIntro eyebrow="BURGH HOMES / GALLERY" title={<>A closer look at<br /><em>better living.</em></>} description="A visual collection of selected BURGH residences, using the latest project photography supplied by BURGH HOMES." />
    <section className="section-pad new-content-section">
      <div className="container">
        <div className="section-heading split-heading"><div><span className="eyebrow">Visual collection</span><h2>Spaces and<br /><em>inspiration.</em></h2></div><p>Browse the selected portfolio by project. Adding future photography is as simple as extending a project’s gallery array.</p></div>
        <div className="burgh-gallery-grid">{galleryImages.map((item, index) => <figure key={`${item.projectId}-${item.src}`}><img src={`${ASSET_BASE}${item.src}`} alt={item.alt} loading="lazy" /><figcaption><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</figcaption></figure>)}</div>
      </div>
    </section>
  </>
}
function Contact() {
  const [sent, setSent] = useState(false)
  const requestedDivision = new URLSearchParams(window.location.search).get('division')
  const initialEnquiryType = requestedDivision === 'homes' ? 'Property Enquiry' : 'General Enquiry'
  const [form, setForm] = useState({ name: '', email: '', phone: '', enquiryType: initialEnquiryType, subject: '', message: '' })
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => {
    e.preventDefault()
    const body = 'Full Name: ' + form.name + '\nEmail: ' + form.email + '\nTelephone: ' + form.phone + '\nEnquiry Type: ' + form.enquiryType + '\nSubject: ' + form.subject + '\n\nMessage:\n' + form.message
    const whatsappUrl = WHATSAPP + '?text=' + encodeURIComponent(body)
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    if (!opened) window.location.assign(whatsappUrl)
    setSent(true)
  }
  return <>
    <PageIntro eyebrow="Contact BURGH HOMES" title={<>Let’s start a<br /><em>conversation.</em></>} description="Looking for a home, exploring a property investment or interested in learning more about our residential developments? We would be glad to hear from you." />
    <section className="section-pad contact-section">
      <div className="container contact-grid">
        <div className="contact-details">
          <span className="eyebrow">Reach BURGH HOMES</span>
          <h2>Good decisions<br /><em>start with a conversation.</em></h2>
          <p>Tell us what you are looking for and our team will help guide your property enquiry.</p>
          <div className="contact-lines">
            <a className="contact-item" href="tel:+2348038493510" aria-label={'Call BURGH HOMES on ' + PHONE}><span className="contact-icon"><ContactIcon type="phone" /></span><span className="contact-copy"><span>Telephone</span><strong>{PHONE}</strong></span><span className="contact-arrow"><Arrow /></span></a>
            <a className="contact-item" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Message BURGH HOMES on WhatsApp"><span className="contact-icon whatsapp"><ContactIcon type="whatsapp" /></span><span className="contact-copy"><span>WhatsApp</span><strong>{PHONE}</strong></span><span className="contact-arrow"><Arrow /></span></a>
            <a className="contact-item" href={'mailto:' + EMAIL} aria-label={'Email BURGH HOMES at ' + EMAIL}><span className="contact-icon"><ContactIcon type="email" /></span><span className="contact-copy"><span>Email</span><strong>{EMAIL}</strong></span><span className="contact-arrow"><Arrow /></span></a>
            <a className="contact-item" href="https://www.instagram.com/burgh.homes/" target="_blank" rel="noreferrer" aria-label="Open BURGH HOMES on Instagram"><span className="contact-icon instagram"><ContactIcon type="instagram" /></span><span className="contact-copy"><span>Instagram</span><strong>@Burgh.homes</strong></span><span className="contact-arrow"><Arrow /></span></a>
          </div>
        </div>
        <form className="enquiry-form" onSubmit={submit}>
          <div className="form-head"><span className="eyebrow">Property enquiry</span><h3>How can we help?</h3></div>
          <label>Full Name<input required name="name" value={form.name} onChange={update} placeholder="Your full name" /></label>
          <div className="form-row">
            <label>Email Address<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label>
            <label>Telephone Number<input name="phone" value={form.phone} onChange={update} placeholder="Your phone number" /></label>
          </div>
          <label>Enquiry Type<select name="enquiryType" value={form.enquiryType} onChange={update}><option>General Enquiry</option><option>Property Enquiry</option><option>Property Purchase</option><option>Property Investment</option><option>Affordable Housing</option><option>Luxury Homes</option></select></label>
          <label>Subject<input required name="subject" value={form.subject} onChange={update} placeholder="What would you like to discuss?" /></label>
          <label>Message<textarea required name="message" value={form.message} onChange={update} placeholder="Tell us a little more about your property requirements..."></textarea></label>
          <button className="button button-navy" type="submit">Send via WhatsApp <Arrow light /></button>
          {sent && <p className="form-success">WhatsApp opened with your enquiry details ready to send.</p>}
          <a className="form-email-link" href={'mailto:' + EMAIL}>Prefer email? Contact {EMAIL}</a>
        </form>
      </div>
    </section>
  </>
}

function App() {
  const [path, setPath] = useState(getAppPath())
  useEffect(() => {
    const onPop = () => setPath(getAppPath())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  useEffect(() => {
    if (path === '/energy') {
      window.history.replaceState({}, '', BASE_PATH ? BASE_PATH + '/' : '/')
      setPath('/')
      return
    }
    const titles = {
      '/': 'BURGH HOMES | A better place to call home.',
      '/about': 'About BURGH HOMES | Thoughtfully planned. Made for living.',
      '/homes': 'BURGH HOMES | Residential properties and homes.',
      '/services': 'Services | BURGH HOMES residential property solutions.',
      '/projects': 'Projects | BURGH HOMES selected residences.',
      '/gallery': 'Gallery | BURGH HOMES selected projects.',
      '/contact': 'Contact BURGH HOMES | Let’s start a conversation.'
    }
    document.title = titles[path] || titles['/']
  }, [path])
  const page = path === '/about' ? <About /> : path === '/services' ? <Services /> : path === '/projects' ? <Projects /> : path === '/gallery' ? <Gallery /> : path === '/homes' ? <Homes /> : path === '/contact' ? <Contact /> : <Home />
  return <><Header /><main>{page}</main><Footer /></>
}

createRoot(document.getElementById('root')).render(<App />)
