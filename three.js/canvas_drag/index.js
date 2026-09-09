
const ctx = document.getElementById("canvas").getContext("2d");


// 드래그
const start = {x:0, y:0},
      offset = {x: canvas.offsetLeft, y: canvas.offsetTop};
let mouseDown = false,
    dragTarget = null; // 현재 드래그 중인 대상(text 객체 또는 image 객체), 없으면 null

/*텍스트 영역을 클릭했는지 판단하는 함수*/
const textSelection = function(x, y, text){
    if(!text) return false;
	const tx = text.x, ty = text.y, tWidth = text.width, tHeight = text.height;
	return (x >= tx - tWidth/2 && x <= tx + tWidth/2 && y >= ty - tHeight && y <= ty);
}

/*이미지 영역을 클릭했는지 판단하는 함수 (중심 좌표 기준 사각형)*/
const imageSelection = function(x, y, image){
	if(!image.img) return false;
	const ix = image.x, iy = image.y, iWidth = image.width, iHeight = image.height;
	return (x >= ix - iWidth/2 && x <= ix + iWidth/2 && y >= iy - iHeight/2 && y <= iy + iHeight/2);
}

/*Canvas 배경을 흰색으로 초기화*/
const drawBackground = function(){
	ctx.fillStyle = "white"; // 흰색 설정
	ctx.fillRect(0, 0, canvas.width, canvas.height); // 흰색 배경 채움
}

/*Canvas 내 이미지 추가 함수 (로드된 경우에만 그림)*/
const drawImage = function(image){
	if(!image.img) return;
	ctx.drawImage(image.img, image.x - image.width/2, image.y - image.height/2, image.width, image.height);
}

/*Canvas 내 filltext 추가 함수*/
const drawText = function(text){
	ctx.fillStyle = text.fillStyle; // 빨강 설정
	ctx.font = text.font;
	ctx.textAlign = "center";
	ctx.fillText(text.text, text.x, text.y); // 빨강색 채움
	// 실제 글씨 너비
	text.width = Number(ctx.measureText(text.text).width.toFixed(0));
}

/*배경 -> 이미지 -> 텍스트 순으로 매번 다시 그림 (텍스트가 항상 맨 위)*/
const render = function(){
	drawBackground();
	drawImage(image);
	drawText(text);
}

// mousedown, mousemove, mouseup 이벤트를 등록
canvas.addEventListener("mousedown", function(e){
	e.preventDefault(); // 텍스트 하이라이트 막기
	e.stopPropagation(); // 부모 전파 막기
	const winScrollTop = window.scrollY;
	start.x = parseInt(e.clientX - offset.x);
	start.y = parseInt(e.clientY - offset.y + winScrollTop);

	// 화면에 그려지는 순서상 위(텍스트)부터 우선 판정
	if(textSelection(start.x, start.y, text)){
		dragTarget = text;
	} else if(imageSelection(start.x, start.y, image)){
		dragTarget = image;
	} else {
		dragTarget = null;
	}
	mouseDown = true;
});

canvas.addEventListener("mousemove", function(e){
	e.preventDefault(); // 텍스트 하이라이트 막기
	if(mouseDown && dragTarget){
		const winScrollTop = window.scrollY,
			  mouseX = parseInt(e.clientX - offset.x),
			  mouseY = parseInt(e.clientY - offset.y + winScrollTop);
		const dx = mouseX - start.x, dy = mouseY - start.y;

		start.x = mouseX;
		start.y = mouseY;

		dragTarget.x += Number(dx.toFixed(0));
		dragTarget.y += Number(dy.toFixed(0));
		render();
	}
});

canvas.addEventListener("mouseup", function(e){
	mouseDown = false;
	dragTarget = null;
});

const text = {
    text: "비도오고 그래서",
    font: "26px nanumBold",
    fillStyle: "#F8B2B2",
    x: canvas.width/2,
    y: canvas.height/2,
    width: 0,
    height: 26
}

const image = {
    img: null,      // 로드되면 Image 객체가 들어감
    x: 60,          // 중심 좌표 (텍스트와 안 겹치게 좌상단 쪽에 배치)
    y: 60,
    width: 0,
    height: 0,
    maxSize: 80     // 작게 넣기 위한 최대 가로/세로 크기
}

/*이미지 파일을 로드해서 image 상태에 반영 (비율 유지하며 maxSize 이하로 축소)*/
const addImage = function(file){
    const img = new Image();
    img.onload = function(){
        const scale = Math.min(image.maxSize / img.width, image.maxSize / img.height, 1);
        image.img = img;
        image.width = Number((img.width * scale).toFixed(0));
        image.height = Number((img.height * scale).toFixed(0));
        render();
    }
    img.src = URL.createObjectURL(file);
}

const fileInput = document.getElementById("imageTest");
fileInput.addEventListener("change", function(e){
    e.preventDefault();
    if(e.target.files[0]){
        addImage(e.target.files[0]);
    }
});

render();
