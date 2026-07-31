const Chat = require("../Models/chat"); // 모델사용
const chatController = {};

                        // 메세지랑 유저정보를 받았어요
chatController.saveChat = async(message, user)=> {
    const newMessage = new Chat({ // new Chat은 모델이져
        chat: message,
        user: {
            id:user._id,
            name:user.name
        }
    })
    await newMessage.save();
    return newMessage;   
}

module.exports = chatController

// 유저정보를 알 수 잇는 경우는?
// socket.io를 통해 알 수 있다. 어떻게?
// 유저정보 토큰값으로 socket id 값을 같이 저장하고 있다! 
// 어디서? utils > io.js > const user = await userController.saveUser(userName, socket.id)