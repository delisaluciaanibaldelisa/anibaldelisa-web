"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send } from "lucide-react";
import { site } from "@/lib/site";
import { OPEN_CHAT_EVENT } from "@/lib/chat";
import { trackEvent } from "@/lib/analytics";

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

  // El rey saluda apenas carga la página y queda visible hasta que abran el chat.
  useEffect(() => {
    const t = setTimeout(() => {
      setOpen((isOpen) => {
        if (!isOpen) setGreeting(true);
        return isOpen;
      });
    }, 1200);
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
    trackEvent("chat_open");
  };

  return (
    <>
      {/* Saludo del asistente — siempre visible hasta abrir el chat */}
      <AnimatePresence>
        {greeting && !open && (
          <motion.button
            type="button"
            onClick={openPanel}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-28 right-5 z-50 max-w-[16rem] rounded-2xl rounded-br-sm bg-white shadow-xl border border-gray-200 px-4 py-3 text-left"
          >
            <span className="block font-heading font-bold text-sm text-accent">
              Asistente Aníbal Delisa
            </span>
            <span className="block text-xs text-gray-600 mt-0.5">
              ¿Consultás por service, turnos o presupuestos? Escribime, te
              respondo al instante.
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* El rey flotante — sin círculo, fondo transparente */}
      <motion.button
        type="button"
        onClick={() => (open ? setOpen(false) : openPanel())}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        animate={open ? { y: 0 } : { y: [0, -8, 0] }}
        transition={
          open
            ? { duration: 0.2 }
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
        className="fixed bottom-5 right-5 z-50 grid place-items-center"
      >
        {open ? (
          <span className="grid place-items-center w-12 h-12 rounded-full bg-accent text-white shadow-lg hover:bg-accent-light transition-colors">
            <X size={24} />
          </span>
        ) : logoError ? (
          <span className="grid place-items-center w-14 h-14 rounded-full bg-primary text-accent font-heading font-extrabold text-xl shadow-lg">
            AD
          </span>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/logo.png"
            alt="Asistente Aníbal Delisa"
            className="w-20 h-auto md:w-24 drop-shadow-[0_8px_10px_rgba(0,0,0,0.35)]"
            onError={() => setLogoError(true)}
          />
        )}
      </motion.button>

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
            <div className="bg-primary text-accent px-4 py-3 shrink-0">
              <p className="font-heading font-bold">Hablá con nosotros</p>
              <p className="text-xs text-accent/80">
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
                        ? "bg-primary text-accent rounded-br-sm"
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
                  className="grid place-items-center w-10 h-10 rounded-full bg-primary text-accent disabled:opacity-40 hover:bg-primary-dark transition-colors"
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
