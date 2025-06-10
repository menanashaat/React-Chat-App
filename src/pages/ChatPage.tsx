// Directory: src/pages/ChatPage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { User, Message, Chat } from '../types';
import ChatHeader from '../components/chat/ChatHeader';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import NoChatSelected from '../components/chat/NoChatSelected';

import { mockUsers, mockMessages, initialChats } from '../mock/chatData';

const ChatPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [chats] = useState<Chat[]>(initialChats);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeChat && mockMessages[activeChat]) {
      setMessages(mockMessages[activeChat]);
    } else {
      setMessages([]);
    }
    setIsBroadcasting(false);
    setSelectedUsers([]);
  }, [activeChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if ((!newMessage.trim() && !attachedFile) || !activeChat) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'current',
      content: newMessage,
      timestamp: new Date(),
      isBroadcast: isBroadcasting && selectedUsers.length > 0,
    };

    if (attachedFile) {
      setIsUploading(true);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            const mediaMsg: Message = {
              ...newMsg,
              content: '',
              media: {
                url: URL.createObjectURL(attachedFile),
                type: attachedFile.type.startsWith('image') ? 'image' : 'video',
              }
            };
            setMessages(prev => [...prev, mediaMsg]);
            setNewMessage('');
            setAttachedFile(null);
            return 0;
          }
          return newProgress;
        });
      }, 200);
    } else {
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      if (activeChat === 'bot') {
        setTimeout(() => {
          const botResponse: Message = {
            id: `bot-${Date.now()}`,
            senderId: 'bot',
            content: getBotResponse(newMessage),
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, botResponse]);
        }, 1000 + Math.random() * 2000);
      }
    }
  };

  const getBotResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) return 'Hello there! How can I help you?';
    if (lowerMsg.includes('how are you')) return "I'm just a bot, but I'm functioning well!";
    if (lowerMsg.includes('thank')) return "You're welcome!";
    if (lowerMsg.includes('help')) return "I can answer simple questions. Try asking about the weather or time!";
    if (lowerMsg.includes('time')) return `The current time is ${new Date().toLocaleTimeString()}`;
    if (lowerMsg.includes('weather')) return "I'm a chat bot, not a weather service! But I hope it's nice where you are.";
    const responses = [
      "That's interesting!",
      "I'm not sure I understand. Could you rephrase?",
      "Thanks for sharing!",
      "I'm still learning. Can you tell me more?",
      "That sounds exciting!",
      "How does that make you feel?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => prev.includes(userId)
      ? prev.filter(id => id !== userId)
      : [...prev, userId]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ChatHeader 
        isBroadcasting={isBroadcasting} 
        onToggleBroadcast={() => setIsBroadcasting(!isBroadcasting)} 
        onLogout={handleLogout} 
      />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar 
          chats={chats} 
          activeChat={activeChat} 
          setActiveChat={setActiveChat} 
          getUserById={(id: string) => mockUsers.find(u => u.id === id)} 
        />
        {activeChat ? (
          <ChatWindow
            activeChat={activeChat}
            messages={messages}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            attachedFile={attachedFile}
            setAttachedFile={setAttachedFile}
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            onSendMessage={handleSendMessage}
            fileInputRef={fileInputRef}
            messagesEndRef={messagesEndRef}
            isBroadcasting={isBroadcasting}
            selectedUsers={selectedUsers}
            toggleUserSelection={toggleUserSelection}
            getUserById={(id: string) => mockUsers.find(u => u.id === id)}
          />
        ) : (
          <NoChatSelected isBroadcasting={isBroadcasting} />
        )}
      </div>
    </div>
  );
};

export default ChatPage;
