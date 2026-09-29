import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: { singular: 'Nowinka', plural: 'Nowinki' },
  admin: { useAsTitle: 'title', group: 'Treści', defaultColumns: ['title', 'date', 'river'] },
  access: { read: () => true },
  fields: [
    { name: 'title', label: 'Tytuł', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'slug', label: 'Adres (slug)', type: 'text', required: true, unique: true, admin: { width: '50%' } },
        { name: 'date', label: 'Data', type: 'date', required: true, admin: { width: '25%', date: { displayFormat: 'd MMM yyyy' } } },
        { name: 'river', label: 'Rzeka', type: 'text', admin: { width: '25%' } },
      ],
    },
    { name: 'lead', label: 'Zajawka', type: 'textarea', required: true },
    { name: 'body', label: 'Treść', type: 'textarea', required: true },
    { name: 'imageUrl', label: 'Zdjęcie (URL)', type: 'text' },
    { name: 'image', label: 'Zdjęcie (plik)', type: 'upload', relationTo: 'media' },
  ],
}
