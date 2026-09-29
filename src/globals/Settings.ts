import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Ustawienia strony',
  admin: { group: 'Treści' },
  access: { read: () => true },
  fields: [
    { name: 'banner', label: 'Pasek na górze strony', type: 'text' },
    { name: 'heroTitle', label: 'Nagłówek strony głównej', type: 'text' },
    { name: 'heroText', label: 'Tekst pod nagłówkiem', type: 'textarea' },
    { name: 'heroImageUrl', label: 'Zdjęcie w tle (URL)', type: 'text' },
    { name: 'heroImage', label: 'Zdjęcie w tle (plik)', type: 'upload', relationTo: 'media' },
    { name: 'about', label: 'O firmie (2–3 zdania)', type: 'textarea' },
    { type: 'row', fields: [
      { name: 'contactName', label: 'Osoba do rezerwacji', type: 'text' },
      { name: 'phone', label: 'Telefon', type: 'text' },
      { name: 'email', label: 'E-mail', type: 'email' },
    ] },
    { name: 'baseName', label: 'Nazwa bazy', type: 'text' },
    { name: 'baseAddress', label: 'Adres bazy', type: 'textarea' },
    { name: 'baseNote', label: 'Jak trafić', type: 'textarea' },
    { name: 'coords', label: 'Współrzędne', type: 'text' },
    { name: 'mapUrl', label: 'Link do mapy', type: 'text' },
    {
      name: 'baseContacts', label: 'Kontakty w bazie', type: 'array', labels: { singular: 'Osoba', plural: 'Osoby' },
      fields: [{ type: 'row', fields: [
        { name: 'name', label: 'Imię', type: 'text', required: true },
        { name: 'phone', label: 'Telefon', type: 'text', required: true },
        { name: 'role', label: 'W jakiej sprawie', type: 'text' },
      ] }],
    },
    { name: 'bankAccount', label: 'Konto do zaliczek', type: 'text' },
    { name: 'terms', label: 'Warunki wynajmu (punkty)', type: 'array', labels: { singular: 'Punkt', plural: 'Punkty' }, fields: [{ name: 'text', label: 'Treść', type: 'textarea', required: true }] },
    { name: 'facebook', label: 'Facebook (URL)', type: 'text' },
  ],
}
