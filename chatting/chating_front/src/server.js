import {io} from "socket.io-client"     // io를 들고올것이다
const socket = io("http://localhost:5001") // io(백엔드 주소)로 연결할 수 있는 소켓을 만들겠다.
export default socket; // 쓸 수 있게 익스폴트해주겠다. 원하는데에서 사용!