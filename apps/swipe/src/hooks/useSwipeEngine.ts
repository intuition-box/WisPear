
import { useReducer, useMemo, useEffect } from "react";
import type { Profile } from "@wispr/ontology";
import type { SwipeState, SwipeDirection } from "@/types/swipe";
import {
  loadTree,
  isTerminal,
  parseTerminal,
  getQuestion,
  getNextValue,
  countMaxQuestions,
} from "@/lib/decisionTree";

type Action = { type: "SWIPE"; direction: SwipeDirection } | { type: "RESET" };

const STORAGE_KEY = "wispr-swipe-state";

function createInitialState(): SwipeState {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  const tree = loadTree();
  return {
    phase: "role",
    currentQuestionId: tree.start,
    history: [],
    role: null,
    level: null,
    questionsAnswered: 0,
    totalQuestionsInPhase: countMaxQuestions(tree, tree.start),
  };
}

function reducer(state: SwipeState, action: Action): SwipeState {
  if (action.type === "RESET") {
    return createInitialState();
  }

  const tree = loadTree();
  const { direction } = action;
  const nextValue = getNextValue(tree, state.currentQuestionId, direction);

  if (!nextValue) return state;

  const newHistory = [
    ...state.history,
    { questionId: state.currentQuestionId, direction },
  ];

  // Terminal node — we got a result
  if (isTerminal(nextValue)) {
    const parsed = parseTerminal(nextValue);
    if (!parsed) return state;

    if (parsed.type === "role") {
      // Role determined, move to maturity phase
      return {
        ...state,
        phase: "maturity",
        currentQuestionId: tree.maturity_start,
        history: newHistory,
        role: parsed.value,
        questionsAnswered: 0,
        totalQuestionsInPhase: countMaxQuestions(tree, tree.maturity_start),
      };
    }

    if (parsed.type === "level") {
      // Level determined, move to result
      return {
        ...state,
        phase: "result",
        currentQuestionId: "",
        history: newHistory,
        level: parsed.value,
        questionsAnswered: state.questionsAnswered + 1,
      };
    }
  }

  // Non-terminal — advance to next question
  const nextQuestion = getQuestion(tree, nextValue);
  if (!nextQuestion) return state;

  return {
    ...state,
    currentQuestionId: nextValue,
    history: newHistory,
    questionsAnswered: state.questionsAnswered + 1,
  };
}

export function useSwipeEngine() {
  const [state, dispatch] = useReducer(reducer, undefined, createInitialState);
  const tree = useMemo(() => loadTree(), []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentQuestion =
    state.phase !== "result"
      ? getQuestion(tree, state.currentQuestionId)
      : null;

  const profile: Profile | null =
    state.role && state.level
      ? { role: state.role, level: state.level }
      : null;

  const progress =
    state.totalQuestionsInPhase > 0
      ? state.questionsAnswered / state.totalQuestionsInPhase
      : 0;

  return {
    state,
    currentQuestion,
    profile,
    progress,
    swipe: (direction: SwipeDirection) =>
      dispatch({ type: "SWIPE", direction }),
    reset: () => {
      sessionStorage.removeItem(STORAGE_KEY);
      dispatch({ type: "RESET" });
    },
  };
}
