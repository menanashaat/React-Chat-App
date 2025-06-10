// src/types.ts
export interface User {
  id: string;
  name: string;
  avatar: string;
  lastSeen?: string;
  isOnline: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isBroadcast?: boolean;
  media?: {
    url: string;
    type: 'image' | 'video';
    progress?: number;
  };
}

export interface Chat {
  id: string;
  userId: string;
  lastMessage: string;
  unread: number;
  timestamp: Date;
}