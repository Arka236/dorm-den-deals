import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi there! 👋 Welcome to CollegeEssentials! I'm here to help you find the perfect mattress, pillows, or toiletries for your dorm. How can I assist you today?",
    isBot: true,
    timestamp: new Date(),
  },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes("mattress")) {
      return "Great choice! Our memory foam mattresses are very popular among college students. The Queen Size Memory Foam Mattress is currently on sale for $299.99. Would you like to know more about sizes or features?";
    } else if (input.includes("pillow")) {
      return "Our pillows are designed for comfort and support! The Premium Down Alternative Pillows (Set of 2) are a bestseller at $49.99. They're perfect for dorm life. Need help choosing between memory foam or down alternative?";
    } else if (input.includes("toiletries") || input.includes("bathroom")) {
      return "Perfect! Our Complete Toiletry Essentials Kit has everything you need for dorm life - shampoo, soap, toothbrush, and more. It's $89.99 and very convenient. Would you like to see what's included?";
    } else if (input.includes("price") || input.includes("cost")) {
      return "We offer student-friendly pricing! Mattresses start at $199.99, pillow sets from $39.99, and toiletry kits from $59.99. Plus, we have student discounts available! What's your budget range?";
    } else if (input.includes("shipping") || input.includes("delivery")) {
      return "We offer free shipping on orders over $75 directly to your dorm! Orders under $75 have a $9.99 shipping fee. Most items arrive within 3-5 business days. 📦";
    } else {
      return "I'd be happy to help you with that! You can browse our categories for Mattresses, Pillows, and Toiletries. Is there a specific product you're looking for, or would you like recommendations based on your needs?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 button-gradient",
          isOpen && "rotate-180"
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-96 shadow-2xl border-primary/20 animate-scale-in">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">C</span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm">College Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online now</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-full pb-4">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isBot ? "justify-start" : "justify-end"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                        message.isBot
                          ? "bg-muted text-foreground"
                          : "bg-gradient-primary text-primary-foreground"
                      )}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2 mt-4">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about mattresses, pillows, toiletries..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="button-gradient"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}