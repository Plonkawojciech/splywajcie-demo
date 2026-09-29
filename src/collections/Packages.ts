import type { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  labels: { singular: 'Pakiet', plural: 'Pakiety i cennik' },
  admin: { useAsTitle: 'name', group: 'Treści', defaultColumns: ['name', 'price', 'unit', 'minPersons', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Nazwa', type: 'text', required: true },
    { name: 'slug', label: 'Adres (slug)', type: 'text', required: true, unique: true },
    { name: 'lead', label: 'Zajawka', type: 'textarea', required: true },
    {
      type: 'row',
      fields: [
        { name: 'price', label: 'Cena (zł)', type: 'number', admin: { width: '25%' } },
        { name: 'unit', label: 'Jednostka', type: 'text', admin: { width: '25%', description: 'np. /kajak/dzień' } },
        { name: 'minPersons', label: 'Minimum osób', type: 'number', admin: { width: '25%' } },
        { name: 'priceNote', label: 'Dopisek', type: 'text', admin: { width: '25%' } },
      ],
    },
    { name: 'imageUrl', label: 'Zdjęcie (URL)', type: 'text' },
    { name: 'image', label: 'Zdjęcie (plik)', type: 'upload', relationTo: 'media' },
    { name: 'includes', label: 'W cenie', type: 'array', labels: { singular: 'Pozycja', plural: 'Pozycje' }, fields: [{ name: 'text', label: 'Treść', type: 'text', required: true }] },
    { name: 'body', label: 'Opis', type: 'textarea' },
    { name: 'order', label: 'Kolejność', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
