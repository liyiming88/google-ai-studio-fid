import React, { useState, useRef, useEffect } from 'react';
import { Asset, Goal, ChatMessage } from '../types';
import { getFinancialAdvice } from '../services/geminiService';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { BRAND_COLOR } from '../constants';

interface AIAdvisorProps {
  assets: Asset[];
  goals: Goal[];
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ assets, goals }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm your PlanView AI assistant. I can analyze your portfolio, suggest adjustments for your goals, or explain financial concepts. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const advice = await getFinancialAdvice(assets, goals, userMsg.text);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: advice,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full border border-slate-200 shadow-sm">
                <Sparkles size={18} className="text-amber-500" />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">PlanView Advisor</h3>
                <p className="text-xs text-slate-500">Powered by Gemini 2.5</p>
            </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse space-x-3' : 'flex-row space-x-3'}`}>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  msg.role === 'user' ? 'bg-slate-200' : 'text-white'
                }`}
                style={{ backgroundColor: msg.role === 'model' ? BRAND_COLOR : undefined }}
              >
                {msg.role === 'user' ? <User size={16} className="text-slate-600" /> : <Bot size={16} />}
              </div>
              
              <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-tr-none' 
                  : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-none markdown-body'
              }`}>
                {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 min-h-[1rem]">{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="flex flex-row space-x-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 flex-shrink-0 text-white" style={{backgroundColor: BRAND_COLOR}}>
                    <Bot size={16} />
                </div>
                <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about your retirement plan or asset allocation..."
            className="w-full pr-12 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#12805c] focus:border-transparent resize-none h-[50px] min-h-[50px] max-h-[150px] text-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`absolute right-2 p-2 rounded-lg transition-colors ${
              !input.trim() || loading 
                ? 'text-slate-300 bg-transparent cursor-not-allowed' 
                : 'text-white hover:bg-opacity-90'
            }`}
            style={{ backgroundColor: (!input.trim() || loading) ? 'transparent' : BRAND_COLOR, color: (!input.trim() || loading) ? undefined : 'white' }}
          >
            <Send size={18} className={(!input.trim() || loading) ? "text-slate-400" : "text-white"} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center">
          AI advice is for informational purposes only and does not constitute professional financial advice.
        </p>
      </div>
    </div>
  );
};

export default AIAdvisor;
