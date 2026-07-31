import { useEffect } from "react";
import "./App.css";
import socket from "./server"
import { useState } from "react";
import InputField from "./components/InputField/InputField";
import MessageContainer from "./components/MessageContainer/MessageContainer";

function App() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]); // 전체 메세지 저장
  //console.log("message LIst", messageList)

  // 실행되자마자 프롬프트로 물어바야함
  useEffect(() => {
    socket.on('message', (message) => {
      console.log("res", message);
      setMessageList((prevState) => prevState.concat(message))
    })
    askUserName();
  }, [])
  const askUserName = () => {
    const userName = prompt("당신의 이름을 입력하세요");
    console.log("uuu", userName);

    // emit이 잘 처리되면 받는 콜백함수까지 추가
    socket.emit("login", userName, (res) => {
      console.log("Res", res)
      if(res?.ok) {
        setUser(res.data)
      }
    })
  }

  // 버튼 클릭 시 onSubmit 실행함수
  const sendMessage = (event) => { 
    event.preventDefault(); // refresh 막기
    socket.emit("sendMessage", message, (res) => { // 말했으니 backend가서 on 설정
      console.log("SendMessage res", res)
    });
  };

  return (
    <div>
      <div className="App">
        <MessageContainer messageList={messageList} user={user} />
        <InputField message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  );
}

export default App;
