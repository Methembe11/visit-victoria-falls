const baseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function config() {
  if (!baseUrl || !serviceKey) throw new Error("Supabase server credentials are not configured.");
  return { baseUrl, serviceKey };
}

export async function insertRow(table, row) {
  const { baseUrl, serviceKey } = config();
  const response = await fetch(`${baseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Supabase insert into ${table} failed: ${response.status} ${(await response.text()).slice(0, 300)}`);
}

export async function selectRows(table, query = "select=*") {
  const { baseUrl, serviceKey } = config();
  const response = await fetch(`${baseUrl}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Supabase read from ${table} failed: ${response.status}`);
  return response.json();
}
