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


            this.backgrounds.forEach(background => {
                background.update()
                background.draw()
            })
            this.walls.forEach(wall => {
                wall.update()
                wall.draw()
            })

            then = now - (delta % App.interval)
        }
        requestAnimationFrame(frame)
    }
}