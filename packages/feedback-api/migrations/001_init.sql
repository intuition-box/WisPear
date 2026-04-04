-- Feedback API — Schema v1
-- Closes the loop: intent → recommendation → real usage → feedback → better curation

-- ─── sessions ───────────────────────────────────────────────────────────────
-- User identity: anonymous or wallet-linked.
-- Profile comes from the Swipe onboarding (role + AI maturity level).
CREATE TABLE IF NOT EXISTS sessions (
  id             TEXT    PRIMARY KEY,  -- UUID v4, generated client-side
  wallet_address TEXT,                 -- optional, if wallet connected
  profile_role   TEXT,                 -- full-stack-web3 | smart-contract-dev | designer |
                                       -- product-manager | founder | backend-dev | frontend-dev
  profile_level  TEXT,                 -- beginner | intermediate | advanced | expert
  created_at     INTEGER NOT NULL DEFAULT (unixepoch())
);

-- ─── conversations ───────────────────────────────────────────────────────────
-- One conversation = one visit to /chat.
-- A session can have many conversations across visits.
CREATE TABLE IF NOT EXISTS conversations (
  id         TEXT    PRIMARY KEY,  -- UUID v4, generated client-side at chat start
  session_id TEXT    NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  ended_at   INTEGER                -- NULL while active
);

CREATE INDEX IF NOT EXISTS idx_conversations_session_id
  ON conversations(session_id);

-- ─── messages ────────────────────────────────────────────────────────────────
-- Individual exchanges within a conversation.
CREATE TABLE IF NOT EXISTS messages (
  id              TEXT    PRIMARY KEY,  -- UUID v4
  conversation_id TEXT    NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role            TEXT    NOT NULL,     -- user | assistant
  content         TEXT    NOT NULL,
  model           TEXT,                 -- model used (assistant messages only)
  tokens_input    INTEGER,              -- prompt tokens
  tokens_output   INTEGER,              -- completion tokens
  latency_ms      INTEGER,              -- response time (assistant messages only)
  created_at      INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id
  ON messages(conversation_id);

-- ─── blueprints ─────────────────────────────────────────────────────────────
-- A generated recommendation set produced during a conversation.
CREATE TABLE IF NOT EXISTS blueprints (
  id              TEXT    PRIMARY KEY,  -- UUID v4
  conversation_id TEXT    NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  intent          TEXT    NOT NULL,     -- raw user query that triggered the blueprint
  created_at      INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_blueprints_conversation_id
  ON blueprints(conversation_id);

-- ─── blueprint_components ───────────────────────────────────────────────────
-- Each component recommended inside a blueprint.
-- trust_score_at_time is a snapshot so we can track drift over time.
CREATE TABLE IF NOT EXISTS blueprint_components (
  id                  TEXT    PRIMARY KEY,  -- UUID v4
  blueprint_id        TEXT    NOT NULL REFERENCES blueprints(id) ON DELETE CASCADE,
  component_id        TEXT    NOT NULL,     -- Intuition atom ID or slug
  component_type      TEXT    NOT NULL,     -- agent | skill | mcp | api | package | llm
  component_name      TEXT    NOT NULL,
  trust_score_at_time REAL,                 -- snapshot at recommendation time
  position            INTEGER,              -- order in blueprint (0-based)
  adopted             INTEGER NOT NULL DEFAULT 0  -- 0 = ignored, 1 = adopted by user
);

CREATE INDEX IF NOT EXISTS idx_blueprint_components_component_id
  ON blueprint_components(component_id);

-- ─── feedback_signals ───────────────────────────────────────────────────────
-- Explicit feedback submitted by the user or Wispear Skill.
CREATE TABLE IF NOT EXISTS feedback_signals (
  id           TEXT    PRIMARY KEY,  -- UUID v4
  conversation_id TEXT  NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  component_id TEXT    NOT NULL,     -- Intuition atom ID or slug
  blueprint_id TEXT    REFERENCES blueprints(id) ON DELETE SET NULL,
  signal_type  TEXT    NOT NULL,     -- adopted | rejected | thumbs_up | thumbs_down | error
  rating       INTEGER,              -- 1–5, optional explicit score
  comment      TEXT,                 -- optional free-text
  context      TEXT,                 -- JSON: { stack, project_type, error_message, … }
  created_at   INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_feedback_signals_component_id
  ON feedback_signals(component_id);
CREATE INDEX IF NOT EXISTS idx_feedback_signals_signal_type
  ON feedback_signals(signal_type);

-- ─── usage_events ───────────────────────────────────────────────────────────
-- Passive signals emitted by the Wispear Skill during real usage.
CREATE TABLE IF NOT EXISTS usage_events (
  id              TEXT    PRIMARY KEY,  -- UUID v4
  conversation_id TEXT    REFERENCES conversations(id) ON DELETE SET NULL,
  component_id    TEXT    NOT NULL,     -- Intuition atom ID or slug
  event_type      TEXT    NOT NULL,     -- installed | invoked | success | error | uninstalled
  metadata        TEXT,                 -- JSON: latency_ms, error_code, model_used, …
  created_at      INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_usage_events_component_id
  ON usage_events(component_id);
CREATE INDEX IF NOT EXISTS idx_usage_events_event_type
  ON usage_events(event_type);
