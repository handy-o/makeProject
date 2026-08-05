const FOODS = [
  { emoji: "🍲", name: "김치찌개" },
  { emoji: "🍚", name: "비빔밥" },
  { emoji: "🥩", name: "불고기" },
  { emoji: "🌶️", name: "떡볶이" },
  { emoji: "🍗", name: "치킨" },
  { emoji: "🍕", name: "피자" },
  { emoji: "🍔", name: "햄버거" },
  { emoji: "🍣", name: "초밥" },
  { emoji: "🍝", name: "파스타" },
  { emoji: "🍜", name: "라면" },
];


const $draggable_list = document.getElementById('draggable-list');
let draggingLi = null;

init(); 
function init() {
    if(!$draggable_list) return;
    createList();
    addEventListeners();
}

function shuffle(arr) {
    return arr 
    .map((v) => ({ v, sort: Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map((x) => x.v);
}

function createList() {
    $draggable_list.innerHTML = '';

    const shuffled = shuffle(FOODS);

    shuffled.forEach((food) => {
        const li = document.createElement("li");
        li.setAttribute("draggable", "true");
        li.innerHTML = `<span class="emoji">${food.emoji}</span> <p class="food-name">${food.name}</p>`;
        $draggable_list.appendChild(li);
    })
}

function addEventListeners(){
    // start drag
    $draggable_list.addEventListener("dragstart", (e) => {
        const li = e.target.closest("li");

        if(!li) return;

        draggingLi = li;
        draggingLi.classList.add('dragging');
    })

    // end drag
    $draggable_list.addEventListener("dragend", () =>{
        if(!draggingLi) return;

        draggingLi.classList.remove("dragging");
        draggingLi = null;
    })

    // drag over
    $draggable_list.addEventListener('dragover', (e) => {
        e.preventDefault();

        if(!draggingLi) return;

        const targetLi = e.target.closest('li');
        if(!targetLi || targetLi === draggingLi) return;

        // 마우스 좌표와 타겟의 y좌표 중앙값을 비교하여, 위/아래 위치 지정
        const rect = targetLi.getBoundingClientRect();
        const midPoint = rect.top + rect.height / 2; 

        if(e.clientY < midPoint) {
            if(targetLi.previousElementSibling !== draggingLi) {
                $draggable_list.insertBefore(draggingLi, targetLi)
            }
        } else {
            if(targetLi.nextElementSibling !== draggingLi) {
                $draggable_list.insertBefore(draggingLi, targetLi.nextElementSibling)
            }
        }
    })
}