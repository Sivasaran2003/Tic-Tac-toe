var playerX = 'X';
var playerO = 'O';
var turn = playerX;
const cells = document.querySelectorAll(".cell");
const gameOver = document.querySelector("#over");
const result = document.getElementById("result");
const strike = document.querySelector(".strike");
const newGame = document.querySelector("#newGame");
const board = Array(cells.length);
board.fill(null);

function click(event){
    if(gameOver.classList.contains('visible')){
        return;
    }

    const cell = event.target;
    if(cell.innerHTML == ""){
        if(turn == playerX){
            cell.innerHTML = turn;
            board[cell.dataset.index-1] = turn;
            turn = playerO;
        }else{
            cell.innerHTML = turn;
            board[cell.dataset.index-1] = turn;
            turn = playerX;
        }
    }
    var res = winningCombo(combo);
    if(res){
        gameOver.classList.add('visible');
    }
    //setHoverText();
}

function winningCombo(combo){
    var f = 0;
    for(const i of combo ){
        var a = i.a;
        var b = i.b;
        var c = i.c;
        var str = i.strike;
        var area = i.area;
        if(board[a-1] != null &&
            board[a-1] != null &&
            board[a-1] != null &&
            board[a-1] === board[b-1] &&
            board[c-1] === board[b-1]){
            result.innerHTML = `Winner is ${board[a-1]}`;
            strike.classList.add(str);
            strike.classList.add(area);
            return 1;
        }
    }

    board.forEach((value) => {
        if(value === null){
            f = 1;
            return;
        }
    });

    if(!f){
        result.innerHTML = `Draw`;
        return 1;
    }

    return 0;
}

function NewGame(){
    strike.className = 'strike';
    gameOver.className = 'hidden';
    cells.forEach((cell)=>cell.innerHTML = "");
    board.fill(null);
    turn = playerX;
}


cells.forEach((cell)=>{
    cell.addEventListener("click",click);
});

newGame.addEventListener("click",NewGame);

combo = [
//rows
    {a : 1,b : 2,c : 3,strike : "strike",area : "row1"},
    {a : 4,b : 5,c : 6,strike : "strike",area : "row2"},
    {a : 7,b : 8,c : 9,strike : "strike",area : "row3"},

//columns
    {a : 1,b : 4,c : 7,strike : "strike",area : "col1"},
    {a : 2,b : 5,c : 8,strike : "strike",area : "col2"},
    {a : 3,b : 6,c : 9,strike : "strike",area : "col3"},

//diagonals
    {a : 1,b : 5,c : 9,strike : "strike",area : "diag1"},
    {a : 3,b : 5,c : 7,strike : "strike",area : "diag2"},
];
