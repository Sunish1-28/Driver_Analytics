export async function getAISummary(messages) {
  try {
    const response = await fetch("https://<your-cloud-function-url>", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();
    return data.summary || "No summary returned.";
  } catch (err) {
    console.error("AI summary error", err);
    return "Could not generate summary.";
  }
}
