import App from "./App.js"
import { randomNumBetween } from "./utils.js"

/* 추가 할일 
1. 벽을 위 아래 위치하여 사이에 간격 랜덤으로 주기 gapY
2. 오른쪽에서 생성 시켜서 왼쪽으로 이동시키기
3. 완전히 맵 밖으로 나간 벽은 배열에서 제거 
*/

export default class Wall {
    constructor(config) {
        this.img = document.querySelector('#wallImg')
        this.type = config.type // big 또는 small 
        switch(this.type) {
            case 'BIG' :
                this.sizeX = 18 / 30 //(영역칸수 / 전체칸수)
                this.sx = this.img.width * (9 /30) // (시작칸수 / 전체칸수)
                break
            case 'SMALL' : 
                this.sizeX = 9 / 30 // (영역칸수 / 전체칸수)
                this.sx = this.img.width * (0 /30) // (시작칸수 / 전체칸수)
                break
        }
        this.width = App.height * this.sizeX // 정사각형 이미지 파일 기준으로 this.sizeX의 비율만큼만 보여주기
        this.height = App.height

        this.gapY = randomNumBetween(App.height * 0.2, App.height * 0.35) // 숫자가 낮을수록 어려워짐
        this.x = App.width // 오른쪽 끝
        // 최소 -this.height
        // 최대 App.height - this.gapY - this.height
        this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY -30) // 풀 조금씩 보이게 30씩 여백 
        this.y2 = this.y1 + this.height + this.gapY
        
        this.generatedNext = false
        this.gapNextX = App.width * randomNumBetween(0.6, 0.75)
    }
    get isOutside() {
        return this.x + this.width < 0
    }
    get canGenerateNext() {
        return (
            !this.generatedNext &&
            this.x + this.width < this.gapNextX
        )
    }
    update() {
        this.x += -10
    }
    draw(){
        App.ctx.drawImage(
            this.img,
            // 잘라서 보여줄 시작점+크기 sx, sy, sw, sh
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            this.x, this.y1 , this.width, this.height
        )
        App.ctx.drawImage(
            this.img,
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            this.x, this.y2 , this.width, this.height
        )
    }
    
}