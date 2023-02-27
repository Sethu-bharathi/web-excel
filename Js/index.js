const user = window.localStorage.getItem("tom");
const table = document.getElementById("create");

function createExcel() {
  const row = document.getElementById("row").value;
  const col = document.getElementById("column").value;
  if (!row || !column) {
    alert("Fill all the fields");
    return;
  }
  for (let index = 0; index < col; index++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < col; j++) {
      tr.innerHTML +=
        '<td contenteditable="true" height="20" width="100"></td>';
    }
    table.append(tr);
  }
  document.querySelector(".main").classList.add("active");
  document.querySelector(".table-container").classList.remove("active");
  deleteRow();
}

function deleteRow(){
    const newTable=table.childNodes[table.childNodes.length-1];
}
