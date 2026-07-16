"use client";

import { motion } from "framer-motion";

// Silueta de auto que cruza la sección de un lado al otro (ida y vuelta).
export default function AnimatedCar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative h-20 md:h-24 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Línea de ruta */}
      <div className="absolute bottom-2 left-0 right-0 border-b-2 border-dashed border-white/20" />

      <motion.div
        className="absolute bottom-3 w-32 md:w-44"
        animate={{
          x: ["-30%", "calc(100vw + 30%)", "calc(100vw + 30%)", "-30%"],
          scaleX: [1, 1, -1, -1],
        }}
        transition={{
          duration: 16,
          times: [0, 0.48, 0.52, 1],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <svg viewBox="0 0 200 80" className="w-full h-auto">
          {/* Carrocería */}
          <path
            d="M18 55 C20 44 28 40 40 38 L58 24 C62 20 70 17 82 17 L124 17 C136 17 146 21 154 29 L166 38 C180 40 188 46 189 54 C190 58 187 60 182 60 L172 60 A16 16 0 0 0 140 60 L76 60 A16 16 0 0 0 44 60 L24 60 C19 60 17 58 18 55 Z"
            fill="currentColor"
            className="text-white/90"
          />
          {/* Ventanas */}
          <path
            d="M66 26 L82 22 L82 38 L58 38 Z M90 22 L120 22 C128 22 136 25 142 31 L148 38 L90 38 Z"
            fill="#2C3E50"
          />
          {/* Ruedas girando */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "60px 60px" }}
          >
            <circle cx="60" cy="60" r="13" fill="#1A1A1A" stroke="#fff" strokeWidth="3" />
            <path d="M60 50 L60 70 M50 60 L70 60" stroke="#fff" strokeWidth="2.5" />
          </motion.g>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "156px 60px" }}
          >
            <circle cx="156" cy="60" r="13" fill="#1A1A1A" stroke="#fff" strokeWidth="3" />
            <path d="M156 50 L156 70 M146 60 L166 60" stroke="#fff" strokeWidth="2.5" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
