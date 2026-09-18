import Background from "./Background.js";
import Wall from "./Wall.js";

export default class App {
    // 고정 상수 class명과 static 변수명
    static canvas = document.querySelector('canvas')
    static ctx = App.canvas.getContext('2d')
    static dpr = devicePixelRatio > 1 ? 2 : 1
    static interval = 1000 / 60
    static width = 1024
    static height = 768


    constructor() {
        this.backgrounds = [
            new Background({img:document.querySelector('#bg3Img') , speed: -1}),
            new Background({img:document.querySelector('#bg1Img') , speed: -2}),
            new Background({img:document.querySelector('#bg2Img') , speed: -3})
        ];
        this.walls = [new Wall({type: 'SMALL'})]
        window.addEventListener('resize', this.resize.bind(this))
        // bind(this)한 이유
        // window로 호출하기 때문에 this=window가 됨
        // 때문에 bind로 바인딩 해주어야 현재 부모인 App이 된다.
    }

    resize() {
        //canvas 자체 width, height (최대 2배크기까지)
        App.canvas.width = App.width * App.dpr
        App.canvas.height = App.height* App.dpr
        App.ctx.scale(App.dpr, App.dpr) // 4:3

        // 가로세로 반응형
        const width = innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9
        App.canvas.style.width = width + 'px'
        App.canvas.style.height = width * (3 / 4) + 'px'


    }

    render() {
        let now, delta;
        let then = Date.now()
        const frame = () => {
            requestAnimationFrame(frame)
            now = Date.now()
            delta = now - then
            if(delta < App.interval) return

            App.ctx.clearRect(0,0, App.width, App.height)
            //App.ctx.fillRect(50, 50, 100, 100)


            // 배경 ----------------------------------
            this.backgrounds.forEach(background => {
                background.update()
                background.draw()
            })


            // 벽 ----------------------------------
            // forEach 시 삭제하면 다음 인스턴스들의 순서에 영향이 생길 수 있어
            // for문을 사용하여 역순으로 돌 수 있게 수정
            // this.walls.forEach((wall, i) => {
            //     wall.update()
            //     wall.draw()
                
            //     // console.log(wall.isOutside)
            //     if(wall.isOutside) this.walls.splice(i, 1)
            // })

            for(let i = this.walls.length - 1; i >= 0; i--) {
                this.walls[i].update()
                this.walls[i].draw()
                

                // 벽 제거
                // console.log(this.walls[i].isOutside)
                if(this.walls[i].isOutside) {
                    this.walls.splice(i, 1)
                    // 제거가 된 인덱스에서는 아래 생성코드가 실행되지 않도록 continue
                    continue
                }
                
                // 벽 생성
                if(this.walls[i].canGenerateNext) {
                    this.walls[i].generatedNext = true
                    this.walls.push(new Wall({type: Math.random() > 0.3 ? 'SMALL' : 'BIG'}))
                }
            }
            //console.log(this.walls.length)

            then = now - (delta % App.interval)
        }
        requestAnimationFrame(frame)
    }
}