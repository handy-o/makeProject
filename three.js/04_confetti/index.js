import Particle from "./js/Particle.js";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth
let canvasHeight = innerHeight
const interval = 1000 / 60  // 60fps


// 빈 배열 초기화
const particles = [];


function init(){
    // 브라우저크기
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    canvas.style.width = canvasWidth + 'px' 
    canvas.style.height = canvasHeight + 'px'
    // 캔버스 고유 사이즈값
    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr
    // 기기에 따라 선명하게 2만 되어도 선명함 (위에 최대 2로 고정)
    ctx.scale(dpr, dpr)

    // 콘페티들 화면 중앙에 표시
    // 로드 후가 아닌 click 후로 변경하기 위해 위치 변경
    // confetti({
    //     x: canvasWidth / 2,
    //     y: canvasHeight / 2,
    //     count: 10
    // })
}

function confetti({x, y, count, deg, colors}) {
    for (let i=0; i< count ; i++) {
        particles.push(new Particle(x, y, deg, colors))
    }
}

function render() {
    let now, delta;
    let then = Date.now(); // 현재시간

    const frame = () => {
        requestAnimationFrame(frame) // 재귀적으로 스스로 실행 - 144hz에는 1초에 144번, 60hz는 1초에 60번 실행 
        now = Date.now();
        if(delta < interval) return;
        ctx.clearRect(0,0, canvasWidth, canvasHeight)
        
        // 배열 업데이트와 그리기 - 지워주는 것까지 고려해서 for문 거꾸로 돌기
        for(let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            
            // 보이지 않을 때 렌더링 제거
            if(particles[i].opacity < 0) particles.splice(i, 1)
        }
        // console.log(particles.length)
        // delta = now - then;

        then = now - (delta % interval)

        
    }
    // trigger
    requestAnimationFrame(frame)
}

// 클릭했을 때 confetti 실행되도록 변경
window.addEventListener('click', () => {
    confetti({
        x: 0.2, // x:canvasWidth / 2 이면 중앙 실행
        y: 0.5, // index.js에서 this.x와 this.y에 inner값 곱하는 것으로 변경
        count: 20,
        deg: -50,
        //colors: ['#ff0000']
    })
})

window.addEventListener('reesize', init)
window.addEventListener('load', () => {
    init();
    render();
})

// canvas-confetti 인기 라이브러리 