const list = document.querySelector("#body_list");
const inputEl = document.querySelector("#write");
const btnEl = document.querySelector("#add");

// ✅ 2️⃣ 로컬 스토리지에서 기존 할 일 불러오기
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
savedTodos.forEach(todo => addItemToDOM(todo));

// ✅ 3️⃣ 할 일 DOM에 추가하는 함수 (재사용)
function addItemToDOM(text) {
    const li = document.createElement("li");
    li.setAttribute("class", "body_item");

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    const span = document.createElement("span");
    span.textContent = text;

    const i = document.createElement("i");
    i.setAttribute("class", "fa-regular fa-square-minus");
    i.addEventListener("click", (e) => {
        const itemText = e.currentTarget.previousSibling.textContent;
        removeFromLocalStorage(itemText);  // 로컬 스토리지에서도 제거
        e.currentTarget.parentElement.remove();  // DOM에서 제거
    });

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(i);
    list.appendChild(li);
}

// ✅ 4️⃣ 로컬 스토리지에 저장
function saveToLocalStorage(text) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(text);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// ✅ 5️⃣ 로컬 스토리지에서 삭제
function removeFromLocalStorage(text) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.filter(todo => todo !== text);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
}

// ✅ 6️⃣ 할 일 추가 기능 (저장 + DOM 추가)
const additem = () => {
    const text = inputEl.value.trim();
    if (!text) return;

    addItemToDOM(text);  // 화면에 추가
    saveToLocalStorage(text);  // 로컬 스토리지에 저장
    inputEl.value = "";  // 입력창 초기화
};

// ✅ 7️⃣ 이벤트 리스너
inputEl.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) additem();  // 엔터 입력 시 추가
});
btnEl.addEventListener("click", additem);  // 버튼 클릭 시 추가