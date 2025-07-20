import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, isTyping, timestamp }) => {
  if (isTyping) {
    return (
      <div className="flex justify-start mb-2">
        <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl max-w-[75%] animate-pulse">
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-bounce"></span>
          <span className="inline-block w-2 h-2 bg-white rounded-full mr-1 animate-bounce delay-150"></span>
          <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    );
  }
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`px-4 py-3 rounded-2xl max-w-[75%] ${isUser ? 'bg-[#181818]' : 'bg-[#181818]'} text-white`}>
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;