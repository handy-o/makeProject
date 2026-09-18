import App from "./App.js"

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
    }
    update() {

    }
    draw(){
        App.ctx.drawImage(
            this.img,
            // 잘라서 보여줄 시작점+크기 sx, sy, sw, sh
            this.sx, 0, this.img.width * this.sizeX, this.img.height,
            0,0 , this.width, this.height
        )
    }
    
}