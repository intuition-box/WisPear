import type { Role, AILevel } from "@wispr/ontology";
import type { DecisionTree, QuestionNode } from "@/types/swipe";
import treeData from "@/data/questions.json";

const ROLE_MAP: Record<string, Role> = {
  fullstack_web3: "full-stack-web3",
  smart_contract: "smart-contract-dev",
  frontend_dev: "frontend-dev",
  backend_dev: "backend-dev",
  designer: "designer",
  product_manager: "product-manager",
  founder: "founder",
};

const LEVEL_MAP: Record<string, AILevel> = {
  beginner: "beginner",
  intermediate: "intermediate",
  advanced: "advanced",
  expert: "expert",
};

export function loadTree(): DecisionTree {
  return treeData as DecisionTree;
}

export function isTerminal(value: string): boolean {
  return value.startsWith("ROLE:") || value.startsWith("LEVEL:");
}

export function parseTerminal(
  value: string
): { type: "role"; value: Role } | { type: "level"; value: AILevel } | null {
  if (value.startsWith("ROLE:")) {
    const slug = value.slice(5);
    const role = ROLE_MAP[slug];
    if (role) return { type: "role", value: role };
  }
  if (value.startsWith("LEVEL:")) {
    const slug = value.slice(6);
    const level = LEVEL_MAP[slug];
    if (level) return { type: "level", value: level };
  }
  return null;
}

export function getQuestion(
  tree: DecisionTree,
  questionId: string
): QuestionNode | null {
  return tree.questions[questionId] ?? null;
}

export function getNextValue(
  tree: DecisionTree,
  questionId: string,
  direction: "like" | "dislike"
): string | null {
  const question = tree.questions[questionId];
  if (!question) return null;
  return question.next[direction];
}

/** Count max depth of a block in the tree (for progress bar) */
export function countMaxQuestions(
  tree: DecisionTree,
  startId: string
): number {
  let max = 0;

  function walk(id: string, depth: number) {
    const q = tree.questions[id];
    if (!q) {
      max = Math.max(max, depth);
      return;
    }
    walk(q.next.like, depth + 1);
    walk(q.next.dislike, depth + 1);
  }

  walk(startId, 0);
  return max;
}
