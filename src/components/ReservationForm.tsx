'use client'
import { useActionState } from 'react'
import { createReservation, type FormState } from '@/lib/actions'

type River = { id: number; name: string }

export function ReservationForm({ rivers, selected }: { rivers: River[]; selected?: number }) {
  const [state, action, pending] = useActionState<FormState, FormData>(createReservation, { ok: false, message: '' })
  if (state.ok) return <div className="done"><strong>Dziękujemy.</strong> {state.message}</div>
  return (
    <form action={action} className="form">
      <label>Rzeka
        <select name="river" defaultValue={selected || ''}>
          <option value="">Jeszcze nie wiem, doradźcie</option>
          {rivers.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      </label>
      <div className="form-row">
        <label>Od<input name="dateFrom" type="date" /></label>
        <label>Do<input name="dateTo" type="date" /></label>
      </div>
      <div className="form-row">
        <label>Liczba kajaków<input name="kayaks" type="number" min={1} max={60} inputMode="numeric" /></label>
        <label>Liczba osób<input name="persons" type="number" min={1} max={120} inputMode="numeric" /></label>
      </div>
      <div className="form-row">
        <label>Imię i nazwisko<input name="name" required autoComplete="name" /></label>
        <label>Telefon<input name="phone" type="tel" required autoComplete="tel" /></label>
      </div>
      <label>E-mail<input name="email" type="email" autoComplete="email" /></label>
      <label>Wiadomość<textarea name="message" rows={3} placeholder="Skąd jedziecie, czy są dzieci, czy potrzebny nocleg w bazie" /></label>
      {state.message && !state.ok && <p className="form-err">{state.message}</p>}
      <button className="btn btn-accent" disabled={pending}>{pending ? 'Wysyłanie…' : 'Wyślij zgłoszenie'}</button>
      <p className="note">Zgłoszenie trafia do panelu. Rezerwację potwierdza zaliczka 30 % wpłacona po rozmowie telefonicznej.</p>
    </form>
  )
}
