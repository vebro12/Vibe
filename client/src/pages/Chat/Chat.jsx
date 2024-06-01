import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { useSelector } from 'react-redux';
import { userChats } from "../../api/ChatRequest.js";
import Conversation from "../../components/Conversation/Conversation.jsx";
import NavIcons from "../../components/NavIcons/NavIcons.jsx";
import Chatbox from "../../components/Chatbox/Chatbox.jsx";
import { io } from 'socket.io-client';

const Chat = () => {

  const { user } = useSelector((state) => state.authReducer.authData);
  const [currentChat, setCurrentChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [receiverId, setReceiverId] = useState(""); 
  const socket = useRef();

  // get the chat
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);

      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  //connect to socket io
  useEffect(() => {
    socket.current = io('http://localhost:8800');
    socket.current.emit("new-user-add", user._id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);

    });
  }, [user]);

  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // receive message from socket server
  useEffect(() => {
    socket.current.on('receive-message', (data) => {
      console.log("Data received in parent Chat.jsx", data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  const handleStartChat = async (e) => {
    e.preventDefault();
    if (!receiverId.trim()) {
      alert('Please enter a valid receiver ID.');
      return;
    }
    try {
      const existingChat = chats.find(chat => chat.members.includes(receiverId));
      if (existingChat) {
        setCurrentChat(existingChat);
      } else {
        const response = await fetch('http://localhost:5000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            senderId: user._id,
            receiverId: receiverId,
          }),
        });
        const data = await response.json();
        setCurrentChat(data);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to start chat. Please try again.');
    }
  };
  
  
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
        <form onSubmit={handleStartChat} className="chat-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter receiver's ID"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="submit-button">Start Chat</button>
        </div>
      </form>
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => {
                setCurrentChat(chat);
              }}>
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} onClick={() => setCurrentChat(chat)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="Right-side-chat">
       
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <Chatbox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
