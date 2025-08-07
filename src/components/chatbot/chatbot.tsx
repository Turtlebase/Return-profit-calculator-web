
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatbotResponse } from '@/app/actions';
import { type ChatMessage } from '@/ai/flows/d2c-expert-chat';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Hello! I'm ProfitPilot, your AI D2C expert. How can I help you improve your profitability today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const scrollableView = scrollAreaRef.current.querySelector('div');
        if (scrollableView) {
           scrollableView.scrollTo({ top: scrollableView.scrollHeight, behavior: 'smooth' });
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getChatbotResponse({
      history: [...messages],
      query: input,
    });

    const modelMessage: ChatMessage = { role: 'model', content: response };
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
         <AnimatePresence>
            {isOpen ? (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.5 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="w-[calc(100vw-3rem)] max-w-md h-[70vh] max-h-[600px] bg-card border rounded-2xl shadow-2xl flex flex-col"
                >
                    <header className="flex items-center justify-between p-4 border-b">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Sparkles className="w-8 h-8 text-primary" />
                                <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-card"></div>
                            </div>
                            <div>
                                <h3 className="font-bold">ProfitPilot</h3>
                                <p className="text-xs text-muted-foreground">Your D2C Expert Assistant</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </header>
                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    {message.role === 'model' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback className="bg-primary text-primary-foreground"><Sparkles className="w-5 h-5" /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={cn("max-w-[80%] rounded-2xl p-3 text-sm", message.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary rounded-bl-none')}>
                                        {message.content}
                                    </div>
                                     {message.role === 'user' && (
                                        <Avatar className="w-8 h-8">
                                            <AvatarFallback>You</AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                             {isLoading && (
                                <div className="flex items-start gap-3 justify-start">
                                    <Avatar className="w-8 h-8">
                                        <AvatarFallback className="bg-primary text-primary-foreground"><Sparkles className="w-5 h-5" /></AvatarFallback>
                                    </Avatar>
                                    <div className="bg-secondary rounded-2xl p-3 text-sm rounded-bl-none">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <footer className="p-4 border-t">
                        <form onSubmit={handleSubmit} className="flex items-center gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about profitability, RTO, etc."
                                disabled={isLoading}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={isLoading}>
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                    </footer>
                </motion.div>
            ) : (
                <motion.div
                 initial={{ opacity: 0, y: 50, scale: 0.5 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 exit={{ opacity: 0, y: 50, scale: 0.5 }}
                >
                    <Button onClick={() => setIsOpen(true)} className="rounded-full w-16 h-16 shadow-2xl animate-pulse-strong">
                        <MessageCircle className="w-8 h-8" />
                    </Button>
                </motion.div>
            )}
         </AnimatePresence>
      </div>
    </>
  );
}
