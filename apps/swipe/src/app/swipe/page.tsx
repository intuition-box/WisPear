"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSwipeEngine } from "@/hooks/useSwipeEngine";
import { getQuestion, loadTree } from "@/lib/decisionTree";
import { CardDeck } from "@/components/CardDeck";
import { SwipeButtons } from "@/components/SwipeButtons";
import { ProgressBar } from "@/components/ProgressBar";
import { PhaseLabel } from "@/components/PhaseLabel";
import { ProfileCard } from "@/components/ProfileCard";

export default function SwipePage() {
  const { state, currentQuestion, profile, progress, swipe, reset } =
    useSwipeEngine();

  const tree = useMemo(() => loadTree(), []);

  // Compute next question for the peek card
  const nextQuestionLike = currentQuestion
    ? getQuestion(tree, currentQuestion.next.like)
    : null;
  const nextQuestionDislike = currentQuestion
    ? getQuestion(tree, currentQuestion.next.dislike)
    : null;
  // Show the "like" next question as peek (arbitrary choice, just for visual)
  const peekQuestion = nextQuestionLike ?? nextQuestionDislike;

  // Swipe phase — show card deck
  if (state.phase !== "result" && currentQuestion) {
    return (
      <div className="flex flex-col min-h-screen bg-bg-app">
        <div className="flex flex-col items-center gap-4 px-6 pt-12 pb-6">
          <PhaseLabel phase={state.phase} />
          <ProgressBar progress={progress} />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <CardDeck
            currentQuestion={currentQuestion}
            nextQuestion={peekQuestion}
            onSwipe={swipe}
          />
          <SwipeButtons onSwipe={swipe} />
        </div>
      </div>
    );
  }

  // Result phase — show profile
  if (profile) {
    return (
      <div className="flex flex-col min-h-screen bg-bg-app">
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-6"
            >
              <h1 className="text-2xl font-extrabold text-text-primary text-center">
                Bravo!
              </h1>
              <ProfileCard profile={profile} />
              <p className="text-sm text-text-secondary text-center max-w-[300px]">
                You are a{" "}
                <strong className="text-text-primary">
                  {profile.role.replace(/-/g, " ")}
                </strong>{" "}
                with an{" "}
                <strong className="text-text-primary">{profile.level}</strong>{" "}
                level in AI.
              </p>

              {/* Wallet + Publish will be added in Phase 5 */}
              <button
                onClick={() => {
                  // Phase 5: trigger wallet connect + publish
                }}
                className="bg-accent text-text-white font-semibold text-sm px-6 py-3 rounded-xl border-none shadow-card hover:shadow-md transition-shadow"
              >
                Publish on-chain
              </button>

              <button
                onClick={reset}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors bg-transparent border-none"
              >
                Start over
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return null;
}
