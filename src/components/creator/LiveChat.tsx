"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Smile, SendHorizontal } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  avatar?: string;
  badge?: string;
  color?: string;
}

const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    sender: "RohanOP",
    message: "Keep going legend! 🔥",
    avatar: "/images/avatars/rohan.jpg",
    color: "text-amber-400",
  },
  {
    id: "m2",
    sender: "Sneha",
    message: "Amazing content! 💜",
    avatar: "/images/avatars/sneha.jpg",
    color: "text-[#A78BFA]",
  },
  {
    id: "m3",
    sender: "TechGamer",
    message: "Bro that was insane!",
    avatar: "/images/creators/motato.png",
    color: "text-emerald-400",
  },
  {
    id: "m4",
    sender: "Vortex",
    message: "4K setup soon 🚀",
    avatar: "/images/creators/nakul-dhull.png",
    color: "text-cyan-400",
  },
  {
    id: "m5",
    sender: "Priya",
    message: "Love your streams 💜",
    avatar: "/images/avatars/sneha.jpg",
    color: "text-pink-400",
  },
];

export function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const newMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: "You",
      message: trimmed,
      avatar: "/brand/streamly-icon.png",
      color: "text-[#C4B5FD]",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");
  };

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full rounded-2xl bg-[#12101D] border border-[#27233D] p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#1F1C33]">
        <h3 className="font-display font-bold text-sm sm:text-base text-white">
          Live Chat
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>2.4K watching</span>
        </div>
      </div>

      {/* Messages Stream */}
      <div
        ref={chatScrollRef}
        className="space-y-2.5 max-h-56 sm:max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#27233D]"
      >
        {messages.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed group"
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden bg-[#241F3B] border border-[#3A3359] shrink-0 mt-0.5">
              {item.avatar ? (
                <Image
                  src={item.avatar}
                  alt={item.sender}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-purple-300">
                  {item.sender.charAt(0)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <span className={`font-bold mr-1.5 ${item.color || "text-purple-300"}`}>
                {item.sender}
              </span>
              <span className="text-gray-300 break-words">
                {item.message}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <form onSubmit={handleSend} className="pt-1">
        <div className="rounded-xl bg-[#181528] border border-[#27233D] focus-within:border-[#6D3DF5] px-3 py-2 flex items-center gap-2 transition-colors">
          <button
            type="button"
            aria-label="Add emoji"
            className="text-gray-400 hover:text-white transition-colors p-0.5 shrink-0"
          >
            <Smile className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Say something..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value.slice(0, 200))}
            maxLength={200}
            className="bg-transparent text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none flex-1 min-w-0"
          />

          <span className="text-[10px] text-gray-500 font-mono shrink-0">
            {inputText.length}/200
          </span>

          <button
            type="submit"
            disabled={!inputText.trim()}
            aria-label="Send chat message"
            className="w-7 h-7 rounded-lg bg-[#6D3DF5] hover:bg-[#7C3AED] disabled:opacity-40 disabled:hover:bg-[#6D3DF5] text-white flex items-center justify-center transition-colors shrink-0 shadow-sm cursor-pointer disabled:cursor-not-allowed"
          >
            <SendHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

    </div>
  );
}
