
const matrix = [];
for (let i = 0; i < 9; i++) {
  const columnArr = new Array(9).fill(0);
  matrix.push(columnArr);
}
console.log(matrix);



const setupBoard = (table) => {
  // const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  for (let row = 0; row < 9; row++) {
    const tr = document.createElement('tr');
    for(let col = 0; col < 9; col++) {
      const td = document.createElement('td');
      td.dataset.col = col;
      td.dataset.row = row;
      // td.setAttribute('data-col', `${col}`)
      const input = document.createElement('input');
      input.maxLength="1";
      td.appendChild(input);
      tr.append(td);
    }
    tbody.append(tr);
  }
  table.appendChild(tbody);
  const sudokuSolverDiv = document.querySelector('#sudoku-solver');
  sudokuSolverDiv.appendChild(table);
}

updateMatrix = (e) => {
  const value = e.target.value;
  const td = e.target.parentNode;
  const row = td.dataset.row;
  const col = td.dataset.col;
  matrix[row][col] = value;
}

solveSudoku = () => {

}

const addEventListener = (table) => {
  table.addEventListener('input', updateMatrix);
  const button = document.querySelector('#solve');
  button.addEventListener('click', solveSudoku);
}

const init = () => {
  const table = document.createElement('table');
  setupBoard(table);
  addEventListener(table);
}

init();

function checkRow(row) {
  const set = new Set();
  for (let col = 0; col < matrix[row].length; col++) {
    if (parseInt(matrix[row][col]) > 0 && !set.has(matrix[row][col])) {
      set.add(matrix[row][col])
    } else if (set.has(matrix[row][col])) {
      return false;
    }
  }
  return true;
}

function checkCol(col) {
  const set = new Set();
  for (let row = 0; row < matrix[row].length; row++) {
    if (parseInt(matrix[row][col]) > 0 && !set.has(matrix[row][col])) {
      set.add(matrix[row][col]);
    } else if (set.has(matrix[row][col])) {
      return false;
    }
  }
  return true;
}

function checkThreeByThree() {

}