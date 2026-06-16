import { useState, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!navRef.current) return

    const trigger = ScrollTrigger.create({
      start: 'top -100',
      onEnter: () => {
        if (navRef.current) {
          gsap.to(navRef.current, {
            backgroundColor: 'rgba(14, 14, 12, 0.95)',
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      },
      onLeaveBack: () => {
        if (navRef.current) {
          gsap.to(navRef.current, {
            backgroundColor: 'transparent',
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      },
    })

    return () => trigger.kill()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const navLinks = [
    { label: 'Services', href: '#estimateur' },
    { label: 'Méthode', href: '#methode' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'transparent',
        backdropFilter: 'none',
        transition: 'padding 0.3s ease',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.4rem',
            fontWeight: 300,
            letterSpacing: '0.12em',
            color: '#F7F6F2',
            lineHeight: 1,
          }}
        >
          L'HÔTE
        </span>
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.55rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#8B8678',
            marginTop: '0.2rem',
          }}
        >
          Conciergerie
        </span>
      </a>

      {/* Desktop links */}
      <div
        style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center',
        }}
        className="desktop-nav"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8B8678',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#F7F6F2' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#8B8678' }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 400,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#C9A96E',
            textDecoration: 'none',
            padding: '0.5rem 1.25rem',
            border: '1px solid rgba(201, 169, 110, 0.4)',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#C9A96E'
            e.currentTarget.style.color = '#0E0E0C'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#C9A96E'
          }}
        >
          Diagnostic gratuit
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          flexDirection: 'column',
          gap: '5px',
        }}
        className="mobile-hamburger"
      >
        <span
          style={{
            display: 'block',
            width: '22px',
            height: '1px',
            background: '#F7F6F2',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
          }}
        />
        <span
          style={{
            display: 'block',
            width: '22px',
            height: '1px',
            background: '#F7F6F2',
            transition: 'opacity 0.3s ease',
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          style={{
            display: 'block',
            width: '22px',
            height: '1px',
            background: '#F7F6F2',
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          }}
        />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '60px',
            left: 0,
            right: 0,
            background: 'rgba(14, 14, 12, 0.98)',
            backdropFilter: 'blur(12px)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '1rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#F7F6F2',
                textDecoration: 'none',
                padding: '0.5rem 0',
                borderBottom: '1px solid rgba(247, 246, 242, 0.06)',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.85rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#C9A96E',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '1px solid rgba(201, 169, 110, 0.4)',
              textAlign: 'center',
              marginTop: '0.5rem',
            }}
          >
            Diagnostic gratuit
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
