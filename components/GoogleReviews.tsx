"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { GoogleReview } from "@/lib/google-reviews";

// Visor de reseñas reales de Google: pasa automáticamente y permite navegar.
export default function GoogleReviews({
  reviews,
  mapsUrl,
}: {
  reviews: GoogleReview[];
  mapsUrl: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || reviews.length <= 1) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % reviews.length), 6000);
    return () => clearTimeout(t);
  }, [index, paused, reviews.length]);

  if (reviews.length === 0) return null;

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + reviews.length) % reviews.length);
  const review = reviews[index];

  return (
    <div
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[260px] sm:min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.figure
            key={review.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
          >
            <div className="flex items-center gap-4">
              {review.photo ? (
                <Image
                  src={review.photo}
                  alt={review.author}
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10 font-heading font-bold text-white">
                  {review.author.charAt(0)}
                </span>
              )}
              <div className="min-w-0">
                <p className="font-heading font-bold text-white truncate">
                  {review.author}
                </p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < review.rating ? "currentColor" : "none"}
                        className={i < review.rating ? "" : "text-white/25"}
                      />
                    ))}
                  </span>
                  {review.relativeTime && (
                    <span className="text-xs text-white/50">
                      {review.relativeTime}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <blockquote className="mt-5 text-white/85 leading-relaxed">
              {review.text}
            </blockquote>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Controles */}
      {reviews.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Reseña anterior"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {reviews.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ver reseña ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-gold" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Reseña siguiente"
            className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      <p className="mt-5 text-center text-xs text-white/45">
        Reseñas publicadas por clientes en{" "}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-white/70"
        >
          Google
        </a>
        .
      </p>
    </div>
  );
}
