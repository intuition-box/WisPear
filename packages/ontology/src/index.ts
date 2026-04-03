// Wispr Ontology — shared schema + seed data
//
// Normalized registry schema for all component types.
// Seed data: 10-15 pre-seeded components to bootstrap the knowledge graph.

export type { Component, ComponentType } from "./types/component.js";
export type { Profile, Role, AILevel } from "./types/profile.js";
export type { Triple, TripleType } from "./types/triple.js";
export type { CuratorProfile } from "./types/curator.js";

export { SEED_COMPONENTS } from "./seed/components.js";
