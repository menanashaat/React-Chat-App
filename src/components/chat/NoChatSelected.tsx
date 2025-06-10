// Directory: src/components/chat/NoChatSelected.tsx

import React from 'react';

type Props = {
  isBroadcasting: boolean;
};

const NoChatSelected = ({ isBroadcasting }: Props) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="mx-auto bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mb-6" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No chat selected</h3>
        <p className="text-gray-500 max-w-md">
          {isBroadcasting
            ? "Select multiple users above to start a broadcast"
            : "Select a chat from the list to start messaging"}
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
