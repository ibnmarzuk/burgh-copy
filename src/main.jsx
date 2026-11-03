import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const EMAIL = 'mustaphakadri@yahoo.co.uk'
const PHONE = '+234 803 849 3510'
const WHATSAPP = 'https://wa.me/2348038493510'
const ASSET_BASE = import.meta.env.BASE_URL

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About BURGH' },
  { path: '/homes', label: 'BURGH HOMES' },
  { path: '/energy', label: 'BURGH ENERGY' },
  { path: '/contact', label: 'Contact' },
]

const values = [
  ['01', 'Integrity', 'We act with clarity, honesty and accountability.'],
  ['02', 'Quality', 'We care about the standard of every experience we deliver.'],
  ['03', 'Customer Focus', 'We listen carefully and build around real needs.'],
  ['04', 'Innovation', 'We stay open to better, smarter ways forward.'],
  ['05', 'Sustainability', 'We think beyond today to create responsible value.'],
  ['06', 'Excellence', 'We keep raising the bar in service and execution.'],
]

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
          <p>Real estate. Energy. Building value for the future.</p>
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
        <span>© {new Date().getFullYear()} BURGH. All rights reserved.</span>
        <span>Homes <i></i> Energy <i></i> Future</span>
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

function SplitCard({ type, title, copy, path, index }) {
  return (
    <article className={`split-card ${type}`}>
      <div className="split-card-image">
        <span className="card-index">0{index}</span>
        <span className="card-tag">BURGH / {type === 'homes' ? '01' : '02'}</span>
      </div>
      <div className="split-card-body">
        <span className="eyebrow">BURGH {type.toUpperCase()}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
        <button className="text-link" onClick={() => navigate(path)}>Explore the division <Arrow /></button>
      </div>
    </article>
  )
}

function Values() {
  return (
    <section className="values-section section-pad">
      <div className="container">
        <div className="section-heading split-heading">
          <div><span className="eyebrow">The BURGH standard</span><h2>Built on principles<br />that <em>hold.</em></h2></div>
          <p>We are shaping a business that earns trust over time, through the quality of what we do and the way we do it.</p>
        </div>
        <div className="values-grid">
          {values.map(([num, title, copy]) => <div className="value-item" key={title}><span className="value-number">{num}</span><h3>{title}</h3><p>{copy}</p></div>)}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return <>
    <section className="hero">
      <div className="hero-image"></div>
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <span className="eyebrow hero-eyebrow">TWO DIVISIONS. ONE DIRECTION.</span>
        <h1>Real Estate.<br /><span>Energy.</span><br />Building value<br />for the future.</h1>
        <p>Two focused divisions. One clear purpose: to create dependable value for people, businesses and the communities they call home.</p>
        <div className="hero-actions"><button className="button button-gold" onClick={() => navigate('/homes')}>Explore BURGH HOMES <Arrow light /></button><button className="button button-outline-light" onClick={() => navigate('/energy')}>Explore BURGH ENERGY <Arrow light /></button><button className="scroll-cue" onClick={() => document.getElementById('divisions')?.scrollIntoView({ behavior: 'smooth' })}><span className="scroll-line"></span>Scroll to explore</button></div>
      </div>
      <div className="hero-stamp"><span>01</span><span>BURGH HOMES<br />BURGH ENERGY<br />One shared direction</span></div>
    </section>

    <section id="divisions" className="intro-section section-pad">
      <div className="container intro-grid">
        <div><span className="eyebrow">One brand. Two possibilities.</span><h2>Where everyday needs meet <em>long-term thinking.</em></h2></div>
        <div><p className="lead">BURGH brings together residential real estate and energy solutions through two dedicated business divisions.</p><p>Our focus is simple: quality, integrity, customer value and professional service delivery, with a forward-looking view of what comes next.</p><button className="text-link" onClick={() => navigate('/about')}>More about BURGH <Arrow /></button></div>
      </div>
    </section>

    <section className="container division-cards" aria-label="Business divisions">
      <SplitCard type="homes" index="1" title="A better place to call home." copy="Residential property sales and homeownership opportunities shaped around real needs, preferences and budgets." path="/homes" />
      <SplitCard type="energy" index="2" title="Powering today's needs. Enabling tomorrow's energy." copy="Dependable downstream energy and renewable solutions for an evolving world." path="/energy" />
    </section>

    <Values />

    <section className="cta-band">
      <div className="container cta-inner"><span className="eyebrow">Let’s make the next move count</span><h2>Let’s discuss your<br /><em>next opportunity.</em></h2><button className="button button-light" onClick={() => navigate('/contact')}>Contact BURGH <Arrow /></button></div>
    </section>
  </>
}

function About() {
  return <>
    <PageIntro eyebrow="About BURGH" title={<>A business built for<br /><em>what comes next.</em></>} description="BURGH is a business brand focused on residential real estate and energy solutions through BURGH HOMES and BURGH ENERGY." />
    <section className="section-pad about-overview"><div className="container about-overview-grid"><div className="about-visual" role="img" aria-label="Contemporary architecture surrounded by greenery"><span>BURGH / OUR PERSPECTIVE</span></div><div className="narrow-copy"><span className="eyebrow">Our perspective</span><h2>Professional by nature.<br /><em>Forward by design.</em></h2><p className="lead">BURGH HOMES concentrates on residential properties and homeownership opportunities, while BURGH ENERGY focuses on downstream oil and gas and renewable energy solutions.</p><p>Through these business divisions, BURGH aims to deliver value through professionalism, quality, integrity, customer focus and responsible business practices. We are building a respected brand that can meet today’s needs while staying ready for tomorrow.</p></div></div></section>
    <section className="vision-mission"><div className="container vm-grid"><div className="vm-card"><span className="eyebrow">Our vision</span><p>To build a respected business brand recognised for quality, dependable solutions, customer value and a forward-looking approach to real estate and energy.</p></div><div className="vm-card gold"><span className="eyebrow">Our mission</span><p>To deliver professional real estate and energy solutions through dedicated business divisions, maintaining a commitment to integrity, customer satisfaction, quality and sustainable value creation.</p></div></div></section>
    <Values />
    <section className="section-pad division-links"><div className="container"><div className="section-heading"><span className="eyebrow">Explore the divisions</span><h2>Different expertise.<br /><em>Shared standards.</em></h2></div><div className="division-link-row"><button onClick={() => navigate('/homes')}><span>BURGH HOMES</span><strong>A better place to call home <Arrow /></strong></button><button onClick={() => navigate('/energy')}><span>BURGH ENERGY</span><strong>Powering today’s needs <Arrow /></strong></button></div></div></section>
  </>
}

const homesAreas = [
  ['01', 'Affordable housing', 'BURGH HOMES is committed to making quality homeownership more accessible to low- and middle-income earners through cost-conscious residential developments.', ['Affordable homeownership opportunities', 'Modern, functional housing solutions', 'Flexible payment and financing options', 'Secure, well-planned communities', 'Durable and sustainable building standards']],
  ['02', 'Luxury residential development', 'Premium homes for discerning homeowners and investors, combining contemporary architecture, refined finishes, comfort and long-term value.', ['Contemporary architectural designs', 'High-end finishes and fittings', 'Smart-home technologies', 'Exclusive residential estates', 'Premium amenities and lifestyle facilities', 'Prime locations and investment opportunities']],
  ['03', 'Residential property sales', 'Residential property opportunities for first-time buyers, growing families, professionals and investors, supported by clear information and professional guidance.', ['Affordable and luxury property options', 'Buyer guidance and property information', 'Viewing and enquiry coordination', 'Opportunities for homeowners and investors']],
]

function Homes() {
  return <>
    <section className="division-hero homes-hero"><div className="division-hero-image"></div><div className="division-hero-shade"></div><img className="homes-brand-logo" src={`${ASSET_BASE}assets/ne.jpg`} alt="BURGH Homes logo" /><div className="container division-hero-content"><span className="eyebrow">BURGH / DIVISION 01</span><h1>BURGH<br /><em>HOMES</em></h1><p>A better place to call home.</p><div className="division-hero-actions"><button className="button button-gold" onClick={() => navigate('/contact?division=homes')}>Make a homes enquiry <Arrow light /></button></div></div></section>
    <section className="section-pad division-intro"><div className="container intro-grid"><div><span className="eyebrow">The homes perspective</span><h2>More than a building.<br /><em>A place to build a future.</em></h2></div><div><p className="lead">BURGH HOMES is a residential real estate development and housing company focused on affordable and luxury homes for individuals, families, professionals and investors.</p><p>We develop thoughtfully planned residential properties that bring together comfort, functionality, modern architecture and long-term value. Our work is guided by the belief that everyone deserves access to quality housing, whether buying a first home, moving into a premium residence or investing in real estate.</p><button className="text-link" onClick={() => navigate('/contact')}>Talk to BURGH HOMES <Arrow /></button></div></div></section>
    <section className="areas-section"><div className="container"><div className="section-heading split-heading"><div><span className="eyebrow">Our core business areas</span><h2>Room for every<br /><em>kind of ambition.</em></h2></div><p>From accessible opportunities to premium residential environments, our focus stays on thoughtful choices and long-term value.</p></div><div className="areas-list">{homesAreas.map(([num, title, copy, bullets]) => <article className={`area-row area-row-${num}`} key={title}><span className="area-num">{num}</span><div className="area-visual" role="img" aria-label={title}></div><div className="area-main"><h3>{title}</h3><p>{copy}</p></div><ul>{bullets.map(b => <li key={b}>{b}</li>)}</ul></article>)}</div></div></section>
    <section className="section-pad homes-values"><div className="container value-split"><div><span className="eyebrow">Our promise</span><h2>Homeownership should feel <em>possible.</em></h2></div><div><p className="lead">We are building a balanced portfolio of affordable and luxury residential developments that respond to changing housing needs. By combining quality construction, innovative design, strategic locations and customer-focused solutions, BURGH HOMES aims to create places where people can live, grow and thrive.</p><p>Our focus is on improving living standards, supporting sustainable urban growth and creating lasting value for homeowners, investors and communities.</p><div className="mini-values">{['Integrity', 'Quality', 'Customer Focus', 'Innovation', 'Sustainability', 'Excellence'].map(v => <span key={v}>{v}</span>)}</div></div></div></section>
    <section className="vision-mission homes-vision-mission"><div className="container vm-grid"><div className="vm-card"><span className="eyebrow">Our vision</span><p>To be a leading real estate company, transforming lives through affordable and luxury homes that inspire communities and elevate living standards.</p></div><div className="vm-card gold"><span className="eyebrow">Our mission</span><p>To develop high-quality residential properties that create accessible homeownership opportunities, exceptional living experiences and sustainable returns for homeowners, investors and stakeholders.</p></div></div></section>
    <section className="section-pad homes-values"><div className="container"><div className="section-heading split-heading"><div><span className="eyebrow">Strategic focus</span><h2>Affordable access.<br /><em>Lasting value.</em></h2></div><p>BURGH HOMES is shaping a balanced residential portfolio through quality construction, thoughtful design, strategic locations and customer-centred solutions.</p></div><div className="value-split"><div><h3>Homes that move communities forward.</h3></div><div><p className="lead">Through affordability, luxury and community building, BURGH HOMES seeks to contribute meaningfully to housing development and sustainable urban growth.</p></div></div></div></section>
    <section className="cta-band homes-cta"><div className="container cta-inner"><span className="eyebrow">BURGH HOMES</span><h2>Find a place to<br /><em>build your future.</em></h2><button className="button button-light" onClick={() => navigate('/contact?division=homes')}>Enquire about a property <Arrow /></button></div></section>
  </>
}

const energyProducts = ['Premium Motor Spirit (PMS / Petrol)', 'Automotive Gas Oil (AGO / Diesel)', 'Dual Purpose Kerosene (DPK)', 'Aviation Fuel (Jet A-1)', 'Liquefied Petroleum Gas (LPG)', 'Liquefied Natural Gas (LNG)', 'Marine fuels and lubricants']
const energyGreen = ['Solar power generation systems', 'Commercial and industrial solar solutions', 'Battery energy storage systems', 'Hybrid energy solutions', 'Electric vehicle charging infrastructure', 'Energy efficiency and carbon-reduction solutions']

function Energy() {
  return <>
    <section className="division-hero energy-hero"><div className="division-hero-image"></div><div className="division-hero-shade"></div><img className="energy-brand-logo" src="/assets/burgh-energies-logo.svg" alt="BURGH Energies, powering the future, fossil and renewable" /><div className="container division-hero-content"><span className="eyebrow">BURGH / DIVISION 02</span><h1>BURGH<br /><em>ENERGY</em></h1><p>Powering today’s needs. Enabling tomorrow’s energy.</p><div className="division-hero-actions"><button className="button button-gold" onClick={() => navigate('/contact?division=energy')}>Make an energy enquiry <Arrow light /></button></div></div></section>
    <section className="section-pad division-intro"><div className="container intro-grid"><div><span className="eyebrow">The energy perspective</span><h2>Reliable today.<br /><em>Ready for tomorrow.</em></h2></div><div><p className="lead">BURGH ENERGY is focused on downstream oil and gas and renewable energy solutions.</p><p>Our strategic direction centres on dependable energy supply, operational efficiency, innovation, safety and the development of cleaner energy alternatives for commercial, industrial and other customer segments.</p><button className="text-link" onClick={() => navigate('/contact?division=energy')}>Discuss your requirements <Arrow /></button></div></div></section>
    <section className="energy-offerings"><div className="container"><div className="offering-grid"><article className="offering-panel petroleum"><span className="eyebrow">01 / Downstream</span><h2>Oil &amp; gas</h2><p>Petroleum products and energy pathways, presented around verified operational capabilities and necessary approvals.</p><div className="product-list">{energyProducts.map((p, i) => <div key={p}><span>{String(i + 1).padStart(2, '0')}</span>{p}</div>)}</div></article><article className="offering-panel green"><span className="eyebrow">02 / Renewable</span><h2>Green energy</h2><p>Appropriate energy solutions that support business needs, energy management and sustainability objectives.</p><div className="product-list">{energyGreen.map((p, i) => <div key={p}><span>{String(i + 1).padStart(2, '0')}</span>{p}</div>)}</div></article></div></div></section>
    <section className="section-pad energy-portfolio"><div className="container"><div className="section-heading split-heading"><div><span className="eyebrow">BURGH ENERGY / PORTFOLIO</span><h2>Energy solutions for<br /><em>real world needs.</em></h2></div><p>Explore the key service areas that shape BURGH ENERGY’s portfolio across conventional energy and emerging cleaner energy solutions.</p></div><div className="energy-portfolio-grid">
      <article className="portfolio-tile"><div className="portfolio-image oil-gas" role="img" aria-label="Energy infrastructure and fuel supply" /><div className="portfolio-copy"><span>01 / DOWNSTREAM</span><h3>Oil &amp; Gas Supply</h3><p>Petroleum product supply pathways and downstream energy requirements, subject to confirmed availability and relevant approvals.</p></div></article>
      <article className="portfolio-tile"><div className="portfolio-image solar" role="img" aria-label="Renewable energy infrastructure" /><div className="portfolio-copy"><span>02 / RESIDENTIAL &amp; COMMERCIAL</span><h3>Solar Energy</h3><p>Solar power options designed around energy demand, site conditions and practical operating needs.</p></div></article>
      <article className="portfolio-tile"><div className="portfolio-image storage" role="img" aria-label="Energy systems and storage infrastructure" /><div className="portfolio-copy"><span>03 / STORAGE</span><h3>Energy Storage</h3><p>Battery storage and hybrid system options to support resilience and more effective energy use.</p></div></article>
      <article className="portfolio-tile"><div className="portfolio-image efficiency" role="img" aria-label="Residential property and energy efficiency" /><div className="portfolio-copy"><span>04 / EFFICIENCY</span><h3>Smarter Energy Use</h3><p>Energy efficiency and carbon reduction opportunities for businesses exploring more sustainable operations.</p></div></article>
      </div><p className="portfolio-disclaimer">Portfolio areas describe service focus, not a claim of completed projects. Specific products, availability and project credentials should be confirmed directly with BURGH.</p></div></section>
    <section className="section-pad energy-strategy"><div className="container strategy-grid"><div><span className="eyebrow">Strategic objective</span><h2>Address today’s needs.<br /><em>Pursue better energy.</em></h2></div><div><p className="lead">BURGH ENERGY aims to address current energy needs while pursuing opportunities in renewable technologies and more sustainable energy solutions.</p><p>Our work is guided by safety first, integrity, innovation, customer focus, sustainability and excellence.</p></div></div></section>
    <section className="cta-band energy-cta"><div className="container cta-inner"><span className="eyebrow">BURGH ENERGY</span><h2>Let’s discuss your<br /><em>energy requirements.</em></h2><button className="button button-light" onClick={() => navigate('/contact?division=energy')}>Make an energy enquiry <Arrow /></button></div></section>
  </>
}

function Contact() {
  const [sent, setSent] = useState(false)
  const requestedDivision = new URLSearchParams(window.location.search).get('division')
  const initialDivision = requestedDivision === 'homes' ? 'BURGH HOMES' : requestedDivision === 'energy' ? 'BURGH ENERGY' : 'General Enquiry'
  const [form, setForm] = useState({ name: '', email: '', phone: '', division: initialDivision, subject: '', message: '' })
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = e => {
    e.preventDefault()
    const body = `Full Name: ${form.name}\nEmail: ${form.email}\nTelephone: ${form.phone}\nBusiness Division: ${form.division}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`
    const whatsappUrl = `${WHATSAPP}?text=${encodeURIComponent(body)}`
    const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
    if (!opened) window.location.assign(whatsappUrl)
    setSent(true)
  }
  return <>
    <PageIntro eyebrow="Contact BURGH" title={<>Let’s start a<br /><em>conversation.</em></>} description="Whether you are exploring residential properties, seeking energy solutions or interested in a business partnership, contact BURGH to discuss your requirements." />
    <section className="section-pad contact-section"><div className="container contact-grid"><div className="contact-details"><span className="eyebrow">Reach the right team</span><h2>Good opportunities<br /><em>begin with a hello.</em></h2><p>Tell us what you are looking for and we will help direct your enquiry to the right BURGH division.</p><div className="contact-lines"><a className="contact-item" href="tel:+2348038493510" aria-label={`Call BURGH on ${PHONE}`}><span className="contact-icon"><ContactIcon type="phone" /></span><span className="contact-copy"><span>Telephone</span><strong>{PHONE}</strong></span><span className="contact-arrow"><Arrow /></span></a><a className="contact-item" href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Message BURGH on WhatsApp"><span className="contact-icon whatsapp"><ContactIcon type="whatsapp" /></span><span className="contact-copy"><span>WhatsApp</span><strong>{PHONE}</strong></span><span className="contact-arrow"><Arrow /></span></a><a className="contact-item" href={`mailto:${EMAIL}`} aria-label={`Email BURGH at ${EMAIL}`}><span className="contact-icon"><ContactIcon type="email" /></span><span className="contact-copy"><span>Email</span><strong>{EMAIL}</strong></span><span className="contact-arrow"><Arrow /></span></a><a className="contact-item" href="https://www.instagram.com/burgh.homes/" target="_blank" rel="noreferrer" aria-label="Open BURGH HOMES on Instagram"><span className="contact-icon instagram"><ContactIcon type="instagram" /></span><span className="contact-copy"><span>Instagram</span><strong>@Burgh.homes</strong></span><span className="contact-arrow"><Arrow /></span></a></div></div><form className="enquiry-form" onSubmit={submit}><div className="form-head"><span className="eyebrow">Enquiry form</span><h3>How can we help?</h3></div><label>Full Name<input required name="name" value={form.name} onChange={update} placeholder="Your full name" /></label><div className="form-row"><label>Email Address<input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" /></label><label>Telephone Number<input name="phone" value={form.phone} onChange={update} placeholder="Your phone number" /></label></div><label>Business Division<select name="division" value={form.division} onChange={update}><option>General Enquiry</option><option>BURGH HOMES</option><option>BURGH ENERGY</option></select></label><label>Subject<input required name="subject" value={form.subject} onChange={update} placeholder="What would you like to discuss?" /></label><label>Message<textarea required name="message" value={form.message} onChange={update} placeholder="Tell us a little more about your requirements..."></textarea></label><button className="button button-navy" type="submit">Send via WhatsApp <Arrow light /></button>{sent && <p className="form-success">WhatsApp opened with your enquiry details ready to send.</p>}<a className="form-email-link" href={`mailto:${EMAIL}`}>Prefer email? Contact {EMAIL}</a></form></div></section>
  </>
}

function App() {
  const [path, setPath] = useState(getAppPath())
  useEffect(() => { const onPop = () => setPath(getAppPath()); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop) }, [])
  useEffect(() => { const titles = { '/': 'BURGH | Real Estate. Energy. Building Value for the Future.', '/about': 'About BURGH | A business built for what comes next.', '/homes': 'BURGH HOMES | A better place to call home.', '/energy': 'BURGH ENERGY | Powering today’s needs.', '/contact': 'Contact BURGH | Let’s start a conversation.' }; document.title = titles[path] || titles['/']; }, [path])
  const page = path === '/about' ? <About /> : path === '/homes' ? <Homes /> : path === '/energy' ? <Energy /> : path === '/contact' ? <Contact /> : <Home />
  return <><Header /><main>{page}</main><Footer /></>
}

createRoot(document.getElementById('root')).render(<App />)
