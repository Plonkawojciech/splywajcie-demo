'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAV: [string, string][] = [
  ['Rzeki', '/rzeki'],
  ['Cennik', '/cennik'],
  ['Sprzęt', '/sprzet'],
  ['Nowinki', '/nowinki'],
  ['Baza i dojazd', '/kontakt'],
]

export function Header({ phone }: { phone: string }) {
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => setOpen(false), [path])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const active = (h: string) => path === h || path.startsWith(h + '/')
  const tel = phone.replace(/[\s-]/g, '')
  return (
    <>
      <header className={'head' + (scrolled ? ' scrolled' : '')}>
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Splywajcie.pl, strona główna">
            <img src="/img/logo.png" alt="Splywajcie.pl" width={150} height={46} />
          </Link>
          <nav className="nav" aria-label="Główne">
            {NAV.map(([l, h]) => <Link key={h} href={h} className={active(h) ? 'on' : ''} aria-current={active(h) ? 'page' : undefined}>{l}</Link>)}
          </nav>
          <div className="head-act">
            <Link href="/rezerwacja" className="btn btn-accent btn-sm">Rezerwuj</Link>
            <button className="burger" aria-expanded={open} aria-controls="menu-mobile" aria-label="Menu" onClick={() => setOpen((o) => !o)}><span /><span /><span /></button>
          </div>
        </div>
      </header>
      <nav id="menu-mobile" className={'drawer' + (open ? ' open' : '')} aria-label="Menu mobilne">
        {NAV.map(([l, h]) => <Link key={h} href={h}>{l}</Link>)}
        <a href={`tel:${tel}`}>Zadzwoń: {phone}</a>
      </nav>
    </>
  )
}
