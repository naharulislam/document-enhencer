const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function enhanceImage(file, settings) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("settings", JSON.stringify(settings));

  const res = await fetch(`${API_URL}/api/enhance`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    let message = "Enhancement failed";
    try {
      const err = await res.json();
      message = err.detail || message;
    } catch {}
    throw new Error(message);
  }

  return res.json();
}