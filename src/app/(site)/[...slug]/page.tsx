import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db, pic, zl, dateLong, DIFF } from '@/lib/data'
import { ReservationForm } from '@/components/ReservationForm'

type Props = { params: Promise<{ slug: string[] }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const segs = (await params).slug
  const p = segs.join('/')
  const fixed: Record<string, string> = { rzeki: 'Rzeki i odcinki', cennik: 'Cennik i warunki wynajmu', sprzet: 'Nasze kajaki i sprzęt', nowinki: 'Nowinki z rzek', rezerwacja: 'Rezerwacja', kontakt: 'Baza i dojazd' }
  if (fixed[p]) return { title: fixed[p] }
  const payload = await db()
  if (segs[0] === 'rzeki' && segs[1]) {
    const r = await payload.find({ collection: 'rivers', where: { slug: { equals: segs[1] } }, limit: 1 })
    return r.docs[0] ? { title: `Spływ kajakowy ${r.docs[0].name}`, description: r.docs[0].lead } : {}
  }
  if (segs[0] === 'nowinki' && segs[1]) {
    const r = await payload.find({ collection: 'news', where: { slug: { equals: segs[1] } }, limit: 1 })
    return r.docs[0] ? { title: r.docs[0].title, description: r.docs[0].lead } : {}
  }
  return {}
}

export default async function Page({ params }: Props) {
  const segs = (await params).slug
  const p = segs.join('/')
  const payload = await db()

  if (p === 'rzeki') {
    const r = await payload.find({ collection: 'rivers', sort: 'order', limit: 40 })
    return (
      <div className="section"><div className="wrap">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Rzeki</span></div>
        <h1 className="h1">Rzeki i odcinki</h1>
        <p className="lead">Opisujemy tylko rzeki, którymi pływamy wielokrotnie w ciągu roku. Informacje są orientacyjne, przed spływem potwierdzamy warunki w terenie, bo wieczna jest tylko zmiana.</p>
        <div className="rivers" style={{ marginTop: 44 }}>
          {r.docs.map((x) => (
            <Link key={x.id} href={`/rzeki/${x.slug}`} className="river">
              <span className="river-name">{x.name}</span>
              <span className="river-meta">{x.region}{x.difficulty ? ` · ${DIFF[x.difficulty]}` : ''}{x.sections?.length ? ` · ${x.sections.length} ${x.sections.length === 1 ? 'odcinek' : 'odcinki'}` : ''}</span>
              <span className="river-lead">{x.lead}</span>
            </Link>
          ))}
        </div>
      </div></div>
    )
  }

  if (segs[0] === 'rzeki' && segs.length === 2) {
    const r = (await payload.find({ collection: 'rivers', where: { slug: { equals: segs[1] } }, limit: 1 })).docs[0]
    if (!r) notFound()
    const rivers = await payload.find({ collection: 'rivers', sort: 'order', limit: 40, depth: 0 })
    const img = pic(r, 'full')
    return (
      <>
        <section className="ohero">
          {img && <img src={img} alt="" referrerPolicy="no-referrer" />}
          <div className="wrap ohero-in">
            <div className="crumbs light"><Link href="/">Start</Link><span>/</span><Link href="/rzeki">Rzeki</Link><span>/</span><span>{r.name}</span></div>
            <h1 className="display">{r.name}</h1>
            <p className="lead">{r.lead}</p>
          </div>
        </section>
        <div className="section"><div className="wrap obody">
          <article>
            <dl className="facts">
              {r.region && <div><dt>Gdzie</dt><dd>{r.region}</dd></div>}
              {r.difficulty && <div><dt>Trudność</dt><dd>{DIFF[r.difficulty]}</dd></div>}
              {r.sections?.length ? <div><dt>Odcinki</dt><dd>{r.sections.length}</dd></div> : null}
            </dl>
            {(r.sections || []).map((sec: any) => (
              <section key={sec.id} className="osec">
                <h2 className="h3">{sec.title}</h2>
                {(sec.km || sec.hours) && <p className="osec-meta">{[sec.km ? `${sec.km} km` : null, sec.hours ? `około ${sec.hours} h` : null].filter(Boolean).join(' · ')}</p>}
                {sec.body && <p>{sec.body}</p>}
              </section>
            ))}
          </article>
          <aside className="aside">
            <p className="aside-h">{/^[A-ZŁŚŻŹĆ][a-ząęółśżźćń]+a$/.test(r.name) ? `Zarezerwuj spływ ${r.name.slice(0, -1)}ą` : 'Zarezerwuj spływ'}</p>
            <ReservationForm rivers={rivers.docs.map((x) => ({ id: x.id, name: x.name }))} selected={r.id} />
          </aside>
        </div></div>
      </>
    )
  }

  if (p === 'cennik') {
    const [packs, s] = await Promise.all([payload.find({ collection: 'packages', sort: 'order', limit: 10 }), payload.findGlobal({ slug: 'settings' })])
    return (
      <div className="section"><div className="wrap narrow">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Cennik</span></div>
        <h1 className="h1">Cennik i warunki wynajmu</h1>
        <p className="lead">Ceny obejmują komplet sprzętu i transport kajaków na start i z mety na Piławie, Rurzycy, Dobrzycy i Gwdzie. Inne rzeki wyceniamy osobno.</p>
        {packs.docs.map((pk) => (
          <section key={pk.id} id={pk.slug} className="pricecard">
            <div className="pricecard-head">
              <h2 className="h3">{pk.name}</h2>
              <p className="pack-price">{pk.price ? <><b>{zl(pk.price)}</b><span>{pk.unit}</span></> : <b>Wycena indywidualna</b>}{pk.minPersons ? <small>od {pk.minPersons} osób</small> : null}</p>
            </div>
            <p className="prose">{pk.body || pk.lead}</p>
            {pk.includes && pk.includes.length > 0 && <ul className="ticks">{pk.includes.map((i: any) => <li key={i.id}>{i.text}</li>)}</ul>}
            {pk.priceNote && <p className="note">{pk.priceNote}</p>}
          </section>
        ))}
        <section className="pricecard" id="warunki">
          <h2 className="h3">Warunki wynajmu sprzętu</h2>
          <ol className="terms">{(s.terms || []).map((t: any) => <li key={t.id}>{t.text}</li>)}</ol>
          {s.bankAccount && <p className="note">Wpłaty zaliczek: {s.bankAccount}. Na podstawie zaliczki wystawiamy fakturę i wysyłamy ją e-mailem.</p>}
        </section>
        <div className="cta-row"><Link className="btn btn-accent" href="/rezerwacja">Zarezerwuj termin</Link></div>
      </div></div>
    )
  }

  if (p === 'sprzet') {
    const gear = await payload.find({ collection: 'equipment', sort: 'order', limit: 20 })
    return (
      <div className="section"><div className="wrap">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Sprzęt</span></div>
        <h1 className="h1">Nasze kajaki i sprzęt</h1>
        <p className="lead">W wypożyczalni są tylko markowe kajaki i osprzęt. Można wynająć malucha w cenie mercedesa; u nas jest odwrotnie.</p>
        <div className="gear">
          {gear.docs.map((g) => {
            const img = pic(g)
            return (
              <article key={g.id} className="gearcard">
                {img && <div className="gearcard-ph"><img src={img} alt="" loading="lazy" referrerPolicy="no-referrer" /></div>}
                <div className="gearcard-body">
                  {g.maker && <span className="kicker" style={{ marginBottom: 6 }}>{g.maker}</span>}
                  <h2 className="h3">{g.name}</h2>
                  <p>{g.body}</p>
                  {g.specs && g.specs.length > 0 && <table className="specs"><tbody>{g.specs.map((x: any) => <tr key={x.id}><td>{x.key}</td><td>{x.value}</td></tr>)}</tbody></table>}
                </div>
              </article>
            )
          })}
        </div>
      </div></div>
    )
  }

  if (p === 'nowinki') {
    const news = await payload.find({ collection: 'news', sort: '-date', limit: 30 })
    return (
      <div className="section"><div className="wrap">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Nowinki</span></div>
        <h1 className="h1">Nowinki z rzek</h1>
        <p className="lead">Relacje z rzek, którymi pływamy, i uwagi praktyczne dla kajakarzy: gdzie start, gdzie przenoska, gdzie dobra przystań.</p>
        <div className="news" style={{ marginTop: 44 }}>
          {news.docs.map((n) => {
            const img = pic(n)
            return (
              <Link key={n.id} href={`/nowinki/${n.slug}`} className="newscard">
                {img && <img src={img} alt="" loading="lazy" referrerPolicy="no-referrer" />}
                <span className="newscard-body">
                  <span className="newscard-date">{dateLong(n.date)}{n.river ? ` · ${n.river}` : ''}</span>
                  <b>{n.title}</b>
                  <span>{n.lead}</span>
                </span>
              </Link>
            )
          })}
        </div>
      </div></div>
    )
  }

  if (segs[0] === 'nowinki' && segs.length === 2) {
    const n = (await payload.find({ collection: 'news', where: { slug: { equals: segs[1] } }, limit: 1 })).docs[0]
    if (!n) notFound()
    const img = pic(n, 'full')
    return (
      <div className="section"><div className="wrap narrow">
        <div className="crumbs"><Link href="/">Start</Link><span>/</span><Link href="/nowinki">Nowinki</Link><span>/</span><span>{n.title}</span></div>
        <p className="kicker">{dateLong(n.date)}{n.river ? ` · ${n.river}` : ''}</p>
        <h1 className="h1">{n.title}</h1>
        <p className="lead">{n.lead}</p>
        {img && <img src={img} alt="" className="article-img" referrerPolicy="no-referrer" />}
        <div className="prose" style={{ whiteSpace: 'pre-line' }}>{n.body}</div>
      </div></div>
    )
  }

  if (p === 'rezerwacja') {
    const [rivers, s] = await Promise.all([payload.find({ collection: 'rivers', sort: 'order', limit: 40, depth: 0 }), payload.findGlobal({ slug: 'settings' })])
    return (
      <div className="section"><div className="wrap split">
        <div>
          <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Rezerwacja</span></div>
          <h1 className="h1">Rezerwacja kajaków</h1>
          <p className="lead">Wpisz termin, rzekę i liczbę kajaków. Oddzwaniamy, doradzamy odcinek i podajemy kwotę zaliczki. Rezerwację potwierdza wpłata 30 %.</p>
          <p className="big-tel"><a href={`tel:${(s.phone || '').replace(/[\s-]/g, '')}`}>{s.phone}</a></p>
          <p className="muted">{s.contactName}, rezerwacje i pytania o rzeki</p>
        </div>
        <div className="aside"><ReservationForm rivers={rivers.docs.map((r) => ({ id: r.id, name: r.name }))} /></div>
      </div></div>
    )
  }

  if (p === 'kontakt') {
    const s = await payload.findGlobal({ slug: 'settings' })
    return (
      <div className="section"><div className="wrap split">
        <div>
          <div className="crumbs"><Link href="/">Start</Link><span>/</span><span>Baza i dojazd</span></div>
          <h1 className="h1">{s.baseName}</h1>
          <p className="lead">{s.baseNote}</p>
          <dl className="dl">
            <div><dt>Adres</dt><dd style={{ whiteSpace: 'pre-line' }}>{s.baseAddress}</dd></div>
            {s.coords && <div><dt>Współrzędne</dt><dd>{s.coords}</dd></div>}
            <div><dt>Rezerwacje</dt><dd><a href={`tel:${(s.phone || '').replace(/[\s-]/g, '')}`}>{s.contactName}, {s.phone}</a><br /><a href={`mailto:${s.email}`}>{s.email}</a></dd></div>
          </dl>
          {s.mapUrl && <div className="cta-row"><a className="btn btn-solid" href={s.mapUrl} rel="noopener" target="_blank">Pobierz lokalizację</a></div>}
        </div>
        <div>
          <h2 className="h3">Kontakty w bazie</h2>
          <dl className="dl" style={{ marginTop: 18 }}>
            {(s.baseContacts || []).map((c: any) => <div key={c.id}><dt>{c.role}</dt><dd><a href={`tel:${c.phone.replace(/[\s-]/g, '')}`}>{c.name}, {c.phone}</a></dd></div>)}
          </dl>
        </div>
      </div></div>
    )
  }

  notFound()
}
