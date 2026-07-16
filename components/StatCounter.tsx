"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

// Caja de estadística con número animado al entrar en pantalla.
export default function StatCounter({
  value,
  suffix = "",
  decimals = 0,
  label,
  color,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  color: string; // color del borde superior y del número
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="bg-white rounded-xl p-5 text-center shadow-sm"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <p
        className="text-4xl font-black font-heading leading-none"
        style={{ color }}
      >
        {display.toFixed(decimals)}
        {suffix}
      </p>
      <p className="mt-2 text-[11px] text-[#888] uppercase tracking-wider font-semibold">
        {label}
      </p>
    </div>
  );
}
