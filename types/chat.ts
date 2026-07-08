import type { ISODate, UUID } from "./common";
import type { Role } from "./user";

export type MessageType = "text" | "image" | "voice" | "location" | "file" | "system";

export interface Message {
  id: UUID;
  conversationId: UUID;
  authorId: UUID;
  authorRole: Role;
  authorName: string;
  type: MessageType;
  content: string;
  status: "sent" | "delivered" | "read";
  createdAt: ISODate;
}

export interface Conversation {
  id: UUID;
  participantIds: UUID[];
  participantName: string;
  participantRole: Role;
  lastMessage?: string;
  lastMessageAt?: ISODate;
  unreadCount: number;
  orderId?: UUID;
  contextLabel?: string;
}
