var numSelected = null;
var diffSelected = null;
var cellSelected = null;
var pair = new Array();
var board = new Array();
var solution = new Array();

var sudokuSet0 = ["---------","---------","---------","---------","---------","---------","---------","---------","---------"];
var sudokuSet1 = ["493561278","526478913","718329654","379842561","852613497","641795832","237954186","165287349","984136725"];
var sudokuSet2 = ["964812753","253479816","871563924","389247561","625198437","147635298","596384172","718926345","432751689"];
var sudokuSet3 = ["742538691","916427385","358916427","893672514","274153968","165894273","537289146","489361752","621745839"];
var sudokuSet4 = ["714635892","258194637","369728541","192453768","543867219","687912354","936271485","825349176","471586923"];
var sudokuSet5 = ["387491625","241568379","569327418","758619234","123784596","496253187","934176852","675832941","812945763"];

function setBoard(level) {
    resetBoard();
    sudokuSetPicker();

    //select difficulty
    if (level == 'easy') {
        difficulty(25);
    }else if (level == 'median') {
        difficulty(40);
    }else if (level == 'hard') {
        difficulty(55);
    }else if (level == 'expert'){
        difficulty(65);
    }else {
        demoMode();
    }    
    /*Set difficulty for sudoku game remove set amount of number*/
    function demoMode() {
        for (let x = 5; x > 0; x--) {
            /*select row*/
            let ranR = Math.floor(Math.random() * 9);
            /*select number in that row*/
            let ranC = 1;
            let num = ranR.toString() + ranC.toString();
            if (!pair.includes(num)) {
            pair.push(num);
            board[ranR] = board[ranR].replace(ranC, '-');
            }else {
            x++;
            }
        }
    }
    function difficulty(number) {
        for (let x = number; x > 0; x--) {
            let ranR = Math.floor(Math.random() * 9);
            let ranC = Math.floor(Math.random() * 9) + 1;
            let num = ranR.toString() + ranC.toString();
            if (!pair.includes(num)) {
            pair.push(num);
            board[ranR] = board[ranR].replace(ranC, '-');
            }else {
            x++;
            }
        }
    }
    createBoard();
}

//randomly select sudoku set
function sudokuSetPicker() {
    let setNum = Math.floor(Math.random()*4) +1;
    if (setNum==1) {
        setpickerHelper(sudokuSet1);
    }else if (setNum==2) {
        setpickerHelper(sudokuSet2);
    }else if (setNum==3) {
        setpickerHelper(sudokuSet3);
    }else if (setNum==4) {
        setpickerHelper(sudokuSet4);
    }else if (setNum==5) {
        setpickerHelper(sudokuSet5);
    }
}
//copy array to board and solution
function setpickerHelper(setName) {
    for (let i=0; i<setName.length; i++) {
        board[i] = setName[i];
        solution[i] = setName[i];
    }
}


//create sudoku board
function createBoard() {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            //create div
            let cell = document.createElement("div");
            //add id to div (id='r-c' like 1-2)
            cell.id = r.toString() + "-" + c.toString();
            //add number to cell if not == to '-'
            if (board[r][c] != "-") {
                cell.innerText = board[r][c];
                cell.classList.add("startCell");
            }
            //add a horizontal line
            if (r == 2 || r == 5) {
                cell.classList.add("hLine-bottom");
            }
            if (r == 3 || r == 6) {
                cell.classList.add("hLine-top");
            }
            //add a vertival-line
            if (c == 2 || c == 5) {
                cell.classList.add("vLine-right");
            }
            if (c == 3 || c == 6) {
                cell.classList.add("vLine-left");
            }
            cell.addEventListener("click", selectCell);
            cell.classList.add("cell");
            //add the div to th
            document.getElementById("sudoku").append(cell);
        }
    }
}
//create numberBar
function createNumBar() {
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        //create div
        let number = document.createElement("div");
        //add id
        number.id = i
        //add class = number
        number.classList.add("number");
        //add text
        number.innerText = i;
        number.addEventListener("click", numBarSelecter);
        //get the location of digits andd add did to it
        document.getElementById("numberBar").appendChild(number);
    }

}


//select number in number bar
function numBarSelecter(){
    if (numSelected != null) {
        numSelected.classList.remove("numSelected");
    }
    numSelected = this;
    numSelected.classList.add("numSelected");
    console.log(this);
}

function selectCell() {
    //add number to any cell if it is blank
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }

        // "0-0" "0-1" .. "3-1"
        let coords = this.id.split("-"); //["0", "0"]
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);

        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
        }
    }
}

//delete everything in board div
function resetBoard () {
    document.getElementById("sudoku").innerHTML="";
}




