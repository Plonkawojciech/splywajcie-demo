import type { CollectionConfig } from 'payload'

export const Equipment: CollectionConfig = {
  slug: 'equipment',
  labels: { singular: 'Sprzęt', plural: 'Sprzęt' },
  admin: { useAsTitle: 'name', group: 'Treści', defaultColumns: ['name', 'maker', 'order'] },
  access: { read: () => true },
  fields: [
    { name: 'name', label: 'Nazwa', type: 'text', required: true },
    { name: 'maker', label: 'Producent', type: 'text' },
    { name: 'body', label: 'Opis', type: 'textarea', required: true },
    { name: 'specs', label: 'Parametry', type: 'array', labels: { singular: 'Parametr', plural: 'Parametry' }, fields: [{ type: 'row', fields: [
      { name: 'key', label: 'Parametr', type: 'text', required: true },
      { name: 'value', label: 'Wartość', type: 'text', required: true },
    ] }] },
    { name: 'imageUrl', label: 'Zdjęcie (URL)', type: 'text' },
    { name: 'image', label: 'Zdjęcie (plik)', type: 'upload', relationTo: 'media' },
    { name: 'order', label: 'Kolejność', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
