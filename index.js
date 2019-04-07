
// const matrix = [];
// for (let i = 0; i < 9; i++) {
//   const columnArr = new Array(9).fill(0);
//   matrix.push(columnArr);
// }
// console.log(matrix);

//temp matrix
const matrix = [
  [0, 0, 1, 9, 8, 4, 7, 6, 0],
  [6, 0, 0, 0, 5, 7, 0, 0, 0],
  [8, 0, 7, 0, 1, 0, 0, 0, 0],
  [9, 6, 0, 3, 0, 8, 1, 0, 5],
  [1, 8, 5, 0, 2, 0, 0, 7, 3],
  [3, 0, 0, 0, 0, 0, 2, 0, 8],
  [2, 1, 0, 0, 0, 0, 0, 3, 6],
  [0, 0, 0, 1, 0, 0, 0, 0, 4],
  [0, 9, 6, 0, 0, 2, 5, 1, 0]
]



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

solveSudoku = (row, col) => {
  // console.log(row, col)
  if (row === 8 && col === 8) {
    console.log(matrix);
  }
  if (col > 8) {
    col = 0;
    row++;
  }
  if (row > 8 && col > 8) {
    // console.log(matrix);
    return matrix;
  }
  if (matrix[row][col] === 0) {
    let possibleOptions = getOptions(row , col);
    if (!possibleOptions.size) {
      return false;
    }
    console.log(possibleOptions)
    possibleOptions.forEach((option) => {
      matrix[row][col] = option;
      let complete = solveSudoku(row, col + 1)
      if (complete) {
        return true;
      } else {
        matrix[row][col] = 0;
      }
    })
  }
  let complete = solveSudoku(row, col + 1)
  if (complete) {
    // console.log(matrix);
    return matrix;
  }
  return false;
}

const addEventListener = (table) => {
  table.addEventListener('input', updateMatrix);
  const button = document.querySelector('#solve');
  button.addEventListener('click', () => solveSudoku(0,0));
}

const init = () => {
  const table = document.createElement('table');
  setupBoard(table);
  addEventListener(table);
}

init();

function getOptions(row, col) { //iterate through column, rows, and 3 x 3 and generate a list of options
  const possibleOptions = new Set();
  for (let i = 1; i <= 9; i++) {
    possibleOptions.add(i);
  }
  for (let c = 0; c < 9; c++) {
    if (possibleOptions.has(matrix[row][c])) {
      possibleOptions.delete(matrix[row][c]);
    }
  }
  for (let r = 0; r < 9; r++) {
    if (possibleOptions.has(matrix[r][col])) {
      possibleOptions.delete(matrix[r][col]);
    }
  }

  let r = findIndex(row);
  let c = findIndex(col);
  for (let i = r; i < r+3; i++) {
    for (let j= c; j < c+3; j++) {
      if (possibleOptions.has(matrix[i][j])) {
        possibleOptions.delete(matrix[i][j]);
      }
    }
  }
  return possibleOptions;
}


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

function checkThreeByThree(row, col) {
  const set = new Set();
  let r = findIndex(row);
  let c = findIndex(col);
  for (let i = r; i < r+3; i++) {
    for (let j= c; j < c+3; j++) {
      if (parseInt(matrix[i][j]) > 0 && !set.has(matrix[i][j])) {
        set.add(matrix[i][j]);
      } else if (set.has(matrix[i][j])) {
        return false;
      }
    }
  }
  return true;
}

function findIndex(num) {
  if (num < 3) return 0;
  else if (num < 6) return 3;
  else if (num < 9) return 5;
}