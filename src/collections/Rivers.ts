import type { CollectionConfig } from 'payload'

export const Rivers: CollectionConfig = {
  slug: 'rivers',
  labels: { singular: 'Rzeka', plural: 'Rzeki' },
  admin: { useAsTitle: 'name', group: 'Treści', defaultColumns: ['name', 'region', 'difficulty', 'featured', 'order'], description: 'Opisy rzek to treść autorska Splywajcie.pl. W demie skrócone.' },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Nazwa', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'slug', label: 'Adres (slug)', type: 'text', required: true, unique: true, admin: { width: '40%' } },
        { name: 'region', label: 'Region', type: 'text', admin: { width: '30%', description: 'np. dopływ Gwdy' } },
        { name: 'difficulty', label: 'Trudność', type: 'select', options: [
          { label: 'Łatwa', value: 'easy' }, { label: 'Średnia', value: 'medium' }, { label: 'Trudna', value: 'hard' },
        ], admin: { width: '30%' } },
      ],
    },
    { name: 'lead', label: 'Zajawka (1–2 zdania)', type: 'textarea', required: true },
    { name: 'imageUrl', label: 'Zdjęcie (URL)', type: 'text' },
    { name: 'image', label: 'Zdjęcie (plik)', type: 'upload', relationTo: 'media' },
    {
      name: 'sections',
      label: 'Odcinki',
      type: 'array',
      labels: { singular: 'Odcinek', plural: 'Odcinki' },
      fields: [
        { type: 'row', fields: [
          { name: 'title', label: 'Odcinek', type: 'text', required: true, admin: { width: '50%', description: 'np. Szwecja – Nadarzyce' } },
          { name: 'km', label: 'Długość (km)', type: 'number', admin: { width: '25%' } },
          { name: 'hours', label: 'Czas (h)', type: 'text', admin: { width: '25%' } },
        ] },
        { name: 'body', label: 'Opis', type: 'textarea' },
      ],
    },
    { name: 'featured', label: 'Pokaż na stronie głównej', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'order', label: 'Kolejność', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
