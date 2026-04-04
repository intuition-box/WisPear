import Anthropic from "@anthropic-ai/sdk";
import {
  extract,
  query,
  getIntuitionClient,
  closeIntuitionClient,
  type RankedComponent,
} from "@wispr/agent";

const anthropic = new Anthropic();

export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return Response.json({ error: "message required" }, { status: 400 });
  }

  let claims, components;
  try {
    const client = await getIntuitionClient();
    claims = await extract(client, message);
    console.log("[wispr] claims:", JSON.stringify(claims));

    components = await query(client, claims);
    console.log("[wispr] components:", components.length);
  } catch (err) {
    // Invalidate the client so next request gets a fresh one
    await closeIntuitionClient();
    console.error("[wispr] pipeline failed:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }

  const intuitionContext = buildContext(components);

  const stream = anthropic.messages.stream({
    model: "claude-opus-4-6",
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `<intuition_context>\n${intuitionContext}\n</intuition_context>\n\n${message}`,
      },
    ],
  });

  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      }
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "X-Accel-Buffering": "no",
    },
  });
}

function buildContext(components: RankedComponent[]): string {
  if (components.length === 0) {
    return "No components found in the Intuition knowledge graph for this query.";
  }

  return components
    .slice(0, 10)
    .map(
      (r, i) =>
        `${i + 1}. [${r.component.type.toUpperCase()}] ${r.component.name} (trust: ${r.trustScore})\n   ${r.reasoning}`
    )
    .join("\n");
}

const SYSTEM_PROMPT = `You are Wispr, a trust-scored discovery engine for AI agent components.

You receive pre-resolved context from the Intuition knowledge graph: a ranked list of components validated by real practitioners who have staked $TRUST on them.

Your role:
- Recommend a coherent stack based on the user's intent and the Intuition context provided
- Explain which components to use, in what order, and why
- Be concrete: mention specific tool names, how they connect, and any important caveats
- Trust scores are derived from Total Value Locked (TVL) on Intuition — higher means more practitioners vouch for it

Keep your response clear and actionable. If the Intuition context is sparse, say so and give your best recommendation based on general knowledge.`;
