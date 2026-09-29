import Link from 'next/link'
import { db, pic, zl, dateLong, DIFF } from '@/lib/data'
import { ReservationForm } from '@/components/ReservationForm'

export default async function Home() {
  const payload = await db()
  const [s, packages, rivers, news, gear] = await Promise.all([
    payload.findGlobal({ slug: 'settings' }),
    payload.find({ collection: 'packages', sort: 'order', limit: 3, depth: 0 }),
    payload.find({ collection: 'rivers', sort: 'order', limit: 8, depth: 0 }),
    payload.find({ collection: 'news', sort: '-date', limit: 2, depth: 0 }),
    payload.find({ collection: 'equipment', sort: 'order', limit: 4, depth: 0 }),
  ])
  const hero = pic({ image: s.heroImage, imageUrl: s.heroImageUrl }, 'full')
  const featured = rivers.docs.filter((r) => r.featured)
  const tel = (s.phone || '').replace(/[\s-]/g, '')
  return (
    <>
      <section className="hero">
        {hero && <img className="hero-img" src={hero} alt="" fetchPriority="high" referrerPolicy="no-referrer" />}
        <div className="wrap hero-in">
          <h1 className="display">{s.heroTitle}</h1>
          <p className="lead">{s.heroText}</p>
          <div className="cta-row">
            <Link className="btn btn-accent" href="/rezerwacja">Zarezerwuj kajaki</Link>
            <a className="btn btn-line" href={`tel:${tel}`}>{s.phone}</a>
          </div>
        </div>
      </section>
      <div className="board"><div className="wrap">
        {featured.map((r) => {
          const sec = r.sections?.[0]
          return (
            <Link key={r.id} href={`/rzeki/${r.slug}`} className="board-item">
              <b>{r.name}</b>
              <span>{sec ? `${sec.title}${sec.km ? ` · ${sec.km} km` : ''}${sec.hours ? ` · ${sec.hours} h` : ''}` : r.region}</span>
            </Link>
          )
        })}
      </div></div>

      <section className="section"><div className="wrap">
        <div className="sechead">
          <div><p className="kicker">Oferta</p><h2 className="h2">Kajak na dzień, spływ dla grupy albo wyprawa na kilka dni</h2></div>
          <Link className="textlink" href="/cennik">Pełny cennik</Link>
        </div>
        <div className="packs">
          {packages.docs.map((p) => {
            const img = pic(p)
            return (
              <article key={p.id} className="pack">
                {img && <img src={img} alt="" loading="lazy" referrerPolicy="no-referrer" />}
                <div className="pack-body">
                  <h3 className="h3">{p.name}</h3>
                  <p>{p.lead}</p>
                  <p className="pack-price">{p.price ? <><b>{zl(p.price)}</b><span>{p.unit}</span></> : <b>Wycena indywidualna</b>}{p.minPersons ? <small>od {p.minPersons} osób</small> : null}</p>
                  <Link href={`/cennik#${p.slug}`} className="textlink">Co jest w cenie</Link>
                </div>
              </article>
            )
          })}
        </div>
      </div></section>

      <section className="section tint"><div className="wrap">
        <div className="sechead">
          <div><p className="kicker">Rzeki</p><h2 className="h2">Pływamy tam, gdzie znamy każdą zwałkę</h2>
            <p className="lead">Głównie dopływy Gwdy w północnej Wielkopolsce: krystaliczna woda, las po obu brzegach, start w Szwecji albo Nadarzycach. Na życzenie dowozimy kajaki na inne rzeki.</p></div>
          <Link className="textlink" href="/rzeki">Wszystkie rzeki</Link>
        </div>
        <div className="rivers">
          {rivers.docs.map((r) => (
            <Link key={r.id} href={`/rzeki/${r.slug}`} className="river">
              <span className="river-name">{r.name}</span>
              <span className="river-meta">{r.region}{r.difficulty ? ` · ${DIFF[r.difficulty]}` : ''}</span>
              <span className="river-lead">{r.lead}</span>
            </Link>
          ))}
        </div>
      </div></section>

      <section className="section"><div className="wrap split">
        <div>
          <p className="kicker">Baza sprzętowa</p>
          <h2 className="h2">{s.baseName}</h2>
          <p className="lead">{s.baseNote}</p>
          <p className="addr">{(s.baseAddress || '').split('\n').map((l: string) => <span key={l}>{l}</span>)}{s.coords && <span>Współrzędne {s.coords}</span>}</p>
          <div className="cta-row">
            {s.mapUrl && <a className="btn btn-solid" href={s.mapUrl} rel="noopener" target="_blank">Pobierz lokalizację</a>}
            <Link className="btn btn-line" href="/kontakt">Dojazd i kontakty w bazie</Link>
          </div>
        </div>
        <div className="gear-list">
          <p className="kicker">Sprzęt</p>
          {gear.docs.map((g) => (
            <div key={g.id} className="gear-row">
              <b>{g.name}</b>
              <span>{g.body.split('. ')[0]}.</span>
            </div>
          ))}
          <Link href="/sprzet" className="textlink">Cały sprzęt i parametry</Link>
        </div>
      </div></section>

      {news.docs.length > 0 && (
        <section className="section tint"><div className="wrap">
          <div className="sechead">
            <div><p className="kicker">Nowinki</p><h2 className="h2">Z rzek, na których byliśmy ostatnio</h2></div>
            <Link className="textlink" href="/nowinki">Wszystkie wpisy</Link>
          </div>
          <div className="news">
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
        </div></section>
      )}

      <section className="section navy"><div className="wrap split">
        <div>
          <p className="kicker">Rezerwacja</p>
          <h2 className="h2">Termin, rzeka, liczba kajaków. Resztę ustalimy przez telefon.</h2>
          <p className="lead">Rezerwację potwierdza zaliczka 30 %. Do 14 dni przed spływem można bezkosztowo zmniejszyć liczbę kajaków. Przy ostrzeżeniu meteorologicznym przekładamy termin, zaliczka nie przepada.</p>
          <p className="big-tel"><a href={`tel:${tel}`}>{s.phone}</a></p>
        </div>
        <div className="aside"><ReservationForm rivers={rivers.docs.map((r) => ({ id: r.id, name: r.name }))} /></div>
      </div></section>
    </>
  )
}
