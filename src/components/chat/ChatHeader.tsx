
import React from 'react';

type ChatHeaderProps = {
  isBroadcasting: boolean;
  onToggleBroadcast: () => void;
  onLogout: () => void;
};

const ChatHeader = ({ isBroadcasting, onToggleBroadcast, onLogout }: ChatHeaderProps) => {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
          <h1 className="ml-3 text-xl font-bold">React Chat</h1>
        </div>
        <div className="flex items-center">
          <button
            onClick={onToggleBroadcast}
            className={`mr-4 px-4 py-2 rounded-lg font-medium ${
              isBroadcasting
                ? 'bg-white text-indigo-600'
                : 'bg-indigo-700 text-white hover:bg-indigo-800'
            }`}
          >
            {isBroadcasting ? 'Cancel Broadcast' : 'Broadcast'}
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;