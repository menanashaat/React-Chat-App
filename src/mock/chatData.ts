
import { User, Message, Chat } from '../types';

export const mockUsers: User[] = [
  { id: '1', name: 'Alex Johnson', avatar: '', isOnline: true },
  { id: '2', name: 'Sam Smith', avatar: '', isOnline: false, lastSeen: '2 hours ago' },
  { id: '3', name: 'Taylor Swift', avatar: '', isOnline: true },
  { id: '4', name: 'Jamie Brown', avatar: '', isOnline: true },
  { id: '5', name: 'Casey Davis', avatar: '', isOnline: false, lastSeen: '1 day ago' },
  { id: 'bot', name: 'ChatBot', avatar: '', isOnline: true },
];

export const mockMessages: Record<string, Message[]> = {
  '1': [
    { id: '1-1', senderId: '1', content: 'Hey, how are you doing?', timestamp: new Date(Date.now() - 3600000) },
    { id: '1-2', senderId: 'current', content: "I'm good! Working on this chat app", timestamp: new Date(Date.now() - 3500000) },
    { id: '1-3', senderId: '1', content: 'That sounds awesome! Need any help?', timestamp: new Date(Date.now() - 3400000) },
  ],
  '2': [
    { id: '2-1', senderId: 'current', content: 'Did you see the game last night?', timestamp: new Date(Date.now() - 86400000) },
    { id: '2-2', senderId: '2', content: 'Yes! It was incredible', timestamp: new Date(Date.now() - 86300000) },
    { id: '2-3', senderId: '2', content: 'Best game of the season for sure', timestamp: new Date(Date.now() - 86200000) },
  ],
  'bot': [
    { id: 'bot-1', senderId: 'current', content: 'Hi bot!', timestamp: new Date(Date.now() - 60000) },
    { id: 'bot-2', senderId: 'bot', content: 'Hello! How can I assist you today?', timestamp: new Date(Date.now() - 30000) },
  ],
};

export const initialChats: Chat[] = [
  { id: '1', userId: '1', lastMessage: 'That sounds awesome! Need any help?', unread: 0, timestamp: new Date(Date.now() - 3400000) },
  { id: '2', userId: '2', lastMessage: 'Best game of the season for sure', unread: 2, timestamp: new Date(Date.now() - 86200000) },
  { id: '3', userId: '3', lastMessage: "Hey, I saw your project on GitHub", unread: 0, timestamp: new Date(Date.now() - 172800000) },
  { id: 'bot', userId: 'bot', lastMessage: 'Hello! How can I assist you today?', unread: 0, timestamp: new Date(Date.now() - 30000) },
];
