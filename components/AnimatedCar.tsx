"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Peugeot 308 real (recorte transparente) cruzando la sección de lado a lado.
export default function AnimatedCar({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`relative h-24 md:h-32 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Línea de ruta */}
      <div className="absolute bottom-3 left-0 right-0 border-b-2 border-dashed border-white/20" />

      <motion.div
        className="absolute bottom-4 w-44 md:w-64"
        animate={{
          x: ["-40%", "calc(100vw + 40%)", "calc(100vw + 40%)", "-40%"],
          scaleX: [1, 1, -1, -1],
        }}
        transition={{
          duration: 18,
          times: [0, 0.48, 0.52, 1],
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src="/autos/308.png"
          alt=""
          width={900}
          height={506}
          className="w-full h-auto drop-shadow-[0_10px_12px_rgba(0,0,0,0.45)]"
        />
      </motion.div>
    </div>
  );
}
