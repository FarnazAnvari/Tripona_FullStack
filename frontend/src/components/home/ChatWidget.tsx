"use client";

import React, { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = "tripona-chat-messages";

const defaultMessages: Message[] = [
  {
    id: "welcome",
    text: "Welcome to Tripona! How can I help you?",
    sender: "bot",
  },
];

export default function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [inputText, setInputText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // خواندن پیام‌ها از localStorage بعد از mount شدن کامپوننت
  useEffect(() => {
    const savedMessages = localStorage.getItem(STORAGE_KEY);

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);

        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error(
          "Failed to parse chat messages from localStorage:",
          error,
        );
      }
    }

    setIsLoaded(true);
  }, []);

  // ذخیره پیام‌ها در localStorage هر بار که messages تغییر کند
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, isLoaded]);

  // اسکرول خودکار به آخرین پیام
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) return;

    const trimmedText = inputText.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // پاسخ شبیه‌سازی‌شده تا وقتی بک‌اند آماده شود
    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        text: `You said: "${trimmedText}". We are setting up our AI backend to answer you properly soon!`,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  const handleClearChat = () => {
    setMessages(defaultMessages);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl animate-in slide-in-from-bottom-4">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#E41F26] p-4 text-white">
        <h3 className="font-bold">Ask Tripona</h3>

        <div className="flex items-center gap-3">
          <button
            onClick={handleClearChat}
            className="text-sm text-white/90 transition hover:text-white"
            type="button"
          >
            Clear
          </button>

          <button
            onClick={onClose}
            className="text-lg transition hover:text-gray-200"
            type="button"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl border px-4 py-2.5 text-sm shadow-sm ${
                msg.sender === "user"
                  ? "rounded-tr-none border-transparent bg-[#E41F26] text-white"
                  : "rounded-tl-none border-gray-100 bg-white text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E41F26]"
          />

          <button
            type="submit"
            className="rounded-full bg-[#E41F26] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#c91b21] active:scale-95"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
