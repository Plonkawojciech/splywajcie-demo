/* Seed demo Splywajcie.pl — treść, ceny i zdjęcia pochodzą z obecnej strony splywajcie.pl. Zakres celowo mały. */
import { getPayload } from 'payload'
import config from '../src/payload.config'

const S = 'https://splywajcie.pl/images/stories/'

async function main() {
  const payload = await getPayload({ config })
  if ((await payload.count({ collection: 'rivers' })).totalDocs > 0 && !process.argv.includes('--force')) {
    console.log('[seed] dane już są, pomijam')
    process.exit(0)
  }
  if ((await payload.count({ collection: 'users' })).totalDocs === 0) {
    await payload.create({ collection: 'users', data: { email: 'demo@splywajcie.pl', password: 'splywajcie2026', name: 'Sławek' } })
    console.log('[seed] konto demo@splywajcie.pl / splywajcie2026')
  }

  const rivers: any[] = [
    { name: 'Piława', slug: 'pilawa', region: 'dopływ Gwdy', difficulty: 'easy', featured: true, order: 1, imageUrl: S + 'naglowki/17.jpg',
      lead: 'Krystalicznie czysta woda, las po obu brzegach i nasza baza w Szwecji na trasie. Najczęściej wybierana rzeka na spływ jednodniowy i pierwszy spływ w życiu.',
      sections: [
        { title: 'Nadarzyce – Szwecja', km: 12, hours: '3–4', body: 'Start na przystani w Nadarzycach, meta przy moście DK 22 w Szwecji, obok pola namiotowego „Nad Zatoczką”. Spokojny nurt, kilka zwałek do ominięcia, dużo miejsc na postój. Odcinek dla rodzin z dziećmi i grup firmowych.' },
        { title: 'Szwecja – Dobrzyca', km: 14, hours: '4–5', body: 'Rzeka szersza, więcej łąk i rozlewisk. Meta w Dobrzycy przed wpływem do Gwdy. Dobry drugi dzień spływu weekendowego.' },
        { title: 'Sikory – Dobrzyca', km: 40, hours: '2 dni', body: 'Cały szlak Piławy od Sikor. Znamy go dokładnie i pomagamy wybrać nocleg po drodze.' },
      ] },
    { name: 'Rurzyca', slug: 'rurzyca', region: 'dopływ Gwdy', difficulty: 'medium', featured: true, order: 2, imageUrl: S + 'naglowki/6.jpg',
      lead: 'Wąska, szybka i bardzo czysta. Jeziora przeplatane rzecznymi odcinkami przez las. Więcej wrażeń niż na Piławie, nadal bez ekstremów.',
      sections: [
        { title: 'Trzebieszki – Krępsko', km: 25, hours: '6–7', body: 'Cały szlak Rurzycy: od Trzebieszek przez ciąg jezior do Krępska nad Gwdą. Zwałki, wąskie przesmyki i przenoska przy młynie. Polecamy osobom, które już siedziały w kajaku.' },
      ] },
    { name: 'Dobrzyca', slug: 'dobrzyca', region: 'dopływ Gwdy', difficulty: 'easy', featured: true, order: 3, imageUrl: S + 'naglowki/18.jpg',
      lead: 'Spokojna rzeka z długimi prostymi odcinkami i szeroką doliną. Dobra na spływy grupowe i dla osób, które chcą popływać bez pośpiechu.',
      sections: [{ title: 'Nowa Wieś – Tarnowo', km: 18, hours: '5', body: 'Znamy cały szlak. Meta w Tarnowie przy młynie, skąd zabieramy kajaki i uczestników.' }] },
    { name: 'Czernica', slug: 'czernica', region: 'dopływ Gwdy', difficulty: 'medium', order: 4, imageUrl: S + 'naglowki/19.jpg',
      lead: 'Mała rzeka z dużą liczbą zakrętów i przeszkód. Na Czernicy uczymy manewrowania i czytania nurtu.',
      sections: [{ title: 'Czarne – Lubnica', km: 22, hours: '6', body: 'Od Czarnego do wpływu do Gwdy kilkaset metrów za Lubnicą. Kilka zwałek do przeniesienia.' }] },
    { name: 'Gwda', slug: 'gwda', region: 'północna Wielkopolska', difficulty: 'easy', featured: true, order: 5, imageUrl: S + 'naglowki/9.jpg',
      lead: 'Szeroka, spokojna rzeka na koniec każdego spływu dopływami. Od Drężna do elektrowni wodnej w Pile.',
      sections: [
        { title: 'Krępsko – Piła', km: 30, hours: '7–8', body: 'Od ujścia Rurzycy do Piły. Rzeka szeroka, nurt równy, miejscami jeziora zaporowe. Dobra na spływ dwudniowy z noclegiem w Dobrzycy.' },
      ] },
    { name: 'Inne rzeki', slug: 'inne-rzeki', region: 'Pomorze, Kaszuby, Wielkopolska', difficulty: 'hard', order: 6, imageUrl: S + 'news/20250510_155108.jpg',
      lead: 'Brda, Chocina, Drawa, Korytnica, Łupawa, Słupia, Obra, Wda, Zbrzyca, Łeba. Dowozimy sprzęt i prowadzimy grupę na trasie, którą sami przepłynęliśmy.',
      sections: [
        { title: 'Łupawa i Słupia', body: 'Rzeki trudne, z szybkim nurtem i zwałkami, dla zaawansowanych. Najbliżej nas Łupawa na Kaszubach i odcinek Słupi koło Sulęczyna.' },
        { title: 'Wełna', body: 'Mieszkańcy Poznania wybierają Wełnę ze względu na niewielką odległość od stolicy Wielkopolski.' },
      ] },
  ]
  for (const r of rivers) await payload.create({ collection: 'rivers', data: r })
  console.log('[seed] rzeki:', rivers.length)

  const packages: any[] = [
    { name: 'Wypożyczalnia kajaków', slug: 'wypozyczalnia', order: 1, price: 120, unit: '/kajak/dzień', imageUrl: S + 'naglowki/19.jpg',
      lead: 'Dwuosobowy kajak Vista Perception z kompletem: wiosła, kamizelki, worki wodoszczelne. Transport na start i z mety w cenie.',
      body: 'W cenie dnia wynajmu dostajesz dwuosobowy kajak turystyczny Vista Perception z regulowanymi fotelami i neoprenowymi nakładkami, dwa lekkie wiosła Egalis, dwa worki wodoszczelne Fjord Nansen 30 l i dwie kamizelki Aquarius. Na życzenie kamizelka ratunkowa i trzecie siedzisko dla kilkulatka. W ramach przewozu kajaków zabieramy nieodpłatnie do 8 osób; większa grupa jedzie własnymi autami na start, a kierowcy wracają razem z kajakami.',
      includes: ['2-osobowy kajak Vista Perception (Wave Sport)', '2 wiosła aluminiowe Egalis z piórem fibrylonowym', '2 worki wodoszczelne Fjord Nansen 30 l', '2 kamizelki asekuracyjne Aquarius', 'Kamizelka ratunkowa i trzecie siedzisko dla dziecka w razie potrzeby', 'Przewóz kajaków: Piława, Rurzyca, Dobrzyca, Gwda'],
      priceNote: 'Inne, dalsze rzeki wyceniamy dodatkowo. Osoby indywidualne ubezpieczają się od NNW we własnym zakresie.' },
    { name: 'Spływ grupowy „na piątkę”', slug: 'splyw-grupowy', order: 2, price: 300, unit: '/os./dzień', minPersons: 20, imageUrl: S + 'naglowki/18.jpg',
      lead: 'Jednodniowy spływ z instruktorem kajakarstwa i ratownikiem WOPR, zdjęciami i filmem ze spływu. Dla firm, szkół, rodzin i grup znajomych.',
      body: 'Co roku z naszych spływów grupowych korzysta kilkaset osób. Uczestnikami mogą być amatorzy i osoby nieumiejące pływać: przez cały spływ są pod opieką instruktora i ratowników. Dobieramy rzekę i odcinek tak, żeby było bezpiecznie i przyjemnie, zwykle Piławę albo Rurzycę.',
      includes: ['2-osobowe kajaki Vista Perception i wiosła Egalis Boreal', 'Kamizelki Aquarius i worki wodoszczelne Fjord Nansen 30 l na osobę', 'Instruktor rekreacji ruchowej o specjalności kajakarstwo i instruktaż przed spływem', 'Ratownik WOPR, powyżej 20 uczestników dwóch ratowników', 'Apteczka i podręczna pomoc medyczna', 'Ponad 100 zdjęć w wysokiej rozdzielczości i film Full HD ze spływu, udostępnione online', 'Przewóz kajaków na start i z mety'] },
    { name: 'Spływy wielodniowe i inne rzeki', slug: 'wielodniowe', order: 3, imageUrl: S + 'naglowki/9.jpg',
      lead: 'Kilka dni na Brdzie, Drawie, Łupawie albo dopływach Gwdy z noclegami na polach namiotowych i w agroturystyce. Dobieramy rzekę do grupy i prowadzimy ją bezpiecznie przez cały szlak.',
      body: 'Organizujemy spływy kilkudniowe: dobieramy rzekę, przeprowadzamy grupę przez zaplanowany szlak, a dzięki znajomości pól namiotowych i gospodarstw agroturystycznych pomagamy wybrać nocleg. Gdy chcecie płynąć inną rzeką niż nasze domowe, dowozimy sprzęt na wskazane miejsce.',
      includes: ['Plan trasy z noclegami', 'Komplet sprzętu jak w wypożyczalni', 'Transport kajaków na start i z mety, także na dalsze rzeki', 'Opieka instruktora na życzenie'],
      priceNote: 'Cena zależy od rzeki, liczby dni i kajaków. Wycenę dostajesz po rozmowie telefonicznej.' },
  ]
  for (const p of packages) await payload.create({ collection: 'packages', data: { ...p, includes: (p.includes || []).map((text: string) => ({ text })) } })
  console.log('[seed] pakiety:', packages.length)

  const gear: any[] = [
    { name: 'Kajak Vista', maker: 'Perception / Wave Sport', order: 1, imageUrl: S + 'nasz_sprzet/vista.gif',
      body: 'Dwuosobowy polietylenowy kajak turystyczny, produkt angielski. Regulowane fotele z wysokim oparciem, neoprenowe nakładki na siedziska, miejsca na napój, mapnik na dziobie i regulowane podnóżki. Stabilny, pakowny, wygodny nawet po kilku godzinach.',
      specs: [{ key: 'Długość', value: '4,85 m' }, { key: 'Szerokość', value: '0,82 m' }, { key: 'Waga', value: '37 kg' }, { key: 'Kokpit', value: '228 × 61 cm' }, { key: 'Maksymalne obciążenie', value: '300 kg' }] },
    { name: 'Wiosło Boreal', maker: 'Egalis', order: 2, imageUrl: S + 'oparcie.jpg',
      body: 'Lekkie wiosło aluminiowe z piórem fibrylonowym (polietylen z włóknem szklanym). Gumowane uchwyty z ogranicznikami, żeby woda nie spływała na dłonie. Wiosła o wadze pół kilograma nie czuć w rękach po kilku godzinach.',
      specs: [{ key: 'Długość', value: '220 cm' }, { key: 'Typ', value: 'proste' }] },
    { name: 'Kamizelka asekuracyjna', maker: 'Aquarius', order: 3,
      body: 'Klasyczna kamizelka kajakowa wkładana przez głowę lub bokiem po rozpięciu klamer. Wycięcie pod pachami nie krępuje wiosłowania, pas krokowy zapobiega wyślizgnięciu się. Model wybierany przez profesjonalne firmy organizujące spływy. Dla dzieci: kamizelki ratunkowe Ratex z kołnierzem, rozmiary do 15 kg i 15–40 kg.',
      specs: [{ key: 'Norma', value: 'PN-EN ISO 12402-5:2007' }] },
    { name: 'Worek wodoszczelny 30 l', maker: 'Fjord Nansen', order: 4, imageUrl: S + 'fjord.png',
      body: 'Trwały worek z wodoszczelnego PCV z ergonomicznym paskiem na ramię. Tylko u nas w cenie wynajmu kajaka: dwa worki na kajak, żeby zmiana ubrania została sucha nawet po wywrotce.',
      specs: [{ key: 'Pojemność', value: '30 l (także 10 l)' }] },
    { name: 'Trzecie siedzisko dla dziecka', maker: 'Perception', order: 5,
      body: 'Dodatkowe siedzisko do dwuosobowej Visty dla dzieci w wieku od 3 do 7 lat. Rozwiązanie dla rodziny z jednym małym dzieckiem, które chce mieć blisko siebie.' },
    { name: 'Rzutka ratownicza', order: 6,
      body: 'Rękaw z 25 metrami nietonącej liny o średnicy 10 mm, klarowanej tak, żeby użyć jej natychmiast. Niezbędna na dużych jeziorach i rzekach górskich; w spływach grupowych ma ją ratownik.' },
  ]
  for (const g of gear) await payload.create({ collection: 'equipment', data: g })
  console.log('[seed] sprzęt:', gear.length)

  const news: any[] = [
    { title: 'Łeba: z Lęborka do Chocielewka', slug: 'leba-lebork-chocielewko', date: '2025-05-10', river: 'Łeba', imageUrl: S + 'news/20250510_155108.jpg',
      lead: 'Dalszy odcinek Łeby: z przystani przy Przyzamczu w Lęborku do przystani w Chocielewku. 10 km, półtorej godziny, kilka progów w mieście i mistrzowska przystań na mecie.',
      body: 'Przystań w Lęborku jest całkiem w porządku, choć zrobiona do kończenia odcinka z Łęczyc. Na szczęście jest kładka przy zamku, z której można wystartować. Do przystani prowadzi wąska droga z zakazem wjazdu, który nie dotyczy firm kajakowych, ale wyższym składem niż 2,5 m nie przejedziecie pod mostem.\n\nŁeba zaskakuje w Lęborku kilkoma niedużymi progami i bystrzami pod mostami. Za miastem niestety sporo śmieci w rzece. Brzeg dość wysoki, możliwości wyjścia z kajaka są małe, dopiero po 8 km prawy brzeg się zniża i większa grupa może odpocząć. Meta po 10 km po lewej. Przystań w Chocielewku to mistrzostwo świata. Czapki z głów dla gminy Nowa Wieś Lęborska.' },
    { title: 'Odkrywanie rzeki Łeby', slug: 'odkrywanie-leby', date: '2025-05-05', river: 'Łeba', imageUrl: S + 'naglowki/6.jpg',
      lead: 'Kajakowa majówka 2025 na Łebie od Bożepola Wielkiego do Lęborka. Stanice dobrze wyposażone, odcinek opisany jako średniotrudny my zaliczyliśmy do trudnych.',
      body: 'Trzeba przyznać, że dbają tam o kajakarzy: stanice kajakowe są fajnie wyposażone. Mały minus za wysokie pomosty i brak slipu do wody. Pierwszy odcinek Bożepole Wielkie – Łęczyce to kraina bobra: kilkadziesiąt zwalonych suchych drzew w różnych konstelacjach, kilka razy jedynką nie dało się nic wykombinować i trzeba było targać kajak przez pokrzywy. Wysoki brzeg utrudnia takie zabiegi. Na koniec przenoska w Łęczycach: fajnie, że jest pomost, ale bardzo wysoko.' },
  ]
  for (const n of news) await payload.create({ collection: 'news', data: n })
  console.log('[seed] nowinki:', news.length)

  await payload.updateGlobal({ slug: 'settings', data: {
    banner: 'Sezon trwa. Na długie weekendy rezerwuj z wyprzedzeniem.',
    heroTitle: 'Spływy kajakowe Piławą, Rurzycą i Gwdą',
    heroText: 'Wypożyczalnia kajaków i organizator spływów w północnej Wielkopolsce. Baza w Szwecji koło Wałcza, kajaki Vista Perception, instruktor i ratownik na spływach grupowych. Nie jesteśmy nastawieni na ilość, znamy za to dziesiątki szlaków.',
    heroImageUrl: S + 'naglowki/17.jpg',
    about: 'Od lat obsługujemy spływy kajakowe na dopływach Gwdy: Piławie, Rurzycy, Dobrzycy i Czernicy oraz na samej Gwdzie. Większość spływów zaczyna się w Szwecji i Nadarzycach. Pływamy też na Brdzie, Drawie, Łupawie, Słupi, Obrze i Wdzie.',
    contactName: 'Sławek', phone: '668 260 240', email: 'kontakt@splywajcie.pl',
    baseName: 'Pole namiotowe „Nad Zatoczką” w Szwecji', baseAddress: 'ul. Nadrzeczna 4\n78-611 Szwecja', coords: '53.34381, 16.57134',
    baseNote: 'Nasza baza sprzętowa przy głównym moście na Piławie na drodze krajowej nr 22. Tu umawiamy klientów na przyjazd i stąd wywozimy na spływy. Na polu: płatny parking, wiata ogniskowa, boisko, sanitariaty z ciepłą wodą, kuchenki i lodówki, sklep kilkadziesiąt metrów dalej. Pole ma osobnych właścicieli i własną stronę nad-zatoczka.pl.',
    mapUrl: 'https://goo.gl/maps/B7kWaoneyNiCXVbSA',
    baseContacts: [{ name: 'Ela', phone: '881 209 264', role: 'Noclegi, posiłki, ogniska' }, { name: 'Edward', phone: '606 257 589', role: 'Przewozy kajaków po rezerwacji' }],
    bankAccount: 'Splywajcie.pl, PKO BP 02 1020 3844 0000 1302 0310 1334',
    terms: [
      'Potwierdzeniem rezerwacji jest zaliczka 30 % kosztów wynajmu, liczona od liczby dni i kajaków. Po jej wpłynięciu spływ ma status „potwierdzony – do realizacji”.',
      'Zamówioną liczbę kajaków można zmniejszyć bez kosztów do 14 dni przed spływem; na długie weekendy majowe i czerwcowe do 60 dni. Zwiększenie tylko, jeśli kajaki są jeszcze dostępne.',
      'Zwrot zaliczki: 100 % przy rezygnacji powyżej 30 dni przed spływem, 50 % od 29 do 21 dni, 30 % od 20 do 15 dni. Do 14 dni zaliczka przepada.',
      'Przy ostrzeżeniu meteorologicznym 1, 2 lub 3 stopnia w województwie, w którym odbywa się spływ, zaliczka nie przepada: przekładamy termin, a bez wolnego terminu zwracamy wpłatę.',
      'Zaliczka płatna przelewem, reszta z góry w gotówce. Faktury wysyłamy e-mailem.',
      'Osoby indywidualne ubezpieczają się od NNW we własnym zakresie. Wypożyczający odpowiada za sprzęt i wyrządzone szkody.',
    ].map((text) => ({ text })),
  } })
  console.log('[seed] gotowe')
  process.exit(0)
}
main().catch((e) => { console.error(e); process.exit(1) })
