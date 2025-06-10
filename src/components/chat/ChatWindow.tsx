// Directory: src/components/chat/ChatWindow.tsx

import React, { RefObject } from "react";
import { Message, User } from "../../types";

type Props = {
  activeChat: string;
  messages: Message[];
  newMessage: string;
  setNewMessage: (msg: string) => void;
  attachedFile: File | null;
  setAttachedFile: (file: File | null) => void;
  isUploading: boolean;
  uploadProgress: number;
  onSendMessage: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>; // <-- Allow null
  messagesEndRef: RefObject<HTMLDivElement | null>; // <-- Allow null
  isBroadcasting: boolean;
  selectedUsers: string[];
  toggleUserSelection: (id: string) => void;
  getUserById: (id: string) => User | undefined;
};

const ChatWindow = ({
  activeChat,
  messages,
  newMessage,
  setNewMessage,
  attachedFile,
  setAttachedFile,
  isUploading,
  uploadProgress,
  onSendMessage,
  fileInputRef,
  messagesEndRef,
  isBroadcasting,
  selectedUsers,
  toggleUserSelection,
  getUserById,
}: Props) => {
  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center">
        {isBroadcasting ? (
          <div className="flex items-center w-full">
            <span className="text-indigo-600 font-medium mr-2">
              Broadcast to:
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedUsers.map((userId) => {
                const user = getUserById(userId);
                return user ? (
                  <span
                    key={userId}
                    className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {user.name}
                    <button
                      onClick={() => toggleUserSelection(userId)}
                      className="ml-1 text-indigo-600 hover:text-indigo-800"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        ) : (
          <>
            <div className="relative">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
              {getUserById(activeChat)?.isOnline && (
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-3">
              <h3 className="font-medium text-gray-900">
                {getUserById(activeChat)?.name}
              </h3>
              {getUserById(activeChat)?.isOnline ? (
                <p className="text-xs text-green-500">Online</p>
              ) : (
                <p className="text-xs text-gray-500">
                  Last seen {getUserById(activeChat)?.lastSeen || "recently"}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => {
          const isCurrentUser = message.senderId === "current";
          return (
            <div
              key={message.id}
              className={`flex mb-4 ${
                isCurrentUser ? "justify-end" : "justify-start"
              }`}
            >
              {!isCurrentUser && (
                <div className="mr-2">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                </div>
              )}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 ${
                  isCurrentUser
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                }`}
              >
                {message.isBroadcast && (
                  <div className="text-xs mb-1 flex items-center">
                    <span className="mr-1">📢</span>
                    <span
                      className={
                        isCurrentUser ? "text-indigo-200" : "text-gray-500"
                      }
                    >
                      Broadcast
                    </span>
                  </div>
                )}

                {message.media ? (
                  <div className="mb-1">
                    {message.media.type === "image" ? (
                      <img
                        src={message.media.url}
                        alt="Attachment"
                        className="max-w-full h-auto rounded"
                      />
                    ) : (
                      <video
                        src={message.media.url}
                        controls
                        className="max-w-full h-auto rounded"
                      />
                    )}
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}

                <div
                  className={`text-xs mt-1 ${
                    isCurrentUser ? "text-indigo-200" : "text-gray-500"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        {attachedFile && (
          <div className="mb-3 flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 mr-2" />
              <div>
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                  {attachedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {attachedFile.type} • {(attachedFile.size / 1024).toFixed(1)}
                  KB
                </p>
              </div>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => setAttachedFile(null)}
            >
              ×
            </button>
          </div>
        )}

        {isUploading && (
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Uploading {uploadProgress}%
            </p>
          </div>
        )}

        <div className="flex">
          <button
            className="p-2 text-gray-500 hover:text-indigo-600"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) =>
                e.target.files && setAttachedFile(e.target.files[0])
              }
              accept="image/*,video/*"
            />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={
              isBroadcasting
                ? "Type a broadcast message..."
                : "Type a message..."
            }
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
          />
          <button
            onClick={onSendMessage}
            disabled={(!newMessage.trim() && !attachedFile) || isUploading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-r-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
