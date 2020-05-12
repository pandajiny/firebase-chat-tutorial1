import React, { useState, useEffect } from "react";
import { firebaseAuth } from "../services/firebase";
import { firebaseDb } from "../services/firebase";

function Chat() {
  // component state
  const [user, setUser] = useState(firebaseAuth().currentUser);
  const [needLoad, setNeedLoad] = useState(false);
  const [chats, setChat] = useState([]);
  const [content, setContent] = useState("");
  const [readError, setReadError] = useState(null);
  const [writeEror, setWriteError] = useState(null);
  // useEffect(()=>{
  //   setUs
  // })
  const getFromDb = async () => {
    try {
      firebaseDb.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        setChat(chats);
      });
    } catch (error) {
      setReadError(error.message);
    }
  };

  useEffect(() => {
    console.log("chat's userEffect");
    setNeedLoad(false);
    getFromDb();
  }, [needLoad]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setWriteError(null);
    console.log("CHAT!");
    try {
      await firebaseDb.ref("chats").push({
        content: content,
        timestamp: Date.now(),
        uid: user.uid,
      });
      setContent("");
      setNeedLoad(true);
    } catch (error) {
      setWriteError(error.message);
    }
  };
  return (
    <div>
      <div>
        <div className="chats">
          {chats.map((chat) => {
            return <p key={chat.timestamp}>{chat.content}</p>;
          })}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            onChange={(e) => setContent(e.target.value)}
            value={content}
          ></input>
          {/* {this.state.error ? <p>{this.state.writeError}</p> : null} */}
          <button type="submit">Send</button>
        </form>
        <div>
          Login in as: <strong>{user.email}</strong>
        </div>
      </div>
    </div>
  );
}

export default Chat;
