// Proxies Cal.com's GET /v2/slots so CALCOM_API_KEY never reaches the client bundle.
// Query params accepted from the frontend: start, end, timeZone (all pass through).
const CALCOM_API = 'https://api.cal.com/v2';
const SLOTS_API_VERSION = '2024-09-04';

export const handler = async (event) => {
  const apiKey = process.env.CALCOM_API_KEY;
  const eventTypeId = process.env.CALCOM_EVENT_TYPE_ID;

  if (!apiKey || !eventTypeId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Booking is not configured yet. Missing CALCOM_API_KEY or CALCOM_EVENT_TYPE_ID.' }),
    };
  }

  const { start, end, timeZone } = event.queryStringParameters || {};
  if (!start || !end) {
    return { statusCode: 400, body: JSON.stringify({ error: 'start and end are required' }) };
  }

  const params = new URLSearchParams({
    eventTypeId,
    start,
    end,
    format: 'range',
  });
  if (timeZone) params.set('timeZone', timeZone);

  try {
    const res = await fetch(`${CALCOM_API}/slots?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'cal-api-version': SLOTS_API_VERSION,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      return { statusCode: res.status, body: JSON.stringify({ error: 'Cal.com slots request failed', detail: data }) };
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: 'Could not reach Cal.com', detail: String(err) }) };
  }
};
