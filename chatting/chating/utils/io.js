// 통신관련 함수
const chatController = require("../Controllers/chat.controller");
const userController = require("../Controllers/user.controller");

module.exports = function(io) { // index.js에서 io(매개변수)를 보낸다 -> index.js
    // io ~~ 근데 어디서 받아오나요.. 매개변수로 받아옵니다

    // 말하는 함수 .emit()
    // 듣는함수 .on()

    // 연결을 들을게요, 연결된사람(socket매개변수)이 있다면, id값 콘솔찍어줘
    io.on("connection", async(socket)=> {   
        console.log("client is connected", socket.id);

        socket.on("login", async (userName, callback) => {
            console.log("backend", userName)
            // 유저정보를 저장
            try {
                const user = await userController.saveUser(userName, socket.id)
                const welcomeMessage = {
                    chat: `${user.name} is joined to this room`,
                    user: { id:null, name: "system" }
                }
                io.emit("message", welcomeMessage);
                callback({ok: true, data:user})
            } catch(error) {
                callback({ok: false, error:error.message})
            }
        })

        // 메세지를 받으면 할 일(프론트ㅡ App.js const sendMessage = (event) 대응)
        socket.on("sendMessage", async (message, callback) => {
            try {
            // socket id로 유저찾기 (userController)
            const user = await userController.checkUser(socket.id);
            // 메세지 저장
            const newMessage = await chatController.saveChat(message, user);
           
            
            //              A클라이언트
            // 백엔드서버 
            //              B클라이언트
            // 백엔드랑-A만 연결하면 B는 모름
            // B 또는 나머지 사람들한테 A가 말한걸 모두 알려줘야함
            // 그래서 단순히 콜백함수 ( callback({ok: true, data:newMessage}) )는 소용이 없음
            // 서버가 말해줘야함
            io.emit("message", newMessage)
            callback({ok:true})

            } catch(error) {
                callback({ok: false, error:error.message})
            }

        })

        socket.on("disconnect", () => {
            console.log("User is disconnected")
        })
    })
}