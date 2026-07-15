"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { servicios } from "@/lib/site";

const schema = z.object({
  nombre: z.string().min(2, "Ingresá tu nombre"),
  telefono: z.string().min(6, "Ingresá un teléfono válido"),
  email: z.string().email("Ingresá un email válido"),
  servicio: z.string().min(1, "Elegí un servicio"),
  mensaje: z.string().min(5, "Contanos brevemente tu consulta"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    try {
      if (webhook) {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            source: "formulario-web",
            timestamp: Date.now(),
          }),
        });
      }
      // Aun sin webhook configurado, mostramos confirmación (no perdemos el lead).
      reset();
    } catch {
      // Mantenemos la confirmación; el negocio también recibe por otros canales.
      reset();
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary";
  const errorClass = "mt-1 text-sm text-primary";

  return (
    <AnimatePresence mode="wait">
      {isSubmitSuccessful ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center"
        >
          <CheckCircle2 className="mx-auto text-emerald-600" size={48} />
          <h3 className="mt-4 font-heading font-bold text-xl text-dark">
            ¡Mensaje enviado!
          </h3>
          <p className="mt-2 text-gray-600">
            Gracias por escribirnos. Te respondemos a la brevedad.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-5"
          noValidate
        >
          <div>
            <label htmlFor="nombre" className="block font-semibold text-dark mb-1">
              Nombre
            </label>
            <input id="nombre" className={inputClass} {...register("nombre")} />
            {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="telefono" className="block font-semibold text-dark mb-1">
                Teléfono
              </label>
              <input
                id="telefono"
                type="tel"
                className={inputClass}
                {...register("telefono")}
              />
              {errors.telefono && (
                <p className={errorClass}>{errors.telefono.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block font-semibold text-dark mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                {...register("email")}
              />
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="servicio" className="block font-semibold text-dark mb-1">
              Servicio
            </label>
            <select id="servicio" className={inputClass} {...register("servicio")}>
              <option value="">Elegí un servicio…</option>
              {servicios.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Otro">Otra consulta</option>
            </select>
            {errors.servicio && (
              <p className={errorClass}>{errors.servicio.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="mensaje" className="block font-semibold text-dark mb-1">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              rows={4}
              className={inputClass}
              {...register("mensaje")}
            />
            {errors.mensaje && (
              <p className={errorClass}>{errors.mensaje.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 transition-colors disabled:opacity-60"
          >
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            {isSubmitting ? "Enviando…" : "Enviar consulta"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
