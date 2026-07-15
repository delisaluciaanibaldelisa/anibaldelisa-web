"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { site } from "@/lib/site";
import { OPEN_CHAT_EVENT } from "@/lib/chat";

type Msg = { from: "bot" | "user"; text: string };

const WELCOME =
  "¡Hola! Soy el asistente de Aníbal Delisa 🔧 ¿En qué te puedo ayudar? Podés preguntarme sobre precios, turnos, servicios o dejame tu consulta y te respondemos a la brevedad.";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [greeting, setGreeting] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Permite abrir el chat desde cualquier botón "Escribinos" de la web.
  useEffect(() => {
    const openHandler = () => {
      setGreeting(false);
      setOpen(true);
    };
    window.addEventListener(OPEN_CHAT_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, openHandler);
  }, []);

  // Muestra un saludo llamativo unos segundos después de cargar (si no abrió aún).
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen((isOpen) => {
        if (!isOpen) setGreeting(true);
        return isOpen;
      });
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setLoading(true);

    const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    try {
      if (!webhook) throw new Error("Webhook no configurado");

      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          timestamp: Date.now(),
          source: "web",
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json().catch(() => ({}));
      const reply =
        data.reply ||
        data.message ||
        data.output ||
        "¡Gracias por tu mensaje! Te respondemos a la brevedad.";

      setMessages((m) => [...m, { from: "bot", text: reply }]);
    } catch {
      // Fallback genérico: no revela el canal de backend.
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: `En este momento no puedo responderte automáticamente. Dejanos tu consulta y te contactamos a la brevedad, o llamanos al ${site.locations.mecanica.phones[1]}.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openPanel = () => {
    setGreeting(false);
    setOpen(true);
  };

  return (
    <>
      {/* Saludo llamativo */}
      <AnimatePresence>
        {greeting && !open && (
          <motion.button
            type="button"
            onClick={openPanel}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-5 z-50 max-w-[15rem] rounded-2xl rounded-br-sm bg-white shadow-xl border border-gray-200 px-4 py-3 text-left"
          >
            <span className="block font-heading font-bold text-sm text-dark">
              ¿Te damos una mano? 👋
            </span>
            <span className="block text-xs text-gray-600 mt-0.5">
              Escribinos y te respondemos al toque.
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Botón flotante con el logo de la marca */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        className={`fixed bottom-5 right-5 z-50 grid place-items-center w-16 h-16 rounded-full shadow-lg transition-colors ${
          open
            ? "bg-primary hover:bg-primary-dark text-white"
            : "bg-white border-2 border-primary text-primary hover:bg-gray-50"
        }`}
      >
        {/* Anillo de pulso para llamar la atención */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        )}
        <span className="relative grid place-items-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "logo"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid place-items-center"
            >
              {open ? (
                <X size={28} />
              ) : logoError ? (
                <span className="font-heading font-extrabold text-xl leading-none">
                  AD
                </span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="/logo.png"
                  alt="Aníbal Delisa"
                  className="w-10 h-10 object-contain"
                  onError={() => setLogoError(true)}
                />
              )}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      {/* Panel de chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm h-[30rem] max-h-[70vh] flex flex-col rounded-xl overflow-hidden bg-white shadow-2xl border border-gray-200"
          >
            {/* Header */}
            <div className="bg-primary text-white px-4 py-3 shrink-0">
              <p className="font-heading font-bold">Hablá con nosotros</p>
              <p className="text-xs text-white/80">
                Aníbal Delisa · respondemos rápido
              </p>
            </div>

            {/* Mensajes */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                      m.from === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-white border border-gray-200 text-dark rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-3 py-2 text-sm text-gray-500">
                    Escribiendo
                    <span className="inline-flex ml-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce [animation-delay:0.15s]">.</span>
                      <span className="animate-bounce [animation-delay:0.3s]">.</span>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-2 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Escribí tu consulta…"
                  className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={send}
                  disabled={loading || !input.trim()}
                  aria-label="Enviar"
                  className="grid place-items-center w-10 h-10 rounded-full bg-primary text-white disabled:opacity-40 hover:bg-primary-dark transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
              <a
                href={site.locations.mecanica.telHref}
                className="block text-center text-xs text-gray-500 hover:text-primary mt-2"
              >
                O llamanos: {site.locations.mecanica.phones.join(" / ")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
