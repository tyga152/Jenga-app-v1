import React, { useState } from 'react';
import { ArrowLeft, Send, Phone, MessageCircle, Paperclip, CheckCheck, Clock } from 'lucide-react';
import { Conversation, ChatMessage } from '../types';

interface ChatViewProps {
  conversation: Conversation;
  onBack: () => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  conversation,
  onBack,
  onSendMessage
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(conversation.id, inputText.trim());
    setInputText('');
  };

  const whatsappUrl = `https://wa.me/${conversation.participantWhatsapp}?text=${encodeURIComponent(
    `Bonjour ${conversation.participantName}, nous échangeons sur Jenga RDC.`
  )}`;

  return (
    <div className="flex flex-col h-full bg-[#f4efe6]">
      {/* Top Bar for Chat */}
      <div className="px-3 py-2.5 bg-[#0e3b27] text-white flex items-center justify-between shadow-xs shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1 -ml-1 rounded-full text-stone-200 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <img
            src={conversation.participantAvatar}
            alt={conversation.participantName}
            className="w-9 h-9 rounded-full object-cover border border-white/40"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <h4 className="font-bold text-xs leading-tight truncate max-w-[150px] sm:max-w-[200px]">
              {conversation.participantName}
            </h4>
            <span className="text-[10px] text-stone-300 block truncate">
              {conversation.participantRole}
            </span>
          </div>
        </div>

        {/* Quick Phone & WhatsApp options */}
        <div className="flex items-center gap-1">
          <a
            href={`tel:${conversation.participantPhone}`}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            title="Appel direct"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#25D366] text-white hover:brightness-110"
            title="Basculer sur WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
        <div className="text-center my-2">
          <span className="text-[10px] bg-stone-200/80 text-stone-600 px-2 py-0.5 rounded-full font-medium">
            Échange sécurisé Jenga RDC · Contacts directs disponibles
          </span>
        </div>

        {conversation.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs shadow-xs leading-relaxed ${
                msg.isMe
                  ? 'bg-[#0e3b27] text-white rounded-br-xs'
                  : 'bg-white text-stone-800 rounded-bl-xs border border-stone-200'
              }`}
            >
              <p>{msg.text}</p>
              <div
                className={`flex items-center justify-end gap-1 text-[9px] mt-1 ${
                  msg.isMe ? 'text-emerald-200' : 'text-stone-400'
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.isMe && <CheckCheck className="w-3 h-3" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="p-2.5 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0">
        <input
          type="text"
          placeholder="Écrivez un message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 py-2 px-3 bg-stone-100 border border-stone-200 rounded-full text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#0e3b27]"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="w-9 h-9 rounded-full bg-[#0e3b27] hover:bg-[#0a291b] disabled:opacity-40 text-white flex items-center justify-center transition-colors shrink-0 shadow-xs"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
};
