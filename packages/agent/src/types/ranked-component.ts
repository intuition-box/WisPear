import type { Component } from "@wispr/ontology";

export interface RankedComponent {
  component: Component;
  trustScore: number;
  curatorCount: number;
  reasoning: string;
}
