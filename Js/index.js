const table = document.getElementById("create");
const state = JSON.parse(window.localStorage.getItem("state")) ?? {
  currentUser: null,
  users: [],
  data: {},
};
const users=state.users
const data = state.data;
let currentUser = state.currentUser;
console.log(data[currentUser]);

const cell = (row, col) =>
  `<div contenteditable="true" row="${row}" col="${col}" height="20" width="100" class="cell" focusout="outFocus()">${
    data[currentUser].excel[row][col] ?? " "
  }</div>`;

if (state.currentUser) {
  createExcel(0, 0, data[currentUser].length, data[currentUser].width);
} else {
  showForm();
}


function createExcel(startRow, startCol, row, col) {
  for (let index = 0; index < row; index++) {
    const excelRow = document.createElement("div");
    excelRow.className = "row";
    for (let j = 0; j < col; j++) {
      excelRow.innerHTML += cell(startRow + index, startCol + j);
    }
    table.append(excelRow);
  }

  // localStorage.setItem("")
}

async function createGridNM() {
  table.innerHTML="";
  const row = +document.getElementById("row").value;
  const col = +document.getElementById("column").value;
  const newUser = document.getElementById("new-user").value;
  if(users.includes(newUser)){
    return alert(`User already exists`);
  }
  currentUser= newUser;
  if (!row || !column) {
    alert("Fill all the fields");
    return;
  }
  data[currentUser] = {};
  data[currentUser].length = 0;
  data[currentUser].width = 0;
  data[currentUser].excel = Array.from(Array(row), () => new Array(col));
  console.log(data[currentUser]);
  //Creating new excel
  createExcel(0, 0, row, col);

  document.querySelector(".main").classList.add("active");
  document.querySelector(".table-container").classList.remove("active");
  (data[currentUser].length = row - 1), (data[currentUser].width = col - 1);

  //updating the state
  state.currentUser = currentUser;
  state.users = [...state.users, currentUser];

  //storing it in localstorage
  window.localStorage.setItem("state", JSON.stringify(state));
}
function showForm() {
  document.querySelector(".excel-form").classList.remove("active");
  document.querySelector(".table-container").classList.add("active");
}

function outFocus() {
  console.log("focus out");
}

function addRow() {
  data[currentUser].excel.push(new Array(data.width));
  createExcel(
    data[currentUser].length,
    data[currentUser].width,
    1,
    document.querySelectorAll(".row")[0]?.children.length ?? 10
  );
  data[currentUser].length++;
  window.localStorage.setItem("state", JSON.stringify(state));
}

function deleteRow() {
  if (!table.lastChild) return alert("There is no row to delete");
  data[currentUser].length--;
  table.removeChild(table.lastChild);
  data[currentUser].excel.pop();
  window.localStorage.setItem("state", JSON.stringify(state));
}
function addColumn() {
  data[currentUser].width++;
  data[currentUser].excel.forEach((row) => row.push(""));
  document.querySelectorAll(".row").forEach((row, index) => {
    row.innerHTML += cell(index);
  });
  window.localStorage.setItem("state", JSON.stringify(state));
}
function deleteColumn() {
  data[currentUser].width--;
  document.querySelectorAll(".row").forEach((row) => {
    row.removeChild(row.lastChild);
  });
  data[currentUser].excel.forEach((row) => row.pop());
  window.localStorage.setItem("state", JSON.stringify(state));
}

const form = document.getElementById("create");
form.addEventListener("focusout", (event) => {
  const element = event.target;
  console.log(element.getAttribute("row"), element.getAttribute("col"));
  data[currentUser].excel[element.getAttribute("row")][
    element.getAttribute("col")
  ] = element.innerText;
  console.log(data);
  window.localStorage.setItem("state", JSON.stringify(state));
});

function getUser() {
  document.getElementById("user").insertAdjacentHTML(
    "afterBegin",
    users.map((user) => {
      if(user==state.currentUser){
        return `<option value="${user}" selected>${user}</option>`
      }
      return`<option value="${user}">${user}</option>`;
    })
  );
}
getUser();

function changeHandler(selectedVal) {
  if (selectedVal.value==="new User"){
    showForm();
  };
  switchUser(selectedVal.value);
}

function switchUser(nextUser){
  currentUser=nextUser;
  table.innerHTML="";
  createExcel(0,0,data[currentUser].length,data[currentUser].width);
}
