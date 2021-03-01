import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import APIURL from "../../../helpers/environment/apirouter";

export default (conversation, receieveMessage) => {
    const socketRef = useRef();
    let roomId = conversation ? conversation.id : ''

    useEffect(() => {
      // Creates a WebSocket connection
      socketRef.current = socketIOClient(APIURL, {
        query: { roomId },
      });
      
      // Listens for incoming messages
      socketRef.current.on("NEW_MESSAGE", (newMessage) => {
        console.log("usechat, message receieved", newMessage)
        // setMessage(newMessage);
        receieveMessage(newMessage, conversation)
      });

      // Listens for incoming messages
      socketRef.current.on("MESSAGE_EDITED", (editedMessage) => {
        console.log("usechat, message edited", editedMessage)
        modifyMessage(editedMessage, conversation)
      });
      
      // Destroys the socket reference
      // when the connection is closed
      return () => {
        socketRef.current.disconnect();
      };
    }, [roomId]);
  
    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (message) => {
        console.log("usechat message sent", message)
        socketRef.current.emit("NEW_MESSAGE", {
            message
        });
    };

    const modifyMessage = (message) => {
      console.log("usechat message edited", message)
      socketRef.current.emit("MESSAGE_EDITED", {
          message
      });
  };
  
    //  return functions and message (DONE: send message, | TODO: editMessage, deleteMessage)
    return { sendMessage, modifyMessage };
}