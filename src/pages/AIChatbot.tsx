import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  time: string;
}

const quickActions = [
  "Why was TXN-8A3F flagged?",
  "Show fraud trends this week",
  "What's my risk score?",
  "How does the XGBoost model work?",
];

const botResponses: Record<string, string> = {
  "why was txn-8a3f flagged": "🔍 **TXN-8A3F** was flagged with **94.2% fraud probability** due to:\n\n• **High Amount** (35% impact): $2,400 is 12x your average\n• **Unusual Time** (28%): 2:15 AM — you never transact at night\n• **New Location** (22%): Lagos, Nigeria — first-time location\n• **Wire Transfer** (15%): High-risk transaction type\n\nRecommendation: Review and confirm or report as fraud.",
  "show fraud trends this week": "📈 **This Week's Fraud Summary:**\n\n• Total Transactions: 12,450\n• Fraud Detected: 23 (0.18%)\n• Amount Protected: $45,200\n• Top Risk: Wire transfers from new locations\n• Trend: Fraud attempts ↑12% vs last week\n\nMost attacks target 12 AM–4 AM window.",
  "what's my risk score": "🛡️ **Your Account Risk Score: Low (12/100)**\n\n• Account age: 2+ years ✅\n• Transaction patterns: Consistent ✅\n• Location stability: High ✅\n• No recent fraud reports ✅\n\nYour account has a strong security profile.",
  "how does the xgboost model work": "🧠 **XGBoost Model Overview:**\n\nXGBoost (eXtreme Gradient Boosting) is our best-performing model:\n\n• **Accuracy**: 99.8%\n• **Recall**: 89.1% (catches 9/10 frauds)\n• **AUC**: 0.994\n\nIt works by building decision trees sequentially, where each tree corrects errors from previous ones. Key features: V14 (18.2%), V17 (15.6%), V12 (13.4%).",
};

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "0", role: "bot", content: "👋 Hi! I'm FraudShield AI. Ask me about flagged transactions, fraud patterns, model performance, or security recommendations.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const key = text.toLowerCase().replace(/[?!.]/g, "").trim();
      const response = botResponses[key] || `I analyzed your query: "${text}"\n\nBased on current data:\n• No immediate threats detected\n• All models are performing within normal parameters\n• System health: 100%\n\nWould you like me to run a deeper analysis?`;
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "bot", content: response, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="page-container pt-24 max-w-4xl space-y-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold gradient-text">AI Fraud Assistant</h1>
        </div>
        <p className="text-muted-foreground">Ask questions about transactions, fraud patterns, and model performance</p>
      </motion.div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((q) => (
          <button key={q} onClick={() => sendMessage(q)} className="text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors">
            {q}
          </button>
        ))}
      </div>

      {/* Chat Window */}
      <div className="glass-card flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("flex gap-3", msg.role === "user" && "flex-row-reverse")}>
              <div className={cn("h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0", msg.role === "bot" ? "bg-primary/10" : "bg-muted")}>
                {msg.role === "bot" ? <Sparkles className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-foreground" />}
              </div>
              <div className={cn("max-w-[75%] p-3 rounded-xl text-sm", msg.role === "bot" ? "bg-muted/50 text-foreground" : "bg-primary text-primary-foreground")}>
                <p className="whitespace-pre-line">{msg.content}</p>
                <p className={cn("text-[10px] mt-1", msg.role === "bot" ? "text-muted-foreground" : "text-primary-foreground/60")}>{msg.time}</p>
              </div>
            </motion.div>
          ))}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center"><Sparkles className="h-4 w-4 text-primary" /></div>
              <div className="bg-muted/50 p-3 rounded-xl flex gap-1">
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </motion.div>
          )}
          <div ref={endRef} />
        </div>

        <div className="p-4 border-t border-border/50">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about fraud, transactions, or models..." className="flex-1 bg-muted/50 border-border" />
            <Button type="submit" size="icon" disabled={!input.trim() || typing} className="bg-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
