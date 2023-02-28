const user = window.localStorage.getItem("myCat");
const table = document.getElementById("create");
const data = JSON.parse(window.localStorage.getItem("data")) ?? {};

if (!data[user]) {
  data.length = 0;
  data.width = 0;
}

const cell = (row, col) =>
  `<div contenteditable="true" row="${row}" col="${col}" height="20" width="100" class="cell" focusout="outFocus()">${data[user][row][col]??" "}</div>`;

function createExcel(startRow, startCol, row, col) {
  console.log(data);
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
  // const row = document.getElementById("row").value;
  // const col = document.getElementById("column").value;
  const row = 5,
    col = 5;

  if (!row || !column) {
    alert("Fill all the fields");
    return;
  }
  createExcel(0, 0, row, col);
  document.querySelector(".main").classList.add("active");
  document.querySelector(".table-container").classList.remove("active");
  data[user] = Array.from(Array(row), () => new Array(col));
  (data.length = row - 1), (data.width = col - 1);
}
if (!window.localStorage.getItem("data")) {
  createGridNM();
} else {
}

function outFocus() {
  console.log("focus out");
}

function addRow() {
  data[user].push(new Array(data.width));
  createExcel(
    data.length,
    data.width,
    1,
    document.querySelectorAll(".row")[0]?.children.length ?? 10
  );
  data.length++;
  window.localStorage.setItem("data", JSON.stringify(data));
}

function deleteRow() {
  if (!table.lastChild) return alert("There is no row to delete");
  data.length--;
  table.removeChild(table.lastChild);
  data[user].pop();
  window.localStorage.setItem("data", JSON.stringify(data));
}
function addColumn() {
  data.width++;
  data[user].forEach((row) => row.push(""));
  document.querySelectorAll(".row").forEach((row, index) => {
    row.innerHTML += cell(index);
  });
  window.localStorage.setItem("data", JSON.stringify(data));
}
function deleteColumn() {
  data.width--;
  document.querySelectorAll(".row").forEach((row) => {
    row.removeChild(row.lastChild);
  });
  data[user].forEach((row) => row.pop());
  window.localStorage.setItem("data", JSON.stringify(data));
}

const form = document.getElementById("create");
form.addEventListener("focusout", (event) => {
  const element = event.target;
  console.log(element.getAttribute("row"), element.getAttribute("col"));
  data[user][element.getAttribute("row")][element.getAttribute("col")] =
    element.innerText;
  console.log(data);
  window.localStorage.setItem("data", JSON.stringify(data));
});
