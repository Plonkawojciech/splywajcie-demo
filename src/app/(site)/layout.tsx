import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Header } from '@/components/Header'
import { db } from '@/lib/data'

const sans = Plus_Jakarta_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-sans' })

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
    <html lang="pl" className={sans.variable}>
      <body>
        {s.banner && <div className="topline"><div className="wrap"><span>{s.banner}</span><a href={`tel:${tel}`}>{s.contactName ? `${s.contactName}: ` : ''}{s.phone}</a></div></div>}
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
