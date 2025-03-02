
export async function generateChatResponse(message: string, noteContent: string) {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message, noteContent, type: "chat" })
    });
  
    const data = await res.json();
    return data.result;
  }
  
  export async function generateSummary(noteContent: string) {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ noteContent, type: "summary" })
    });
  
    const data = await res.json();
    return data.result;
  }
  