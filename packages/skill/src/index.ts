// Wispr Skill / MCP Server
//
// Equivalent of find-skill (skills.sh / Vercel Labs) but powered by
// Wispr's knowledge graph.
//
// Allows an LLM to dynamically load the right skills and resources
// based on context — no manual configuration needed.
//
// Exposed as:
//   - An installable MCP server (stdio transport)
//   - A skills.sh-compatible skill
//
// MCP tools exposed:
//   - wispr_find_components(intent, profile?) → Blueprint
//   - wispr_get_component(id) → Component + trust details
//   - wispr_submit_feedback(componentId, signal) → void

export * from "./mcp-server.js";
