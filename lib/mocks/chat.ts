import type { Conversation, Message } from "@/types/chat";

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participantIds: ["user-buyer-1", "user-seller-1"],
    participantName: "Tech Yaoundé Pro",
    participantRole: "seller",
    lastMessage: "Votre commande est prête à expédier",
    lastMessageAt: "2026-07-04T14:30:00Z",
    unreadCount: 2,
    orderId: "order-101",
    contextLabel: "Commande #101",
  },
  {
    id: "conv-2",
    participantIds: ["user-buyer-1", "user-driver-1"],
    participantName: "Ibrahim (Livreur)",
    participantRole: "driver",
    lastMessage: "Je suis à 5 min",
    lastMessageAt: "2026-07-03T10:15:00Z",
    unreadCount: 0,
    orderId: "order-99",
    contextLabel: "Livraison #99",
  },
  {
    id: "conv-3",
    participantIds: ["user-buyer-1", "user-admin-1"],
    participantName: "Support AfriMarket",
    participantRole: "admin",
    lastMessage: "Nous traitons votre litige",
    lastMessageAt: "2026-07-02T16:00:00Z",
    unreadCount: 1,
    contextLabel: "Litige #45",
  },
];

export const mockMessages: Record<string, Message[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      authorId: "user-buyer-1",
      authorRole: "buyer",
      authorName: "Aïcha",
      type: "text",
      content: "Bonjour, quand sera expédiée ma commande ?",
      status: "read",
      createdAt: "2026-07-04T12:00:00Z",
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      authorId: "user-seller-1",
      authorRole: "seller",
      authorName: "Emmanuel",
      type: "text",
      content: "Votre commande est prête à expédier",
      status: "delivered",
      createdAt: "2026-07-04T14:30:00Z",
    },
  ],
  "conv-2": [
    {
      id: "msg-3",
      conversationId: "conv-2",
      authorId: "user-driver-1",
      authorRole: "driver",
      authorName: "Ibrahim",
      type: "text",
      content: "Je suis à 5 min",
      status: "read",
      createdAt: "2026-07-03T10:15:00Z",
    },
  ],
  "conv-3": [
    {
      id: "msg-4",
      conversationId: "conv-3",
      authorId: "user-admin-1",
      authorRole: "admin",
      authorName: "Sandrine",
      type: "text",
      content: "Nous traitons votre litige",
      status: "sent",
      createdAt: "2026-07-02T16:00:00Z",
    },
  ],
};

// TODO API: GET /conversations → Conversation[]
// TODO API: GET /conversations/:id/messages → Message[]
