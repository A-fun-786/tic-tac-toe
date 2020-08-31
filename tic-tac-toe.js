var board = document.querySelector(".board");
const cellElem = document.querySelectorAll(".board .col-sm-3")
const winnerClass = document.querySelector(".winning-message")

const x = "x";
const z = "z";

const WinnerComb = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]]

start();

function start(){
    var cross = true;
    board.classList.add("x");
    var clickCount = 0;
    cellElem.forEach(cell=>{
        cell.classList.remove("x");
        cell.classList.remove("z");
        cell.removeEventListener("click",handleClick);
    cell.addEventListener("click",handleClick,{once:true});
  
})

function handleClick(e){
    var curCell = e.target;
    
    curTurn = cross?x:z;
    nextTurn = !cross?x:z;
    clickCount++;
    placeMark(curCell,curTurn,nextTurn);
    if(clickCount>=5){
    if(checkWinner(curTurn))
        showWinner(curTurn);
    }
    if(clickCount==9){
    const winnerClass = document.querySelector(".winning-message")
    document.getElementById("text").innerHTML = "Draw "
    winnerClass.classList.add("show");
    }

}
function placeMark(curCell,curTurn,nextTurn) {
    curCell.classList.add(curTurn);
    cross = !cross;
    board.classList.remove(curTurn);
    board.classList.add(nextTurn);
}
function checkWinner(curTurn){
    return WinnerComb.some(combination=>{
        return combination.every(index=>{
            return cellElem[index].classList.contains(curTurn);
        })
    })
}
function showWinner(curTurn){
    document.getElementById("text").innerHTML = curTurn + " Wins!"
    winnerClass.classList.add("show");
}
}

const reset = document.getElementById("reset");
reset.addEventListener("click",e=>{
    winnerClass.classList.remove("show");
    board.classList.remove("x");
    board.classList.remove("z");
    start();
})