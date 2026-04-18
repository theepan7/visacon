import React, { useState, useEffect } from 'react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['home', 'about', 'how-it-works', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: '#fffbf4', color: '#2c1810', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .landing-root { font-family: 'Lato', sans-serif; }

        /* Mandala background pattern */
        .hero-bg {
          background:
            radial-gradient(ellipse at 20% 50%, rgba(214,93,14,0.18) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(198,41,34,0.15) 0%, transparent 55%),
            radial-gradient(ellipse at 60% 80%, rgba(255,179,0,0.20) 0%, transparent 50%),
            linear-gradient(135deg, #1a0a00 0%, #3d1a00 40%, #1e0e00 100%);
        }

        .nav-link {
          position: relative;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: color 0.3s;
          padding: 4px 0;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 0; height: 2px;
          background: #ffb300;
          transition: width 0.3s;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .btn-primary {
          background: linear-gradient(135deg, #d65d0e 0%, #c62922 100%);
          color: #fff;
          border: none;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s;
        }
        .btn-primary:hover::before { left: 100%; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(214,93,14,0.5); }

        .btn-outline {
          background: transparent;
          color: #ffb300;
          border: 2px solid #ffb300;
          cursor: pointer;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.3s;
        }
        .btn-outline:hover { background: #ffb300; color: #1a0a00; transform: translateY(-2px); }

        .ornament { color: #ffb300; font-size: 28px; line-height: 1; }

        .feature-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,179,0,0.25);
          border-radius: 4px;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: linear-gradient(180deg, #ffb300, #d65d0e);
        }
        .feature-card:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,179,0,0.5);
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.3);
        }

        .step-circle {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d65d0e, #c62922);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 24px; font-weight: 900;
          color: #fff;
          box-shadow: 0 4px 20px rgba(214,93,14,0.4);
          margin: 0 auto 16px;
          flex-shrink: 0;
        }

        .divider-ornament {
          display: flex;
          align-items: center;
          gap: 16px;
          margin: 0 auto;
        }
        .divider-ornament::before,
        .divider-ornament::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #ffb300, transparent);
        }

        .stat-card {
          border-top: 3px solid #ffb300;
          background: linear-gradient(135deg, rgba(255,179,0,0.08), rgba(214,93,14,0.08));
        }

        .testimonial-card {
          border-left: 4px solid #d65d0e;
          background: #fff9f0;
        }

        .contact-input {
          width: 100%;
          padding: 14px 18px;
          border: 2px solid #e8d5b7;
          border-radius: 4px;
          font-family: 'Lato', sans-serif;
          font-size: 15px;
          background: #fffbf4;
          color: #2c1810;
          transition: border-color 0.3s;
          outline: none;
        }
        .contact-input:focus { border-color: #d65d0e; }

        .footer-link {
          color: #d4a96a;
          cursor: pointer;
          transition: color 0.3s;
          font-size: 14px;
        }
        .footer-link:hover { color: #ffb300; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-fade-up { animation: fadeInUp 0.8s ease forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }

        /* Rangoli decorative SVG circles */
        .rangoli-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(255,179,0,0.15);
          animation: spin-slow 30s linear infinite;
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 40px !important; }
          .hero-sub { font-size: 16px !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .hide-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          .grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="landing-root">

        {/* ── NAVBAR ── */}
        <nav style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          transition: 'all 0.4s',
          background: scrolled ? 'rgba(26,10,0,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,179,0,0.2)' : 'none',
          padding: scrolled ? '12px 0' : '20px 0',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => scrollTo('home')}>
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffb300, #d65d0e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 900, color: '#1a0a00',
                fontFamily: "'Playfair Display', serif",
                boxShadow: '0 2px 12px rgba(255,179,0,0.4)',
              }}>VC</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: '#ffb300', lineHeight: 1 }}>Visa Concierge</div>
                <div style={{ fontSize: 10, color: '#d4a96a', letterSpacing: 2, textTransform: 'uppercase' }}>India e-Visa Service</div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
              {navLinks.map(link => (
                <span
                  key={link.id}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  style={{ color: activeSection === link.id ? '#ffb300' : '#e8d5b7' }}
                  onClick={() => scrollTo(link.id)}
                >{link.label}</span>
              ))}
              <button
                className="btn-primary"
                onClick={onStart}
                style={{ padding: '10px 24px', borderRadius: 4, fontSize: 13 }}
              >Apply for Visa</button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }}
              className="hide-desktop"
            >
              <div style={{ width: 24, height: 2, background: '#ffb300', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <div style={{ width: 24, height: 2, background: '#ffb300', marginBottom: 5, opacity: menuOpen ? 0 : 1 }} />
              <div style={{ width: 24, height: 2, background: '#ffb300', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div style={{ background: 'rgba(26,10,0,0.98)', borderTop: '1px solid rgba(255,179,0,0.2)', padding: '20px 24px' }}>
              {navLinks.map(link => (
                <div key={link.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,179,0,0.1)' }}>
                  <span className="nav-link" style={{ color: '#e8d5b7', fontSize: 16 }} onClick={() => scrollTo(link.id)}>{link.label}</span>
                </div>
              ))}
              <button className="btn-primary" onClick={onStart} style={{ marginTop: 16, width: '100%', padding: '14px', borderRadius: 4, fontSize: 14 }}>
                Apply for e-Visa
              </button>
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <section id="home" className="hero-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 80 }}>

          {/* Decorative rings */}
          <div className="rangoli-ring" style={{ width: 500, height: 500, top: -100, right: -100 }} />
          <div className="rangoli-ring" style={{ width: 300, height: 300, top: 100, right: 50, borderColor: 'rgba(214,93,14,0.1)', animationDirection: 'reverse', animationDuration: '20s' }} />
          <div className="rangoli-ring" style={{ width: 200, height: 200, bottom: 50, left: 50, borderColor: 'rgba(198,41,34,0.12)', animationDuration: '25s' }} />

          {/* Decorative dots pattern */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #ffb300 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', width: '100%' }}>

            <div className="animate-fade-up">
              <div className="ornament" style={{ marginBottom: 16 }}>✦ ✦ ✦</div>
              <div style={{ fontSize: 13, letterSpacing: 4, textTransform: 'uppercase', color: '#ffb300', fontFamily: "'Lato', sans-serif", fontWeight: 700, marginBottom: 20 }}>
                India e-Visa Concierge Service
              </div>
              <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 62, fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: 24 }}>
                Your Gateway to<br />
                <span style={{ background: 'linear-gradient(135deg, #ffb300, #ff6b1a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Incredible India
                </span>
              </h1>
              <p className="hero-sub" style={{ fontSize: 18, lineHeight: 1.7, color: '#d4a96a', marginBottom: 40, fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                Skip the complexity of government portals. Our expert concierge team handles your entire Indian e-Visa application — from document review to official submission.
              </p>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={onStart} style={{ padding: '16px 36px', borderRadius: 4, fontSize: 15 }}>
                  Apply for e-Visa Now
                </button>
                <button className="btn-outline" onClick={() => scrollTo('how-it-works')} style={{ padding: '16px 36px', borderRadius: 4, fontSize: 15 }}>
                  How It Works
                </button>
              </div>
              <div style={{ display: 'flex', gap: 40, marginTop: 48, paddingTop: 48, borderTop: '1px solid rgba(255,179,0,0.2)' }}>
                {[['5000+', 'Visas Processed'], ['99%', 'Success Rate'], ['24hrs', 'Avg. Turnaround']].map(([num, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: '#ffb300' }}>{num}</div>
                    <div style={{ fontSize: 12, color: '#d4a96a', letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Lato', sans-serif" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual */}
            <div className="animate-float hide-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{
                width: 380, height: 380, borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, rgba(255,179,0,0.25), rgba(214,93,14,0.15), rgba(198,41,34,0.1))',
                border: '2px solid rgba(255,179,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: 280, height: 280, borderRadius: '50%',
                  background: 'radial-gradient(circle at 40% 40%, rgba(255,179,0,0.3), rgba(214,93,14,0.2))',
                  border: '1px solid rgba(255,179,0,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', textAlign: 'center', padding: 40,
                }}>
                  <div style={{ fontSize: 64, marginBottom: 8 }}>🇮🇳</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#ffb300' }}>India e-Visa</div>
                  <div style={{ fontSize: 12, color: '#d4a96a', marginTop: 4, letterSpacing: 1 }}>OFFICIAL SERVICE</div>
                </div>
                {/* Orbiting badges */}
                {[
                  { emoji: '✈️', label: 'Fast', top: -20, left: '50%', transform: 'translateX(-50%)' },
                  { emoji: '🔒', label: 'Secure', right: -20, top: '50%', transform: 'translateY(-50%)' },
                  { emoji: '💳', label: 'Easy Pay', bottom: -20, left: '50%', transform: 'translateX(-50%)' },
                  { emoji: '👨‍💼', label: 'Expert', left: -20, top: '50%', transform: 'translateY(-50%)' },
                ].map(({ emoji, label, ...pos }) => (
                  <div key={label} style={{
                    position: 'absolute', ...pos,
                    background: 'linear-gradient(135deg, #3d1a00, #1a0a00)',
                    border: '1px solid rgba(255,179,0,0.4)',
                    borderRadius: 40, padding: '8px 16px',
                    display: 'flex', alignItems: 'center', gap: 6,
                    whiteSpace: 'nowrap',
                  }}>
                    <span style={{ fontSize: 16 }}>{emoji}</span>
                    <span style={{ fontSize: 12, color: '#ffb300', fontWeight: 700, letterSpacing: 1 }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fffbf4" />
            </svg>
          </div>
        </section>

        {/* ── STATS BANNER ── */}
        <section style={{ background: '#fff9f0', padding: '60px 24px', borderBottom: '1px solid #e8d5b7' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="grid-4">
            {[
              { icon: '🌏', num: '150+', label: 'Countries Served' },
              { icon: '⚡', num: '48hrs', label: 'Processing Time' },
              { icon: '🏆', num: '4.9★', label: 'Customer Rating' },
              { icon: '🛡️', num: '100%', label: 'Secure & Private' },
            ].map(({ icon, num, label }) => (
              <div key={label} className="stat-card" style={{ textAlign: 'center', padding: '28px 20px', borderRadius: 4 }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: '#d65d0e' }}>{num}</div>
                <div style={{ fontSize: 13, color: '#8b5e3c', letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ padding: '100px 24px', background: '#fffbf4' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div className="divider-ornament" style={{ maxWidth: 400, marginBottom: 24 }}>
                <span className="ornament" style={{ fontSize: 20 }}>❋</span>
              </div>
              <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: '#d65d0e', fontFamily: "'Lato', sans-serif", fontWeight: 700, marginBottom: 12 }}>Who We Are</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: '#2c1810', lineHeight: 1.2, marginBottom: 20 }}>
                Your Trusted India<br />Visa Partner
              </h2>
              <p style={{ fontSize: 17, color: '#6b4226', lineHeight: 1.8, maxWidth: 640, margin: '0 auto', fontFamily: "'Lato', sans-serif" }}>
                Visa Concierge was founded to eliminate the frustration of navigating India's complex e-Visa system. Our team of immigration specialists handles every detail so you can focus on planning your journey.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
              <div>
                {[
                  { icon: '🎯', title: 'Expert Handling', desc: 'Our trained specialists review every application to ensure accuracy and completeness before submission to the official portal.' },
                  { icon: '📋', title: 'Document Guidance', desc: 'We tell you exactly what you need — no guessing, no rejections due to incorrect or missing documents.' },
                  { icon: '🔔', title: 'Status Updates', desc: 'Stay informed every step of the way with real-time updates on your application status via email.' },
                  { icon: '💬', title: 'Dedicated Support', desc: 'Our team is available to answer your questions and resolve any issues quickly and professionally.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="feature-card" style={{ display: 'flex', gap: 20, padding: '24px 28px', marginBottom: 16, borderRadius: 4 }}>
                    <div style={{ fontSize: 28, flexShrink: 0 }}>{icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: '#2c1810', marginBottom: 6 }}>{title}</div>
                      <div style={{ fontSize: 14, color: '#6b4226', lineHeight: 1.7, fontFamily: "'Lato', sans-serif" }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1a0a00, #3d1a00)',
                  borderRadius: 8,
                  padding: 48,
                  textAlign: 'center',
                  border: '1px solid rgba(255,179,0,0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: 'radial-gradient(circle, #ffb300 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  <div style={{ fontSize: 80, marginBottom: 24 }}>🕌</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#ffb300', fontWeight: 700, marginBottom: 12 }}>
                    "India Awaits You"
                  </div>
                  <p style={{ color: '#d4a96a', fontSize: 15, lineHeight: 1.7, fontFamily: "'Lato', sans-serif" }}>
                    From the Taj Mahal to Kerala's backwaters, the Himalayas to vibrant city streets — let us handle your visa while you dream of the adventure ahead.
                  </p>
                  <div style={{ marginTop: 32, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {['🏯 Heritage', '🌿 Nature', '🍛 Cuisine', '🎭 Culture'].map(tag => (
                      <span key={tag} style={{ background: 'rgba(255,179,0,0.15)', border: '1px solid rgba(255,179,0,0.3)', borderRadius: 20, padding: '4px 12px', fontSize: 12, color: '#ffb300', fontFamily: "'Lato', sans-serif" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" style={{ padding: '100px 24px', background: '#1a0a00', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle, #ffb300 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 72 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: '#ffb300', fontFamily: "'Lato', sans-serif", fontWeight: 700, marginBottom: 12 }}>Simple Process</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
                Your e-Visa in<br />
                <span style={{ background: 'linear-gradient(135deg, #ffb300, #ff6b1a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4 Simple Steps</span>
              </h2>
              <p style={{ fontSize: 16, color: '#d4a96a', fontFamily: "'Lato', sans-serif", maxWidth: 500, margin: '0 auto' }}>
                We've simplified the complex visa process into four straightforward steps
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, position: 'relative' }} className="grid-4">
              {/* Connecting line */}
              <div className="hide-mobile" style={{ position: 'absolute', top: 32, left: '12.5%', right: '12.5%', height: 2, background: 'linear-gradient(90deg, #ffb300, #d65d0e, #c62922, #d65d0e)', zIndex: 0, opacity: 0.5 }} />

              {[
                { num: '01', icon: '📝', title: 'Fill Your Details', desc: 'Provide your personal information, travel details and passport information through our easy-to-use form.' },
                { num: '02', icon: '💳', title: 'Secure Payment', desc: 'Pay our affordable service fee. We use bank-grade encryption to keep your payment information safe.' },
                { num: '03', icon: '📸', title: 'Upload Documents', desc: 'Upload your passport-size photo and passport bio page. We guide you on exact requirements.' },
                { num: '04', icon: '✅', title: 'We Submit & Track', desc: 'Our team submits your application to the official portal and keeps you updated until approval.' },
              ].map(({ num, icon, title, desc }) => (
                <div key={num} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                  <div className="step-circle">{num}</div>
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#ffb300', marginBottom: 12 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#d4a96a', lineHeight: 1.7, fontFamily: "'Lato', sans-serif" }}>{desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 64 }}>
              <button className="btn-primary" onClick={onStart} style={{ padding: '18px 48px', borderRadius: 4, fontSize: 16 }}>
                Start Your Application →
              </button>
            </div>
          </div>
        </section>

        {/* ── VISA TYPES ── */}
        <section style={{ padding: '100px 24px', background: '#fff9f0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: '#d65d0e', fontFamily: "'Lato', sans-serif", fontWeight: 700, marginBottom: 12 }}>Visa Categories</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: '#2c1810', marginBottom: 16 }}>We Handle All Visa Types</h2>
              <p style={{ fontSize: 16, color: '#6b4226', fontFamily: "'Lato', sans-serif", maxWidth: 500, margin: '0 auto' }}>
                Whatever your purpose for visiting India, we have you covered
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="grid-3">
              {[
                { icon: '🏖️', title: 'Tourist e-Visa', desc: 'Explore India\'s iconic landmarks, beaches, temples and diverse landscapes. Valid for up to 90 days.', badge: 'Most Popular' },
                { icon: '💼', title: 'Business e-Visa', desc: 'Attend meetings, conferences, trade fairs and business negotiations across India.', badge: '' },
                { icon: '🏥', title: 'Medical e-Visa', desc: 'Travel to India for medical treatment at world-class hospitals and wellness centers.', badge: '' },
                { icon: '🎓', title: 'Conference e-Visa', desc: 'Participate in international seminars, workshops and academic conferences.', badge: '' },
                { icon: '👨‍👩‍👧', title: 'Family Visit', desc: 'Visit family members residing in India for holidays and special occasions.', badge: '' },
                { icon: '✈️', title: 'Transit e-Visa', desc: 'Short stop in India while en route to another destination. Valid for double entry.', badge: '' },
              ].map(({ icon, title, desc, badge }) => (
                <div key={title} style={{
                  background: '#fffbf4', border: '1px solid #e8d5b7',
                  borderRadius: 4, padding: 32, position: 'relative',
                  transition: 'all 0.3s', cursor: 'default',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#d65d0e'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(214,93,14,0.15)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e8d5b7'; (e.currentTarget as HTMLDivElement).style.transform = 'none'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
                >
                  {badge && <div style={{ position: 'absolute', top: 16, right: 16, background: 'linear-gradient(135deg, #ffb300, #d65d0e)', color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase' }}>{badge}</div>}
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#2c1810', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: '#6b4226', lineHeight: 1.7, fontFamily: "'Lato', sans-serif" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section style={{ padding: '100px 24px', background: '#fffbf4' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: '#d65d0e', fontFamily: "'Lato', sans-serif", fontWeight: 700, marginBottom: 12 }}>Testimonials</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: '#2c1810' }}>What Our Clients Say</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="grid-3">
              {[
                { name: 'Sarah Mitchell', country: '🇬🇧 United Kingdom', text: 'Absolutely seamless experience. I was worried about the visa process but Visa Concierge made it incredibly straightforward. Got my e-Visa in less than 48 hours!', rating: 5 },
                { name: 'Marcus Chen', country: '🇸🇬 Singapore', text: 'Used this service for a business trip to Mumbai. Professional, fast, and their team responded to all my questions within hours. Highly recommended!', rating: 5 },
                { name: 'Amira Al-Hassan', country: '🇦🇪 UAE', text: 'My family visa was processed without any hassle. The document checklist was very clear. We\'re now enjoying our vacation in Rajasthan. Thank you!', rating: 5 },
              ].map(({ name, country, text, rating }) => (
                <div key={name} className="testimonial-card" style={{ padding: 32, borderRadius: 4 }}>
                  <div style={{ color: '#ffb300', fontSize: 20, marginBottom: 16 }}>{'★'.repeat(rating)}</div>
                  <p style={{ fontSize: 15, color: '#4a2c10', lineHeight: 1.8, fontFamily: "'Lato', sans-serif", fontStyle: 'italic', marginBottom: 24 }}>"{text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #d65d0e, #c62922)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: '#fff' }}>
                      {name[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#2c1810', fontFamily: "'Lato', sans-serif", fontSize: 15 }}>{name}</div>
                      <div style={{ fontSize: 13, color: '#8b5e3c', fontFamily: "'Lato', sans-serif" }}>{country}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section style={{ background: 'linear-gradient(135deg, #d65d0e 0%, #c62922 50%, #8b0000 100%)', padding: '80px 24px', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08, backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
            <div className="ornament" style={{ marginBottom: 20, fontSize: 24 }}>✦ ✦ ✦</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: '#fff', marginBottom: 20 }}>
              Ready to Visit India?
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.85)', fontFamily: "'Lato', sans-serif", marginBottom: 40, lineHeight: 1.7 }}>
              Start your e-Visa application today. Our team is ready to make your journey to India a reality.
            </p>
            <button onClick={onStart} style={{
              background: '#fff', color: '#d65d0e', border: 'none', cursor: 'pointer',
              padding: '18px 52px', borderRadius: 4, fontSize: 16,
              fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase',
              transition: 'all 0.3s', boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'; }}
            >
              Apply for e-Visa →
            </button>
            <div style={{ marginTop: 24, fontSize: 13, color: 'rgba(255,255,255,0.7)', fontFamily: "'Lato', sans-serif" }}>
              ✓ No hidden fees &nbsp;&nbsp; ✓ Expert review &nbsp;&nbsp; ✓ Fast processing
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: '100px 24px', background: '#fff9f0' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 4, textTransform: 'uppercase', color: '#d65d0e', fontFamily: "'Lato', sans-serif", fontWeight: 700, marginBottom: 12 }}>Get In Touch</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 900, color: '#2c1810', marginBottom: 20 }}>
                Have Questions?<br />We're Here to Help
              </h2>
              <p style={{ fontSize: 16, color: '#6b4226', lineHeight: 1.8, fontFamily: "'Lato', sans-serif", marginBottom: 40 }}>
                Our visa experts are available to guide you through the process and answer any questions about your India e-Visa application.
              </p>
              {[
                { icon: '📧', label: 'Email Us', value: 'support@visaconcierge.com' },
                { icon: '⏰', label: 'Working Hours', value: 'Mon–Sat, 9AM–6PM IST' },
                { icon: '📍', label: 'Office', value: 'New Delhi, India' },
                { icon: '⚡', label: 'Response Time', value: 'Within 2 business hours' },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(214,93,14,0.15), rgba(198,41,34,0.1))', border: '1px solid rgba(214,93,14,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#8b5e3c', fontFamily: "'Lato', sans-serif" }}>{label}</div>
                    <div style={{ fontSize: 15, color: '#2c1810', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: '#fffbf4', border: '1px solid #e8d5b7', borderRadius: 8, padding: 40 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: '#2c1810', marginBottom: 8 }}>Send Us a Message</h3>
              <p style={{ fontSize: 14, color: '#8b5e3c', fontFamily: "'Lato', sans-serif", marginBottom: 28 }}>We'll respond within 2 business hours</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6b4226', marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>First Name</label>
                    <input className="contact-input" placeholder="John" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6b4226', marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>Last Name</label>
                    <input className="contact-input" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6b4226', marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>Email Address</label>
                  <input className="contact-input" type="email" placeholder="john@example.com" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6b4226', marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>Subject</label>
                  <input className="contact-input" placeholder="Question about my visa application" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#6b4226', marginBottom: 6, fontFamily: "'Lato', sans-serif" }}>Message</label>
                  <textarea className="contact-input" rows={4} placeholder="How can we help you?" style={{ resize: 'vertical' }} />
                </div>
                <button className="btn-primary" style={{ padding: '14px', borderRadius: 4, fontSize: 14, marginTop: 8 }}>
                  Send Message →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: '#0d0500', padding: '60px 24px 30px', borderTop: '1px solid rgba(255,179,0,0.2)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,179,0,0.15)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #ffb300, #d65d0e)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#1a0a00', fontFamily: "'Playfair Display', serif" }}>VC</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: '#ffb300' }}>Visa Concierge</div>
                </div>
                <p style={{ fontSize: 14, color: '#8b6a4a', lineHeight: 1.8, fontFamily: "'Lato', sans-serif", maxWidth: 280 }}>
                  Your trusted partner for India e-Visa applications. Fast, secure, and hassle-free visa processing for travelers worldwide.
                </p>
              </div>
              {[
                { title: 'Quick Links', links: ['Home', 'About Us', 'How It Works', 'Apply Now', 'Contact'] },
                { title: 'Visa Types', links: ['Tourist Visa', 'Business Visa', 'Medical Visa', 'Conference Visa', 'Transit Visa'] },
                { title: 'Support', links: ['FAQ', 'Document Guide', 'Track Application', 'Privacy Policy', 'Terms of Service'] },
              ].map(({ title, links }) => (
                <div key={title}>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#ffb300', fontFamily: "'Lato', sans-serif", marginBottom: 16 }}>{title}</div>
                  {links.map(link => (
                    <div key={link} className="footer-link" style={{ marginBottom: 10, display: 'block' }}>{link}</div>
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ fontSize: 13, color: '#5a3e28', fontFamily: "'Lato', sans-serif" }}>
                © 2024 Visa Concierge. All rights reserved. Not affiliated with the Government of India.
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                {['Privacy', 'Terms', 'Cookies'].map(item => (
                  <span key={item} className="footer-link">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};
