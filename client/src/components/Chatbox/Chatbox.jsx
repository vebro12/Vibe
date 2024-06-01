import React, { useEffect, useRef, useState } from "react";
import "./Chatbox.css";
import { getUser } from "../../api/UserRequest";
import { addMessage, getMessages } from "../../api/MessageRequest.js";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const Chatbox = ({ chat, currentUser,setSendMessage , receivedMessage }) => {
  const serverPublic = "http://localhost:5000/images/";
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll = useRef();

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };


  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);



  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);


 


 
const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  }

  try {
    const { data } = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
  const receiverId = chat.members.find((id)=>id!==currentUser);
  setSendMessage({...message, receiverId})
}


useEffect(()=>{
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])
// always scroll to last page 

useEffect(()=> {
  scroll.current?.scrollIntoView({ behavior: "smooth" });
},[messages])





  return (
    <>
      <div className="ChatBox-container">
      {chat ? (  <>
          {/* chat-header */}
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? serverPublic + userData.profilePicture
                      : serverPublic + "img3.png"
                  }
                  alt=""
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.8rem" }}>
                  <span>
                    {userData?.firstname} {userData?.lastname}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          {/* chat-message */}
          <div className="chat-body">
            {messages.map((message) => (
              <>
                <div ref= {scroll} 
                  className={
                    message.senderId === currentUser ? "message own" : "message"
                  }
                >
                  <span>{message.text}</span>{" "}
                  <span>{format(message.createdAt)}</span>
                </div>
              </>
            ))}
          </div>
          {/* {chat-sender} */}
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} 
           
            />
            <div className="send-button button" onClick = {handleSend}  style={{cursor:'pointer'}}> Send </div>
          </div>
        </>
          ) :(
            <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
            </span>
          )}
      
      </div>
    </>
  );
};

export default Chatbox;
