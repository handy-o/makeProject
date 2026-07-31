const {createServer} = require("http"); // http로 서버 생성
const app = require("./app");           // 아까만든 앱 가져오기
const {Server} = require("socket.io");  // 서버를 만들건데, 소켓들고올거임

require("dotenv").config(); //process.env.PROT 쓸거니 필요

const httpServer = createServer(app)    // httpServer만들건데, app 올릴거임
const io = new Server(httpServer, {     // io = 웹소켓 별명, 서버만들건데, httpSever올릴거임
    cors: {
        origin: "http://localhost:3000" // 아무나 들어올건 아니고, 프론트엔드주소 들어와
    }
})

require("./utils/io")(io);  // 통신할 코드에 io를 매개변수로 넘겨줌

// 만들어놨으니 열여놓겠음
httpServer.listen(process.env.PORT, () => {
    console.log("server listening on port", process.env.PORT);
})