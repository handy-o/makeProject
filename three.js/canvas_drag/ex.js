const ctx = document.getElementById("canvas").getContext("2d");


// addText();
// drawRect();
// 도형넣기
function drawRect() {
    ctx.fillStyle = '#8B639B'
    ctx.fillRect(20, 20, 50, 50)
}

// 텍스트 넣기1
// ctx.font = "30px NotoKR";
// ctx.fillText('FRONT DEVELOP', 10, 50);

// 텍스트 넣기2
function addText() {
    ctx.font = "30px NotoKR";
    ctx.fillStyle = "#AF719D";
    ctx.fillText('FRONT DEVELOPER', 10, 50);
    ctx.strokeStyle = '#403D88'
    ctx.strokeText('FRONT DEVELOP', 10, 50);
    console.log(ctx.measureText("FRONT DEVELOP"));
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.direction = "rtl";
}

// 이미지 넣기
const addImage = function(file){
    const image = new Image; // 1. 빈 이미지 객체 생성
    image.onload = function(){ // 2. 로드 끝나면 아래 실행 콜백 등록
        ctx.drawImage(image, 20, 20, 150, 100); // drawImage(image, sx, sy, ex, ey, x, y, dWidth, dHeight);
    }
    image.src = URL.createObjectURL(file);  // 3. 실제로 로딩을 시작시킴
}
const file = document.getElementById("imageTest");
file.addEventListener("change", function(e){
    e.preventDefault();
    console.dir('e.target', e.target)
    addImage(e.target.files[0]);
});


/*
- 1번 시점: new Image()는 빈 <img> 엘리먼트(객체)만 만드는 거예요. 아직 어떤 이미지 데이터도 없어요.
- 2번 시점: image.onload = function(){...}은 "이미지 로딩이 끝나면 실행할 함수"를 등록만 하는 거지, 이 시점에 실행되는 게 아니에요. 
           image가 아직 텅 비어있어도 상관없어요 — 콜백 함수 안에서는 image를 지금 당장 쓰는 게 아니라 "나중에 쓸 예정"이니까요.
- 3번 시점: image.src = URL.createObjectURL(file)을 실행하면 브라우저가 그 시점부터 비동기로 이미지를 디코딩하기 시작합니다. 
            이게 파라미터 file이 쓰이는 유일한 곳이 맞아요, 말씀하신 대로.
- 브라우저가 이미지 로딩(디코딩)을 다 끝내면 load 이벤트가 발생하고, 그제서야 2번에서 등록해둔 콜백이 실행돼요. 
  이 시점엔 image가 이미 실제 픽셀 데이터를 가진 상태라서 ctx.drawImage(image, ...)가 제대로 그릴 수 있는 거고요.

핵심은 **클로저(closure)**예요. 
콜백 함수는 image라는 변수 자체(참조)를 기억하고 있고, 실제로 실행되는 시점은 나중이라서, 
그때 가서 image를 읽으면 이미 로드가 끝난 상태인 겁니다. 
"정의하는 시점"과 "실행되는 시점"이 다르다는 게 포인트예요 — 콜백을 등록할 때는 image가 비어있어도, 
실행될 때는 채워져 있으니 문제없는 거죠.
*/