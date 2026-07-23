"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, Loader2, CheckCircle2 } from "lucide-react";
import {
  SLOTS,
  type Slot,
  proximosDiasHabiles,
  fechaDisplay,
  horaDisplay,
} from "@/lib/turnos";
import { trackEvent, trackAdsConversion, ADS_CONVERSIONS } from "@/lib/analytics";

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre y apellido"),
  celular: z
    .string()
    .min(8, "Ingresá un celular válido")
    .regex(/^[\d\s+\-()]+$/, "Solo números"),
  email: z.string().email("Ingresá un email válido"),
  marca: z.string().min(2, "Ingresá la marca de tu vehículo"),
  trabajo: z.string().min(3, "Contanos qué necesita tu auto"),
});

type FormData = z.infer<typeof schema>;
type SlotInfo = { hora: Slot; libre: boolean };

export default function TurnosBooking() {
  const dias = useMemo(() => proximosDiasHabiles(10), []);
  const [fecha, setFecha] = useState(dias[0]);
  const [hora, setHora] = useState<Slot | null>(null);
  const [slots, setSlots] = useState<SlotInfo[] | null>(null);
  const [cargandoSlots, setCargandoSlots] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmado, setConfirmado] = useState<{
    fecha: string;
    hora: Slot;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const cargarSlots = useCallback(async (f: string) => {
    setCargandoSlots(true);
    setSlots(null);
    try {
      const res = await fetch(`/api/turnos?fecha=${f}`);
      const data = await res.json();
      setSlots(res.ok ? data.slots : SLOTS.map((h) => ({ hora: h, libre: true })));
    } catch {
      setSlots(SLOTS.map((h) => ({ hora: h, libre: true })));
    } finally {
      setCargandoSlots(false);
    }
  }, []);

  useEffect(() => {
    setHora(null);
    cargarSlots(fecha);
  }, [fecha, cargarSlots]);

  const onSubmit = async (data: FormData) => {
    if (!hora) {
      setErrorMsg("Elegí un horario disponible");
      return;
    }
    setErrorMsg("");
    setEnviando(true);
    try {
      const res = await fetch("/api/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, fecha, hora }),
      });
      const resp = await res.json();
      if (!res.ok) {
        setErrorMsg(resp.error || "No pudimos agendar el turno. Probá de nuevo.");
        if (resp.code === "ocupado") cargarSlots(fecha);
        return;
      }
      trackEvent("turno_agendado", { fecha, hora });
      trackAdsConversion(ADS_CONVERSIONS.turnoAgendado, 10);
      setConfirmado({ fecha, hora });
    } catch {
      setErrorMsg("Error de conexión. Probá de nuevo o llamanos al 2408 4755.");
    } finally {
      setEnviando(false);
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent";
  const errorClass = "mt-1 text-sm text-red-600";

  if (confirmado) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto text-emerald-600" size={52} />
        <h3 className="mt-4 font-heading font-bold text-2xl text-dark">
          ¡Turno confirmado!
        </h3>
        <p className="mt-2 text-gray-700 text-lg">
          Te esperamos el <strong>{fechaDisplay(confirmado.fecha)}</strong> a
          las <strong>{horaDisplay(confirmado.hora)}</strong>.
        </p>
        <p className="mt-2 text-gray-600 text-sm">
          Te enviamos un email con todos los detalles. Si necesitás
          reprogramar, escribinos por WhatsApp o llamanos al 2408 4755.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Paso 1: día */}
      <div>
        <h3 className="font-heading font-bold text-lg text-dark mb-3">
          1. Elegí el día
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {dias.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFecha(d)}
              className={`shrink-0 rounded-xl border px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                fecha === d
                  ? "bg-accent text-white border-accent"
                  : "bg-white text-dark border-gray-300 hover:border-accent"
              }`}
            >
              {fechaDisplay(d)}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-gray-500">
          Atendemos de lunes a viernes.
        </p>
      </div>

      {/* Paso 2: horario */}
      <div>
        <h3 className="font-heading font-bold text-lg text-dark mb-3">
          2. Elegí el horario
        </h3>
        {cargandoSlots ? (
          <div className="flex items-center gap-2 text-gray-500 text-sm py-3">
            <Loader2 size={18} className="animate-spin" />
            Consultando disponibilidad…
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {(slots ?? []).map((s) => (
              <button
                key={s.hora}
                type="button"
                disabled={!s.libre}
                onClick={() => setHora(s.hora)}
                className={`rounded-xl border px-5 py-2.5 font-semibold transition-colors ${
                  !s.libre
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through"
                    : hora === s.hora
                      ? "bg-accent text-white border-accent"
                      : "bg-white text-dark border-gray-300 hover:border-accent"
                }`}
              >
                {horaDisplay(s.hora)}
                {!s.libre && " · Ocupado"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Paso 3: datos */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <h3 className="font-heading font-bold text-lg text-dark">
          3. Tus datos
        </h3>

        <div>
          <label htmlFor="t-nombre" className="block font-semibold text-dark mb-1">
            Nombre y apellido
          </label>
          <input id="t-nombre" className={inputClass} {...register("nombre")} />
          {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="t-celular" className="block font-semibold text-dark mb-1">
              Celular
            </label>
            <input id="t-celular" type="tel" className={inputClass} {...register("celular")} />
            {errors.celular && <p className={errorClass}>{errors.celular.message}</p>}
          </div>
          <div>
            <label htmlFor="t-email" className="block font-semibold text-dark mb-1">
              Email
            </label>
            <input id="t-email" type="email" className={inputClass} {...register("email")} />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="t-marca" className="block font-semibold text-dark mb-1">
              Marca del vehículo
            </label>
            <input
              id="t-marca"
              placeholder="Ej: Peugeot, BYD, Chevrolet…"
              className={inputClass}
              {...register("marca")}
            />
            {errors.marca && <p className={errorClass}>{errors.marca.message}</p>}
          </div>
          <div>
            <label htmlFor="t-trabajo" className="block font-semibold text-dark mb-1">
              Trabajo demandado
            </label>
            <input
              id="t-trabajo"
              placeholder="Ej: service, frenos, Chapa y Pintura…"
              className={inputClass}
              {...register("trabajo")}
            />
            {errors.trabajo && <p className={errorClass}>{errors.trabajo.message}</p>}
          </div>
        </div>

        <AnimatePresence>
          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3"
            >
              {errorMsg}
            </motion.p>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={enviando}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-accent hover:bg-accent-light text-white font-semibold px-8 py-3.5 transition-all hover:scale-[1.02] disabled:opacity-60"
        >
          {enviando ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <CalendarCheck size={18} />
          )}
          {enviando ? "Agendando…" : "Confirmar turno"}
        </button>
      </form>
    </div>
  );
}
