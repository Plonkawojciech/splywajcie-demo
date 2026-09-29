import type { CollectionConfig } from 'payload'

export const Reservations: CollectionConfig = {
  slug: 'reservations',
  labels: { singular: 'Rezerwacja', plural: 'Rezerwacje' },
  admin: {
    useAsTitle: 'name',
    group: 'Spływy',
    defaultColumns: ['name', 'riverName', 'dateFrom', 'kayaks', 'persons', 'phone', 'status', 'createdAt'],
    description: 'Każde zgłoszenie ze strony. Status i zaliczkę ustawia Sławek po telefonie.',
  },
  access: { create: () => false, read: ({ req }) => !!req.user },
  fields: [
    { name: 'river', label: 'Rzeka', type: 'relationship', relationTo: 'rivers' },
    { name: 'riverName', label: 'Rzeka', type: 'text', virtual: 'river.name', admin: { hidden: true } },
    { name: 'name', label: 'Imię i nazwisko', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'phone', label: 'Telefon', type: 'text', required: true },
        { name: 'email', label: 'E-mail', type: 'email' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'dateFrom', label: 'Od', type: 'date', admin: { width: '25%', date: { displayFormat: 'd MMM yyyy' } } },
        { name: 'dateTo', label: 'Do', type: 'date', admin: { width: '25%', date: { displayFormat: 'd MMM yyyy' } } },
        { name: 'kayaks', label: 'Liczba kajaków', type: 'number', admin: { width: '25%' } },
        { name: 'persons', label: 'Liczba osób', type: 'number', admin: { width: '25%' } },
      ],
    },
    { name: 'message', label: 'Wiadomość', type: 'textarea' },
    {
      name: 'status', label: 'Status', type: 'select', defaultValue: 'new', admin: { position: 'sidebar' },
      options: [
        { label: 'Nowa', value: 'new' }, { label: 'Oddzwoniono', value: 'contacted' }, { label: 'Czeka na zaliczkę', value: 'deposit' },
        { label: 'Potwierdzona', value: 'confirmed' }, { label: 'Anulowana', value: 'cancelled' },
      ],
    },
  ],
}
