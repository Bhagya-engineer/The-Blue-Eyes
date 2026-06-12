import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, ChefHat, Heart, ShieldCheck } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_SUGGESTIONS = [
  "What is covered in the Majestic Signature package?",
  "How can I customize our wedding catering menu?",
  "Tell me about class-leading drone photography",
  "Help me plan a luxury Sangeet timeline"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Welcome to The Blue Eye Events. I am BEE, your Virtual Luxury Wedding & Event Planner. How may I assist you in crafting your grand celebration today?",
      timestamp: new Date()
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat session
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle message sending
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal('');
    setIsLoading(true);

    try {
      // Build brief messages history to pass to endpoint
      const payloadHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: textToSend,
          history: payloadHistory
        })
      });

      if (!res.ok) {
        throw new Error('API server status failure');
      }

      const data = await res.json();
      
      const assistantMessage: ChatMessage = {
        id: `msg-bee-${Date.now()}`,
        role: 'assistant',
        content: data.text || "I apologize, our luxury reservation concierge system is experiencing a high volume of requests. Feel free to refine your questions or configure the reservation form below directly!",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("AI chat assistant fetch failed:", err);
      
      // Fallback assistance behavior
      const errorFallbackMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: "I am BEE, your dedicated virtual concierge. Although our online AI model is in offline safe mode right now, I can proudly verify that we are ready to assist you. \n\nFeel free to explore our professional Standard, Premium, or Gourmet catering items in Step 3, configure bespoke guest counts, or lock in your luxurious date with our reservation wizard below!",
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorFallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        content: "Hello again! I am BEE, your Virtual Luxury Wedding & Event Planner. How may I assist you in crafting your grand celebration today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Floating launcher trigger with glorious pulsing effect */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="btn-chatbot-launcher"
          type="button"
          className="relative bg-brand-navy hover:bg-brand-navy-light text-brand-gold h-14 w-14 rounded-full flex items-center justify-center shadow-2xl group transition-all border border-brand-gold/40 hover:scale-105 active:scale-95 cursor-pointer"
          title="Chat with BEE Virtual Planner"
        >
          {/* Pulsing visual aura animation */}
          <span className="absolute inset-0 rounded-full bg-brand-gold/20 animate-ping opacity-60" />
          
          {isOpen ? (
            <X className="w-6 h-6 transition-transform duration-200 rotate-90" />
          ) : (
            <div className="relative">
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-brand-gold text-brand-navy text-[8px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow animate-bounce font-sans">
                A1
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Floating Chat Interface card using motion/react */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ duration: 0.23, ease: 'easeOut' }}
            id="chatbot-interface-card"
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[93vw] sm:w-[410px] h-[550px] shadow-2xl rounded-2xl overflow-hidden flex flex-col glass-panel border border-brand-gold/30"
          >
            {/* Header premium design bar */}
            <div className="bg-brand-navy p-4 text-brand-ivory flex justify-between items-center border-b border-brand-gold/25 relative overflow-hidden">
              {/* Luxury gold spark pattern */}
              <div className="absolute right-0 top-0 opacity-10 translate-x-3 -translate-y-3">
                <Sparkles className="w-32 h-32 text-brand-gold" />
              </div>

              <div className="flex items-center gap-2.5 z-10">
                <div className="h-9 w-9 rounded-full bg-brand-gold/15 border border-brand-gold/50 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4.5 h-4.5 text-brand-gold animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-serif tracking-wide text-brand-gold flex items-center gap-1">
                    BEE Virtual Planner
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-brand-gold animate-pulse rounded-full" />
                    <span className="text-[9.5px] font-mono tracking-wider uppercase text-brand-ivory/80">Online Concierge</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 z-10">
                <button
                  type="button"
                  id="btn-chatbot-reset"
                  onClick={handleResetChat}
                  className="p-1.5 text-brand-ivory/70 hover:text-brand-gold rounded-lg transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  id="btn-chatbot-close"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-brand-ivory/70 hover:text-brand-gold rounded-lg transition-colors cursor-pointer"
                  title="Close chat"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Chat message content view stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-bg/60 scrollbar-thin">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-150`}
                  >
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-brand-navy text-white rounded-tr-none border border-brand-navy-light'
                        : 'bg-white text-slate-800 rounded-tl-none border border-brand-gold/15 font-serif'
                    }`}>
                      {/* Message text body with elegant breaks representation */}
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      
                      <div className={`text-[8.5px] font-mono mt-1.5 opacity-60 text-right ${
                        isUser ? 'text-brand-gold/80' : 'text-slate-500'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Chat typing indicator animation */}
              {isLoading && (
                <div className="flex justify-start items-center gap-1.5 text-xs text-slate-500 font-mono italic animate-pulse">
                  <div className="h-6 w-9 bg-white border border-brand-gold/10 rounded-xl rounded-tl-none flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce delay-300" />
                  </div>
                  <span>BEE is planning...</span>
                </div>
              )}

              <div ref={listEndRef} />
            </div>

            {/* Quick suggested prompt selectors */}
            <div className="px-4 py-2 border-t border-brand-gold/15 bg-white/70">
              <p className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1">
                <ChefHat className="w-3 h-3 text-brand-gold" /> Suggested Enquiries
              </p>
              <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none pr-4">
                {QUICK_SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-[10px] text-brand-navy hover:text-brand-navy bg-brand-bg/75 hover:bg-brand-gold/15 whitespace-nowrap px-3 py-1.5 rounded-full border border-brand-gold/20 transition-all font-medium text-left cursor-pointer shrink-0"
                  >
                    ✦ {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Form input panel */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputVal);
              }}
              className="p-3 border-t border-brand-gold/15 bg-white flex gap-2 items-center"
            >
              <input
                type="text"
                id="chatbot-input-field"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about themes, custom menu options, dates..."
                disabled={isLoading}
                className="flex-1 text-xs border border-slate-200 bg-brand-bg/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gold focus:border-brand-gold text-slate-800 disabled:opacity-50"
              />
              <button
                type="submit"
                id="btn-chatbot-send"
                disabled={!inputVal.trim() || isLoading}
                className="bg-brand-navy hover:bg-brand-gold text-brand-gold hover:text-brand-navy h-10 w-10 shrink-0 rounded-xl flex items-center justify-center transition-colors disabled:opacity-40 border border-brand-gold/20 cursor-pointer"
                title="Send Enquiry"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Micro badge brand footer */}
            <div className="bg-brand-navy/5 px-4 py-1.5 border-t border-slate-100 flex justify-between items-center text-[8px] font-mono text-slate-500">
              <span className="flex items-center gap-1 text-[8.5px]">
                <ShieldCheck className="w-3 h-3 text-brand-gold" /> SSL Encrypted Planner Concierge
              </span>
              <span>BEE Version 1.25</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
