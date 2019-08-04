const GONU_SIZE = 14;
const table = document.getElementById("gonuTable");
//const gonuTableNumber = GONU_SIZE*GONU_SIZE-1;
let gonuTableNumber = 0;
let turn = false;

for(i=0; i<GONU_SIZE; i++)
{
  const row = document.createElement("tr");
  row.id = `tr${i}`;
  table.appendChild(row);
}

for(j=0; j<GONU_SIZE; j++){
  const table = document.getElementById(`tr${j}`);
  for(i=0; i<GONU_SIZE; i++) {
    const tableData = document.createElement("td");
    tableData.id = `td${gonuTableNumber}`;
    gonuTableNumber++;
    tableData.classList.add("area");
    tableData.classList.add("0");
    table.appendChild(tableData);
  }
}

const tdNumber = document.querySelectorAll(".area");
const tdNumberArray = Array.prototype.slice.call(tdNumber);


function checkRock(e) {
  if(e.classList.contains("0"))
  {
    return true;
  }
  else {
    return false;
  }

}

function checkWin(){
  const updateGonu = document.querySelectorAll(".new");
  const updateArray = Array.prototype.slice.call(tdNumber);
  columnCheckWin(updateArray);
  rowCheckWin(updateArray);
  leftDiagonal(updateArray);
  rightDiagonal(updateArray);
}
function columnCheckWin(arr){
//가로 체크
  for(i=0; i<GONU_SIZE-1; i++){
    for(j=0; j<GONU_SIZE-4; j++){
      let checkSum = 0;
      for(k=0; k<5; k++){
        checkSum = checkSum + Number(arr[i*14+j+k].className.charAt(0));
      }
      if(checkSum===5 || checkSum===30)
      alert("You Win");
    }
  }
}

function rowCheckWin(arr){
  //세로 체크
  for(i=0; i<GONU_SIZE-4; i++){
    for(j=0; j<GONU_SIZE-1; j++){
      let checkSum = 0;
      for(k=0; k<5; k++){
        checkSum = checkSum + Number(arr[i*14+j+k*14].className.charAt(0));
      }
      if(checkSum===5 || checkSum===30)
        alert("You Win");
    }
  }
}

function leftDiagonal(arr){
  for(i=0; i<GONU_SIZE-4; i++){
    for(j=0; j<GONU_SIZE-4; j++){
      let checkSum = 0;
      for(k=0; k<5; k++){
        checkSum = checkSum + Number(arr[i*14+j+k*14+k].className.charAt(0));
      }
      if(checkSum===5 || checkSum===30) // 합계로 승리 체크
        alert("You Win");
    }
  }
}

function rightDiagonal(arr){
  for(i=4; i<GONU_SIZE; i++){
    for(j=4; j<GONU_SIZE; j++){
      let checkSum = 0;
      for(k=0; k<5; k++){
        checkSum = checkSum + Number(arr[i*14+j+k*14-k].className.charAt(0));
      }
      if(checkSum===5 || checkSum===30)
        alert("You Win");
    }
  }
}

function handleClick(event) {
  if(checkRock(event.target)){ // 이미 바둑돌이 있느냐
    if(turn){ // 백색 턴이냐
      const img = document.createElement("img"); // 백돌 이미지 삽입
      img.src = `img/white.png`;
      turn = false;
      event.target.appendChild(img);
      event.target.classList.remove("0");
      event.target.classList.remove("area");
      event.target.classList.add("1"); // 1은 승리체크 함수에서 씀(합계 5)
      event.target.classList.add("new");
      checkWin();
    }
    else {
      const img = document.createElement("img"); // 흑돌 이미지 삽입
      img.src = `img/black.png`;
      turn = true;
      event.target.appendChild(img);
      event.target.classList.remove("0");
      event.target.classList.remove("area");
      event.target.classList.add("6");
      event.target.classList.add("new"); // 6은 승리체크 함수에서 씀(합계 30)
      checkWin();
    }
  }
  else {
    alert("이미 돌 있음");
  }
}
tdNumberArray.forEach(e=>e.addEventListener("click",handleClick));
