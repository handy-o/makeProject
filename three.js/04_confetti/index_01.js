const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio > 1 ? 2 : 1;
const canvasWidth = innerWidth
const canvasHeight = innerHeight
const interval = 1000 / 60  // 60fps

function init(){
    // resize시 실행 => width, height 업데이트
    // 브라우저크기
    canvasWidth = innerWidth 
    canvasHeight = innerHeight
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

    const frame = () => {
        requestAnimationFrame(frame) // 재귀적으로 스스로 실행 - 144hz에는 1초에 144번, 60hz는 1초에 60번 실행 
        // 1초 60번씩 '동일하게' 실행되도록
        now = Date.now();
        delta = now - then;
        if(delta < interval) return;


        // 내용-----
        ctx.fillStyle = 'red'
        ctx.fillRect(200, 200, 50, 50)
        // -----내용


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