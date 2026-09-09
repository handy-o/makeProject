const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
let canvasWidth = innerWidth
let canvasHeight = innerHeight
const interval = 1000 / 60  // 60fps

function init(){
    // resize시 실행 => width, height 업데이트
    // 브라우저크기
    canvasWidth = innerWidth;
    canvasHeight = innerHeight;
    // 캔버스에 적용
    canvas.style.width = canvasWidth + 'px' 
    canvas.style.height = canvasHeight + 'px'
    // 캔버스 고유 사이즈값
    canvas.width = canvasWidth * dpr
    canvas.height = canvasHeight * dpr
    // 기기에 따라 선명하게 2만 되어도 선명함 (위에 최대 2로 고정)
    ctx.scale(dpr, dpr)
}

function render() {
    let now, delta;
    let then = Date.now(); // 현재시간

    // 화면 중앙
    const x = innerWidth / 2
    let y = innerHeight / 2
    let widthAlpa = 0;
    const width = 50;
    const height = 50;
    let deg = 0.1; // rotate 값 초기화 후 0.1씩 더함

    const frame = () => {
        requestAnimationFrame(frame) // 재귀적으로 스스로 실행 - 144hz에는 1초에 144번, 60hz는 1초에 60번 실행 
        // 1초 60번씩 '동일하게' 실행되도록
        now = Date.now();
        delta = now - then;
        if(delta < interval) return;
        ctx.clearRect(0,0, canvasWidth, canvasHeight)

        widthAlpa += 0.1;
        deg += 0.1
        y += 1;
        
        // ctx.translate(x,y);
        ctx.translate(x + width, y + height);
        // ctx.rotate(0.1); // 0,0 축 기준으로 회전 (누적->리셋하려면 다 그린 후)
        ctx.rotate(deg); // 0,0 축 기준으로 회전 (누적->리셋하려면 다 그린 후)
        ctx.translate(-x - width, -y - height); // 원위치

        // 내용-----
        ctx.fillStyle = 'red'
        // 바람에 원 궤적으로 팔랑 거리는 모습 (width랑 -width 사이 팔랑팔랑)
        ctx.fillRect(x, y, width * Math.cos(widthAlpa), height * Math.sin(widthAlpa))
         
        // -----내용

        // rotate 누적 리셋
        ctx.resetTransform();

        then = now - (delta % interval); // 1초 60번씩 '동일하게' 실행되도록
    }
    // trigger
    requestAnimationFrame(frame)
}

window.addEventListener('reesize', init)
window.addEventListener('load', () => {
    init();
    render();
})

// canvas-confetti 인기 라이브러리 