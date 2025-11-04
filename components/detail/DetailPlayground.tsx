import React, { useMemo, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage, useRioChat } from '../../hooks/useRioChat';

const ThinkingIndicator = () => (
  <div className="flex justify-center">
    <div className="inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/80 px-3 py-1.5 shadow-[0_10px_24px_rgba(15,23,42,0.1)] backdrop-blur">
      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500">
        Rio 2
      </span>
      <span className="flex items-center gap-1.5">
        <span
          className="h-1.5 w-1.5 rounded-full bg-rio-primary/85 animate-[pulse_1.6s_ease-in-out_infinite]"
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-rio-secondary/80 animate-[pulse_1.6s_ease-in-out_infinite]"
          style={{ animationDelay: '0.25s' }}
        />
        <span
          className="h-1.5 w-1.5 rounded-full bg-rio-accent/75 animate-[pulse_1.6s_ease-in-out_infinite]"
          style={{ animationDelay: '0.5s' }}
        />
      </span>
    </div>
  </div>
);

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex p-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm text-prose ${
          isUser ? 'bg-blue-100 text-right' : 'bg-slate-100'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export const DetailPlayground: React.FC<{ modelName: string }> = ({ modelName }) => {
  const initialMessages = useMemo<ChatMessage[]>(
    () => [
      {
        role: 'assistant',
        content: `Olá! Você está conversando com o ${modelName}. Como posso ajudar?`,
      },
    ],
    [modelName]
  );

  const { messages, input, setInput, isLoading, handleSubmit } = useRioChat({
    initialMessages,
    systemPrompt: null,
    historyLimit: null,
    errorMessage: 'Desculpe, ocorreu um erro. Por favor, tente novamente.',
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'instant', block: 'end' });
  }, [messages, isLoading]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <h3 className="text-lg font-semibold text-prose p-4 border-b border-slate-200">Playground Interativo</h3>
      <div className="h-80 flex flex-col">
        <div className="flex-1 space-y-2 overflow-y-auto p-2">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg} />
          ))}
          {isLoading && <ThinkingIndicator />}
          <div ref={chatEndRef} />
        </div>
        <div className="border-t border-slate-200 p-3">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Envie uma mensagem..."
              disabled={isLoading}
              className="w-full flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm focus:border-rio-primary focus:outline-none focus:ring-1 focus:ring-rio-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-rio-primary text-white transition-colors hover:bg-blue-800 disabled:opacity-50"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
