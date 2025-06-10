import React from 'react';
import { Chat, User } from '../../types';

type Props = {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (id: string) => void;
  getUserById: (id: string) => User | undefined;
};

const ChatSidebar = ({ chats, activeChat, setActiveChat, getUserById }: Props) => {
  return (
    <>
      {/* Full sidebar on desktop */}
      <div className="hidden md:flex w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Chats</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => {
            const user = getUserById(chat.userId);
            if (!user) return null;

            return (
              <div
                key={chat.id}
                className={`p-4 flex items-center border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  activeChat === chat.userId ? 'bg-indigo-50 dark:bg-gray-600' : ''
                }`}
                onClick={() => setActiveChat(chat.userId)}
              >
                <div className="relative">
                  <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-xl w-12 h-12" />
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">{user.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="ml-2 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Avatar-only sidebar on mobile */}
      <div className="flex md:hidden flex-col items-center w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 py-4">
        {chats.map(chat => {
          const user = getUserById(chat.userId);
          if (!user) return null;

          return (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.userId)}
              className="mb-4 cursor-pointer"
            >
              <div className="relative">
                <div className="bg-gray-200 dark:bg-gray-600 border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-xl w-12 h-12 ml-3 md:ml-0 mr-2 md:mr-0" />
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};



export default ChatSidebar; 