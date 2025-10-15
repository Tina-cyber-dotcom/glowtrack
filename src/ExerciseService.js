// src/services/ExerciseService.js
const WGER_BASE = "https://wger.de/api/v2";

function extractEnglishText(arr) {
  if (!Array.isArray(arr)) return "";
  const found = arr.find((x) => x.language === 2 || x.language === "2");
  if (!found) {
    // fallback: first available
    return arr[0]?.text || "";
  }
  return found.text || "";
}

export async function fetchExercisePage(page = 1, limit = 20, signal) {
  const url = `${WGER_BASE}/exerciseinfo/?language=2&page=${page}&limit=${limit}`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`WGER fetch failed: ${res.status}`);
  const data = await res.json();
  // normalize results
  const items = (data.results || []).map((ex) => {
    const name = extractEnglishText(ex.name);
    const description = extractEnglishText(ex.description);
    const image = ex.images?.[0]?.image || null;
    return {
      id: ex.id,
      name: name || "Unnamed Exercise",
      description: description || "",
      image,
      raw: ex,
    };
  }).filter((it) => it.name && it.name.trim().length > 0);
  return { items, next: data.next, count: data.count };
}
