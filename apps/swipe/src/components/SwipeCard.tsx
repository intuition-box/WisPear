"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import type { QuestionNode, SwipeDirection } from "@/types/swipe";

const SWIPE_THRESHOLD = 100;

interface SwipeCardProps {
  question: QuestionNode;
  onSwipe: (direction: SwipeDirection) => void;
  isFront: boolean;
}

export function SwipeCard({ question, onSwipe, isFront }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const likeOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const dislikeOpacity = useTransform(x, [-SWIPE_THRESHOLD, 0], [1, 0]);

  function handleDragEnd(
    _: unknown,
    info: { offset: { x: number } }
  ) {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe("like");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe("dislike");
    }
  }

  return (
    <motion.div
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, zIndex: isFront ? 2 : 1 }}
      initial={{ scale: isFront ? 1 : 0.95, y: isFront ? 0 : 8 }}
      animate={{ scale: isFront ? 1 : 0.95, y: isFront ? 0 : 8 }}
      exit={{
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        rotate: x.get() > 0 ? 15 : -15,
        transition: { duration: 0.3 },
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`absolute inset-0 bg-bg-card rounded-xl border border-border shadow-card flex items-center justify-center p-8 select-none touch-pan-y ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {isFront && (
        <motion.div className="absolute inset-0 pointer-events-none">
          <motion.span
            className="absolute top-5 right-4 text-base font-extrabold tracking-wide px-3.5 py-1.5 rounded-lg border-2 text-green border-green rotate-[15deg]"
            style={{ opacity: likeOpacity }}
          >
            YES
          </motion.span>
          <motion.span
            className="absolute top-5 left-4 text-base font-extrabold tracking-wide px-3.5 py-1.5 rounded-lg border-2 text-red border-red -rotate-[15deg]"
            style={{ opacity: dislikeOpacity }}
          >
            NO
          </motion.span>
        </motion.div>
      )}
      <p className="text-lg font-semibold leading-relaxed text-center text-text-primary">
        {question.text}
      </p>
    </motion.div>
  );
}
