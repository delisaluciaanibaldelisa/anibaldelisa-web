"use client";

import { useState } from "react";
import { Check, RotateCcw } from "lucide-react";

const items = [
  {
    title: "Niveles de fluidos",
    detail:
      "Aceite de motor, líquido de frenos, refrigerante, dirección hidráulica y lavaparabrisas.",
  },
  {
    title: "Neumáticos",
    detail:
      "Presión correcta (incluir el auxilio), estado de la banda de rodamiento, sin bultos ni cortes.",
  },
  {
    title: "Frenos",
    detail: "Verificar eficiencia y que no haya ruidos al frenar.",
  },
  {
    title: "Luces",
    detail:
      "Todas funcionando: posición, cruces, largas, giros, stop, retroceso y neblineros.",
  },
  {
    title: "Cinturones de seguridad",
    detail:
      "Que enganchen y retraigan correctamente en todos los asientos.",
  },
  {
    title: "Limpia y lavaparabrisas",
    detail: "Funcionamiento correcto y gomas en buen estado.",
  },
  {
    title: "Batería",
    detail: "Sin corrosión en terminales y nivel de carga óptimo.",
  },
  {
    title: "Correa de distribución",
    detail: "Verificar según el kilometraje indicado por el fabricante.",
  },
  {
    title: "Dirección",
    detail: "Sin juego excesivo ni ruidos al girar.",
  },
  {
    title: "Documentación",
    detail:
      "Cédula, libreta de conducir, patente, seguro vigente y RVT (Revisión Técnica Vehicular).",
  },
];

export default function ChecklistViaje() {
  const [done, setDone] = useState<boolean[]>(() =>
    new Array(items.length).fill(false),
  );

  const completed = done.filter(Boolean).length;
  const toggle = (i: number) =>
    setDone((d) => d.map((v, j) => (j === i ? !v : v)));
  const reset = () => setDone(new Array(items.length).fill(false));

  return (
    <div>
      {/* Barra de progreso */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-accent">
          {completed} de {items.length} completados
        </p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary"
        >
          <RotateCcw size={14} />
          Reiniciar
        </button>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-200 mb-6 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${(completed / items.length) * 100}%` }}
        />
      </div>

      <ul className="space-y-3">
        {items.map((item, i) => {
          const checked = done[i];
          return (
            <li key={item.title}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={checked}
                className={`w-full flex items-start gap-4 text-left rounded-xl border p-4 transition-colors ${
                  checked
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <span
                  className={`mt-0.5 grid place-items-center w-6 h-6 shrink-0 rounded-md border-2 transition-colors ${
                    checked
                      ? "bg-primary border-primary text-white"
                      : "border-gray-300 text-transparent"
                  }`}
                >
                  <Check size={16} strokeWidth={3} />
                </span>
                <span>
                  <span
                    className={`block font-heading font-bold ${
                      checked ? "text-primary line-through" : "text-dark"
                    }`}
                  >
                    {i + 1}. {item.title}
                  </span>
                  <span className="block text-sm text-gray-600 mt-0.5">
                    {item.detail}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
