# splywajcie-demo

Demo nowej strony dla Splywajcie.pl (wypożyczalnia kajaków i organizator spływów, baza w Szwecji koło Wałcza;
Sławek, 668 260 240). Klient chciał stronę „typu zakoleregi.pl”. Next.js 16 + Payload CMS 3 (SQLite): front i panel `/admin`.

- Dev: `pnpm dev` (port 3014). Seed: `pnpm seed` (pomija, gdy dane już są; `--force` dokłada).
- **Zakres celowo mały — to demo, nie migracja.** Strona główna (hero, pakiety, rzeki, baza, sprzęt, nowinki,
  rezerwacja), rzeki z odcinkami, cennik i warunki, sprzęt, nowinki, rezerwacja, baza i dojazd.
- Kolekcje: `src/collections/*` (Rzeki, Pakiety, Sprzęt, Nowinki, Rezerwacje, Media, Użytkownicy) + global
  `Ustawienia strony` (kontakt, baza, konto do zaliczek, warunki wynajmu).
- Ceny z obecnej strony: 120 zł/kajak/dzień, spływ grupowy 300 zł/os./dzień od 20 osób. Opisy rzek to treść
  autorska klienta, w demie skrócona i częściowo uzupełniona o odcinki z jego listy „Nasza znajomość rzek”.
- Zdjęcia: hero i pakiety to zdjęcia wygenerowane (GPT Image, `public/img/gen/`, podmienić na zdjęcia klienta przy wdrożeniu);
  rzeki i nowinki to hotlink z splywajcie.pl (`imageUrl`). Pole `image` (upload) ma pierwszeństwo. Logo: `public/img/logo.png`
  (oryginał klienta z wyciętym szarym tłem; źródło `logo-original.png`).
- Design: `docs/plan-demo.md`. System w `src/app/(site)/globals.css` (Raleway w nagłówkach, Open Sans w tekście, granat #2B2E83,
  pomarańcz). Od 30.09 bliżej zakoleregi.pl: biały nagłówek z falką pod aktywną pozycją, hero z drona z napisem na środku.
- Zmiana schematu: `pnpm exec payload migrate:create <nazwa>`, commit `src/migrations/`. `push: false`.
- Deploy: Coolify (projekt `splywajcie-demo`, Dockerfile), domena `splywajcie.programo.pl`, wolumen `/data`.
- Panel demo: `demo@splywajcie.pl` / `splywajcie2026`.
