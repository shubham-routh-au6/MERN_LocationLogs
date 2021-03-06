const API_URL = "https://immense-wave-49808.herokuapp.com/";

export default async function listLogEntries() {
  const response = await fetch(`${API_URL}`, {
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return response.json();
}
export async function createLogEntry(entry) {
  // const apiKey = entry.apiKey;
  // delete entry.apiKey;
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      // "X-API-KEY": apiKey,
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(entry),
  });
  let json;
  if (response.headers.get("content-type").includes("text/html")) {
    const message = await response.text();
    json = {
      message,
    };
  } else {
    json = await response.json();
  }
  if (response.ok) {
    return json;
  }
  const error = new Error(json.message);
  error.response = json;
  throw error;
}
