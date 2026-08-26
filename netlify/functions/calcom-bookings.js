// Proxies Cal.com's POST /v2/bookings so CALCOM_API_KEY never reaches the client bundle.
const CALCOM_API = 'https://api.cal.com/v2';
const BOOKINGS_API_VERSION = '2026-02-25';

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.CALCOM_API_KEY;
  const eventTypeId = process.env.CALCOM_EVENT_TYPE_ID;
  if (!apiKey || !eventTypeId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Booking is not configured yet. Missing CALCOM_API_KEY or CALCOM_EVENT_TYPE_ID.' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { start, name, organisation, email, notes, timeZone } = payload;
  if (!start || !name?.trim() || !isValidEmail(email) || !timeZone) {
    return { statusCode: 400, body: JSON.stringify({ error: 'start, name, a valid email, and timeZone are required' }) };
  }

  const body = {
    start,
    eventTypeId: Number(eventTypeId),
    attendee: {
      name: name.trim().slice(0, 200),
      email: email.trim().slice(0, 254),
      timeZone,
    },
    bookingFieldsResponses: {
      // The event type's "title" booking field is required — generate it
      // server-side rather than asking the visitor for a meeting title.
      title: `Scoping Session — ${name.trim().slice(0, 150)}${organisation?.trim() ? ` (${organisation.trim().slice(0, 100)})` : ''}`,
      notes: [
        organisation?.trim() ? `Organisation: ${organisation.trim().slice(0, 200)}` : null,
        notes?.trim() ? notes.trim().slice(0, 1000) : null,
      ].filter(Boolean).join('\n\n'),
    },
    metadata: {
      source: 'website_booking_card',
      organisation: organisation?.trim().slice(0, 200) || '',
    },
  };

  try {
    const res = await fetch(`${CALCOM_API}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'cal-api-version': BOOKINGS_API_VERSION,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: 'Cal.com booking failed', detail: data }) };
    }
    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Could not reach Cal.com', detail: String(err) }) };
  }
};
