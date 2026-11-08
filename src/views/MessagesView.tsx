import React from 'react';
import { MessageSquare, Phone, MessageCircle, ChevronRight, CheckCheck } from 'lucide-react';
import { Conversation } from '../types';

interface MessagesViewProps {
  conversations: Conversation[];
  onSelectConversation: (conv: Conversation) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  onSelectConversation
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#faf8f5] overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-white border-b border-stone-200 shrink-0">
        <h2 className="font-extrabold text-sm text-stone-900 tracking-tight">
          Messagerie Directe Jenga
        </h2>
        <span className="text-[11px] text-stone-500">
          Échanges avec vos prestataires, artisans et fournisseurs en RDC
        </span>
      </div>

      {/* Conversations List */}
      <div className="flex-1 p-2 overflow-y-auto divide-y divide-stone-100">
        {conversations.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 mt-4 space-y-2">
            <MessageSquare className="w-8 h-8 text-stone-400 mx-auto" />
            <h4 className="font-bold text-sm text-stone-800">Aucune discussion active</h4>
            <p className="text-xs text-stone-500">
              Contactez un artisan ou un architecte depuis l'annuaire pour démarrer un échange.
            </p>
          </div>
        ) : (
          conversations.map((conv) => {
            const whatsappUrl = `https://wa.me/${conv.participantWhatsapp}?text=${encodeURIComponent(
              `Bonjour ${conv.participantName}, nous échangeons sur Jenga RDC.`
            )}`;

            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv)}
                className="p-3 hover:bg-stone-100/80 rounded-2xl transition-colors cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200 bg-stone-100"
                      referrerPolicy="no-referrer"
                    />
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c86432] text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="font-bold text-xs text-stone-900 truncate">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] text-stone-400 shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <span className="text-[10px] text-[#c86432] font-semibold block truncate">
                      {conv.participantRole}
                    </span>

                    <p className="text-xs text-stone-600 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                </div>

                {/* Direct WhatsApp Fast Launch */}
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] transition-colors"
                    title="Ouvrir WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                  <ChevronRight className="w-4 h-4 text-stone-300" />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
