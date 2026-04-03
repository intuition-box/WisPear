import { Hono } from "hono";

const feedback = new Hono();

// POST /feedback
feedback.post("/", async (c) => {
  // TODO
  return c.json({ ok: true });
});

// GET /feedback/:componentId
feedback.get("/:componentId", async (c) => {
  // TODO
  return c.json({ componentId: c.req.param("componentId"), signals: [] });
});

// GET /feedback/curator/:id
feedback.get("/curator/:id", async (c) => {
  // TODO
  return c.json({ curatorId: c.req.param("id"), signals: [] });
});

export { feedback };
