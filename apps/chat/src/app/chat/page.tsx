"use client";

import { useState, useRef } from "react";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function submit() {
    if (!input.trim() || loading) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        setResponse("Error: " + res.statusText);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setResponse((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setResponse("Error: " + (err as Error).message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>Wispr</h1>
      <p style={styles.subtitle}>Describe your need. Get a blueprint.</p>

      <div style={styles.inputRow}>
        <textarea
          style={styles.textarea}
          placeholder="I want to build a Next.js app with Google auth and an admin dashboard..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
          }}
          rows={3}
          disabled={loading}
        />
        <button style={styles.button} onClick={submit} disabled={loading}>
          {loading ? "..." : "→"}
        </button>
      </div>

      {response && (
        <div style={styles.response}>
          <pre style={styles.pre}>{response}</pre>
        </div>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 720,
    margin: "80px auto",
    padding: "0 24px",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    color: "#666",
    marginTop: 8,
    marginBottom: 32,
  },
  inputRow: {
    display: "flex",
    gap: 12,
    alignItems: "flex-end",
  },
  textarea: {
    flex: 1,
    padding: "12px 16px",
    fontSize: 16,
    border: "1px solid #ddd",
    borderRadius: 8,
    resize: "vertical",
    fontFamily: "inherit",
  },
  button: {
    padding: "12px 20px",
    fontSize: 20,
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  response: {
    marginTop: 32,
    padding: "20px 24px",
    background: "#f9f9f9",
    borderRadius: 8,
    border: "1px solid #eee",
  },
  pre: {
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontFamily: "inherit",
    fontSize: 15,
    lineHeight: 1.6,
  },
};
