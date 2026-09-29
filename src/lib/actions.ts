'use server'
import { db } from './data'

export type FormState = { ok: boolean; message: string }

export async function createReservation(_prev: FormState, form: FormData): Promise<FormState> {
  const name = String(form.get('name') || '').trim()
  const phone = String(form.get('phone') || '').trim()
  const email = String(form.get('email') || '').trim()
  const river = Number(form.get('river')) || undefined
  const dateFrom = String(form.get('dateFrom') || '') || undefined
  const dateTo = String(form.get('dateTo') || '') || undefined
  const kayaks = Number(form.get('kayaks')) || undefined
  const persons = Number(form.get('persons')) || undefined
  const message = String(form.get('message') || '').trim()
  if (!name || !phone) return { ok: false, message: 'Podaj imię i nazwisko oraz numer telefonu.' }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, message: 'Sprawdź adres e-mail.' }
  const payload = await db()
  await payload.create({ collection: 'reservations', data: { name, phone, email: email || undefined, river, dateFrom, dateTo, kayaks, persons, message } })
  return { ok: true, message: 'Zgłoszenie dotarło. Sławek oddzwoni, potwierdzi termin i poda kwotę zaliczki.' }
}
