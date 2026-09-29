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
  useEffect(() => setOpen(false), [path])
  const active = (h: string) => path === h || path.startsWith(h + '/')
  const tel = phone.replace(/[\s-]/g, '')
  return (
    <>
      <header className="head">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Splywajcie.pl, strona główna">
            <img src="https://splywajcie.pl/images/stories/logotyp_maly.png" alt="Splywajcie.pl" width={150} height={46} referrerPolicy="no-referrer" />
          </Link>
          <nav className="nav" aria-label="Główne">
            {NAV.map(([l, h]) => <Link key={h} href={h} className={active(h) ? 'on' : ''} aria-current={active(h) ? 'page' : undefined}>{l}</Link>)}
          </nav>
          <div className="head-act">
            <a href={`tel:${tel}`} className="head-tel">{phone}</a>
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
