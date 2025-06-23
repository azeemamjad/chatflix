import React, { useState } from "react";

const dummyChats = [
  {
    id: 1,
    name: "Movie Buddies",
    lastMessage: "Let's watch Inception tonight!",
    time: "21:15",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    messages: [
      { fromMe: false, text: "Let's watch Inception tonight!", time: "21:15" },
      { fromMe: true, text: "I'm in! 🍿", time: "21:16" },
    ],
  },
  {
    id: 2,
    name: "Azeem",
    lastMessage: "See you at 8pm!",
    time: "20:05",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    messages: [
      { fromMe: false, text: "See you at 8pm!", time: "20:05" },
      { fromMe: true, text: "Sure!", time: "20:06" },
    ],
  },
];

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(dummyChats[0]);
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSelectedChat((prev) => ({
      ...prev,
      messages: [
        ...prev.messages,
        { fromMe: true, text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ],
    }));
    setMessage("");
  };

  return (
    <div className="h-screen w-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white border-r flex flex-col">
        <div className="p-4 flex items-center border-b">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Me"
            className="w-10 h-10 rounded-full mr-3"
          />
          <span className="font-bold text-lg">Chatflix</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {dummyChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 transition ${
                selectedChat.id === chat.id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{chat.name}</span>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <span className="text-sm text-gray-600 truncate block">
                  {chat.lastMessage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="flex items-center px-6 py-4 bg-white border-b">
          <img
            src={selectedChat.avatar}
            alt={selectedChat.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <div className="font-semibold">{selectedChat.name}</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-50">
          <div className="flex flex-col space-y-3">
            {selectedChat.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs ${
                    msg.fromMe
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 border rounded-bl-none"
                  }`}
                >
                  <span>{msg.text}</span>
                  <div className="text-xs text-right text-gray-300 mt-1">
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Message Input */}
        <form
          onSubmit={handleSend}
          className="flex items-center px-6 py-4 bg-white border-t"
        >
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="ml-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chat;