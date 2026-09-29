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
  if (name.length > 120 || phone.length > 40 || email.length > 160 || message.length > 3000) return { ok: false, message: 'Któreś pole jest za długie.' }
  if (!(/^\+?[\d\s()-]{7,20}$/.test(phone) && phone.replace(/\D/g, '').length >= 7)) return { ok: false, message: 'Sprawdź numer telefonu.' }
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, message: 'Sprawdź adres e-mail.' }
  if ((kayaks && (kayaks < 1 || kayaks > 60)) || (persons && (persons < 1 || persons > 120))) return { ok: false, message: 'Sprawdź liczbę kajaków i osób.' }
  if (dateFrom && dateTo && dateTo < dateFrom) return { ok: false, message: 'Data „do” jest wcześniejsza niż „od”.' }
  const payload = await db()
  try {
    await payload.create({ collection: 'reservations', data: { name, phone, email: email || undefined, river, dateFrom, dateTo, kayaks, persons, message } })
  } catch {
    return { ok: false, message: 'Nie udało się zapisać zgłoszenia. Zadzwoń: 668 260 240.' }
  }
  return { ok: true, message: 'Zgłoszenie dotarło. Sławek oddzwoni, potwierdzi termin i poda kwotę zaliczki.' }
}
