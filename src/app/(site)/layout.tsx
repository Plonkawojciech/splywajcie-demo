import type { Metadata } from 'next'
import { Open_Sans, Raleway } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Header } from '@/components/Header'
import { db } from '@/lib/data'

const sans = Open_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-sans' })
const head = Raleway({ subsets: ['latin', 'latin-ext'], variable: '--font-head' })

export const metadata: Metadata = {
  title: { default: 'Splywajcie.pl — spływy kajakowe Piława, Rurzyca, Gwda', template: '%s — Splywajcie.pl' },
  description: 'Wypożyczalnia kajaków i organizator spływów kajakowych na dopływach Gwdy: Piława, Rurzyca, Dobrzyca, Czernica. Baza w Szwecji koło Wałcza, kajaki Vista Perception, spływy grupowe z instruktorem i ratownikiem.',
  openGraph: { siteName: 'Splywajcie.pl', locale: 'pl_PL', type: 'website' },
  robots: { index: false, follow: false },
}
export const dynamic = 'force-dynamic'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const payload = await db()
  const s = await payload.findGlobal({ slug: 'settings' })
  const tel = (s.phone || '').replace(/[\s-]/g, '')
  return (
    <html lang="pl" className={`${sans.variable} ${head.variable}`}>
      <body>
        <div className="topline"><div className="wrap">
          {s.banner && <span className="topline-note">{s.banner}</span>}
          <div className="topline-links">
            <Link href="/cennik#wypozyczalnia"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2 14c3 2 6 2 10 2s7 0 10-2" /><path d="M5 13l3-4h8l3 4" /><path d="M9 5l6 12" /></svg>Wypożyczalnia kajaków</Link>
            <Link href="/cennik#splyw-grupowy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M2 17c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 3.5 1.5 5 0" /><path d="M2 12c2.5 1.5 5 1.5 7.5 0s5-1.5 7.5 0 3.5 1.5 5 0" /><circle cx="12" cy="6" r="2" /></svg>Spływy grupowe</Link>
            <a className="tl-tel" href={`tel:${tel}`}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></svg>{s.contactName ? `${s.contactName}: ` : ''}{s.phone}</a>
          </div>
        </div></div>
        <Header phone={s.phone || ''} />
        <main>{children}</main>
        <footer className="foot"><div className="wrap">
          <div>
            <p className="foot-name">Splywajcie.pl</p>
            <p className="foot-txt">{s.about}</p>
          </div>
          <div>
            <p className="foot-h">Na stronie</p>
            <ul>
              <li><Link href="/rzeki">Rzeki i odcinki</Link></li>
              <li><Link href="/cennik">Cennik i warunki</Link></li>
              <li><Link href="/sprzet">Nasze kajaki</Link></li>
              <li><Link href="/nowinki">Nowinki z rzek</Link></li>
              <li><Link href="/rezerwacja">Rezerwacja</Link></li>
            </ul>
          </div>
          <div>
            <p className="foot-h">Rezerwacje</p>
            <ul>
              <li><a href={`tel:${tel}`}>{s.contactName}, {s.phone}</a></li>
              <li><a href={`mailto:${s.email}`}>{s.email}</a></li>
              {s.facebook && <li><a href={s.facebook} rel="noopener">Facebook</a></li>}
            </ul>
          </div>
          <div>
            <p className="foot-h">{s.baseName}</p>
            <p className="foot-addr">{(s.baseAddress || '').split('\n').map((l: string) => <span key={l}>{l}</span>)}</p>
            {s.mapUrl && <p style={{ margin: '10px 0 0' }}><a href={s.mapUrl} rel="noopener" target="_blank" className="textlink">Pobierz lokalizację</a></p>}
          </div>
          <div className="cr"><span>© {new Date().getFullYear()} Splywajcie.pl</span><span>Wersja demonstracyjna nowej strony · Programo s.j.</span></div>
        </div></footer>
      </body>
    </html>
  )
}
