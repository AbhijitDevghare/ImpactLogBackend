// Minimal example: React client with socket.io-client
// Install: npm i socket.io-client axios

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

export default function ChatExample({ token, apiBase }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [chats, setChats] = useState([]);
  const socketRef = useRef();
  const receiverId = 'REPLACE_WITH_OTHER_USER_ID';

  useEffect(() => {
    // Attach token via auth header or cookie
    socketRef.current = io(apiBase, {
      transports: ['websocket'],
      extraHeaders: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    const socket = socketRef.current;
    socket.on('connect', () => console.log('socket connected'));
    socket.on('presence', (p) => console.log('presence', p));
    socket.on('messageSent', ({ message }) => {
      setMessages((prev) => [...prev, message]);
    });
    socket.on('receiveMessage', ({ message }) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.disconnect();
  }, [apiBase, token]);

  const send = () => {
    socketRef.current.emit('sendMessage', { receiverId, text }, (ack) => {
      if (!ack?.ok) console.error('send failed', ack?.error);
    });
    setText('');
  };

  const refreshChats = async () => {
    const res = await axios.get(`${apiBase}/chat/chats`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    setChats(res.data.data);
  };

  return (
    <div>
      <button onClick={refreshChats}>Refresh Chats</button>
      <ul>
        {chats.map((c) => (
          <li key={c.conversationId}>
            {c.counterpartId} - unread: {c.unreadCount}
          </li>
        ))}
      </ul>

      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={send}>Send</button>
      </div>
      <ul>
        {messages.map((m) => (
          <li key={m._id}>
            {m.senderId}: {m.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
