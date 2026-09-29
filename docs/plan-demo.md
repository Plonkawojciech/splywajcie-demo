# Demo Splywajcie.pl — plan (2026-09-29)

Klient: Splywajcie.pl, Sławek, tel. 668 260 240. Wypożyczalnia kajaków i organizator spływów na dopływach Gwdy
(Piława, Rurzyca, Dobrzyca, Czernica) oraz na Gwdzie; baza sprzętowa: pole namiotowe „Nad Zatoczką”,
ul. Nadrzeczna 4, 78-611 Szwecja (przy moście DK 22). Obecna strona: Joomla 1.5, licznik odwiedzin, nie działa na telefonie.
Notatki z rozmów (17.09): chce demo, decyzja i faktury dopiero około marca; „stronę chce typu zakoleregi.pl”.

## Co znaczy „typu zakoleregi.pl”
Duże zdjęcie na całą szerokość w hero, białe, spokojne sekcje, krótkie karty oferty, mapa i dojazd, cennik w tabeli,
telefon zawsze widoczny. Bez bloków tekstu z Joomli. Demo przenosi tę strukturę, ale w kolorach Splywajcie
(granat z logo, niebieskie kajaki Vista) i z prawdziwą treścią klienta.

## Co pokazuje demo
- Strona główna: hero ze zdjęciem klienta, trzy pakiety (wypożyczalnia 120 zł/dzień, spływ grupowy „na piątkę”
  300 zł/os., spływy wielodniowe i inne rzeki), rzeki, baza „Nad Zatoczką”, sprzęt, nowinki, rezerwacja.
- Rzeki z CMS: Piława, Rurzyca, Dobrzyca, Czernica, Gwda — każda z opisem i trudnością (treść autorska klienta,
  w demie skrócona).
- Cennik i warunki wynajmu (zaliczka 30 %, terminy zwrotów) z obecnej strony.
- Nowinki (blog z rzek) — dwa ostatnie wpisy klienta.
- Rezerwacja online → panel (kolekcja Rezerwacje) z rzeką, terminem, liczbą kajaków.

## Decyzje projektowe
- Paleta: granat z logo #2B2E83, atrament #171A2E, mgła #F1F4F8 (tło sekcji), biel, akcent pomarańcz kamizelki #F2851D,
  szary #5F6577. Zero zieleni Zakola Regi — to ma być strona Splywajcie.
- Jeden krój: Plus Jakarta Sans (przyjazny, czytelny), nagłówki ciężkie, tekst 17 px.
- Zdjęcia: wyłącznie z splywajcie.pl (nagłówki 900×218, galerie), hotlink, sprawdzone curl 200.
- Element wyróżniający: pasek „Rzeka · odcinek · km · godziny” pod hero — jak tablica na przystani.
- Zero emoji, zero zmyślonych liczb. Ceny: 120 zł/dzień (kajak), 300 zł/os./dzień (grupa od 20 osób).

## Zakres techniczny
Next.js 16 + Payload 3 (SQLite). Kolekcje: Rzeki, Pakiety, Sprzęt, Nowinki, Rezerwacje, Media, Użytkownicy;
global Ustawienia. Strony: /, /rzeki, /rzeki/[slug], /cennik, /sprzet, /nowinki, /nowinki/[slug], /rezerwacja,
/kontakt. Panel: /admin (demo@splywajcie.pl / splywajcie2026).
