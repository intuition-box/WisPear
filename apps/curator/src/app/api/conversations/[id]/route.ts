import { db, messages, curationSignals } from "@wispr/feedback-api";
import { eq } from "drizzle-orm";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const msgs = db
    .select()
    .from(messages)
    .where(eq(messages.conversationId, id))
    .orderBy(messages.createdAt)
    .all();

  const curations = db
    .select()
    .from(curationSignals)
    .where(eq(curationSignals.conversationId, id))
    .orderBy(curationSignals.createdAt)
    .all();

  return Response.json({ messages: msgs, curations });
}
