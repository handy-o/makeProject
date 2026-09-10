import { hexToRgb, randomNumBetween } from "./utils.js";

export default class Particle {
    constructor(x,y, deg = 0, colors, shapes, spread = 30) {
        // 퍼지는 각도 또한 변수
        // this.angle = Math.PI / 180 * randomNumBetween(0, 360)
        this.angle = Math.PI / 180 * randomNumBetween(deg - spread, deg + spread)
        
        // 퍼지는 힘의 크기
        // this.r = 3
        this.r = randomNumBetween(20, 80);
        this.x = x * innerWidth;
        this.y = y * innerHeight;

        this.vx = this.r * Math.cos(this.angle)
        this.vy = this.r * Math.sin(this.angle)

        // gravity와 friction 적용
        this.friction = 0.89;
        this.gravity = 0.5;

        this.width = 16;
        this.height = 16;

        this.opacity = 1

        // delta를 random으로
        this.widthDelta = randomNumBetween(0, 360)
        this.heightDelta = randomNumBetween(0, 360)
        
        this.rotation = randomNumBetween(0, 360)
        this.rotationDelta = randomNumBetween(-1, 10) // 시계방향-반시계방향
        this.colors = colors || ['#ff577f', '#6596ff', '#baff92', '#fff9b0']
        this.color = hexToRgb(
            // 컬러 배열에 있는 색상 하나 랜덤 선택
            this.colors[Math.floor(randomNumBetween(0, this.colors.length))]
        )

        this.shapes = shapes || ['square', 'circle']
        this.shape = this.shapes[
            Math.floor(randomNumBetween(0, this.shapes.length))
        ]
    }
    update(){
        this.vy += this.gravity;

        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;

        this.opacity -= 0.005;

        this.widthDelta += 2
        this.heightDelta += 2

        this.rotation += this.rotationDelta
    }

    drawSquare(ctx) {
        ctx.fillRect(
            this.x, 
            this.y, 
            this.width * Math.cos(Math.PI / 180 * this.widthDelta), 
            this.height * Math.sin(Math.PI / 180 * this.heightDelta)
        )
    }
    drawCircle(ctx) {
        ctx.beginPath()
        // ellipse(x시작점, y시작점, 반지름X(양수), 반지르Y(양수), 시계방향회전각도, 시작각도, 끝나는각도)
        ctx.ellipse(
            this.x, 
            this.y, 
            Math.abs(this.width * Math.cos(Math.PI / 180 * this.widthDelta)) / 2, 
            Math.abs(this.height * Math.sin(Math.PI / 180 * this.heightDelta)) / 2,
            0,
            0,
            Math.PI * 2
        ) // 반지름 2개로 타원 그림
        ctx.fill()
        ctx.closePath()
    }
    draw(ctx) {
        /* 공통요소 */
        // 자연스러운 회전 추가
        ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2) //더 크게 빙글거리게 하려면 값 키우기
        ctx.rotate(Math.PI / 180 * this.rotation)
        // 원위치
        ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2)
        ctx.fillStyle = `rgba(${this.color.r},${this.color.g},${this.color.b},${this.opacity})`;
        /* ./공통요소 */

        switch(this.shape) {
            case 'square': this.drawSquare(ctx); break
            case 'circle': this.drawCircle(ctx); break
        }

       

        ctx.resetTransform()
    }
}