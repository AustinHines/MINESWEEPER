document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let width = 10;
    let bombAmount = 20;
    let squares = [];
    let isGameOver = false
    let flags = 0

    //create board
    function createBoard() {
        const bombArray = Array(bombAmount).fill('bomb')
        const emptyArray = Array(width * width - bombAmount).fill('valid')
        console.log(bombArray);
        console.log(emptyArray);
        const gameArray = emptyArray.concat(bombArray)
        console.log(gameArray);
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add(shuffledArray[i])
            grid.appendChild(square)
            squares.push(square)

            //normal click
            square.addEventListener('click', function (e) {
                click(square)
            })
        }

        // Add Numbers 
        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i === -1)
            if (squares[i].classList.contains('valid')) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains('bomb')) total++
                if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains('bomb')) total++
                if (i > 10 && squares[i - width].classList.contains('b')) total++
                if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains('bomb')) total++
                if (i < 98 && squares[i + 1].classList.contains('bomb')) total++
                if (i < 90 && squares[i - 1 + width].classList.contains('bomb')) total++
                if (i < 88 && squares[i + 1 + width].classList.contains('bomb')) total++
                if (i < 89 && squares[i + 1 + width].classList.contains('bomb')) total++
                squares[i].setAttribute('data', total)
                console.log(squares[i]);
            }
        }







    }
    createBoard()

  //add Flag with right click
  function addFlag(square) {
    if (isGameOver) return
    if (!square.classList.contains('checked') && (flags < bombAmount)) {
      if (!square.classList.contains('flag')) {
        square.classList.add('flag')
        square.innerHTML = ' 🚩'
        flags ++
        flagsLeft.innerHTML = bombAmount- flags
        checkForWin()
      } else {
        square.classList.remove('flag')
        square.innerHTML = ''
        flags --
        flagsLeft.innerHTML = bombAmount- flags
      }
    }
  }``

    //click square
    function click(square) {
        let currentId = square.id
        if (isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            gameOver(square)
        } else {
            let total = square.getAttribute('data')
            if (total != 0){
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }

    // check neighboring squares once
    function checkSquare(square, currentId) {
        const isLeftEdge = (currentId % width === 0)
        const isRightEdge = (currentId % width === width -1 )

        setTimeout(() => {
            if (currentId > 0 && !isLeftEdge) {
                const newId = squares[parseInt(currentId)  -1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if(currentId > 9 && !isRightEdge){
                const newId = squares[parseInt(currentId) + 1 - width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 10) {
                 const newId = squares[parseInt(currentId) -width].id
                 const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 11 && !isLeftEdge){
                const newId = squares[parseInt(currentId) -1 -width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 98 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) {
                const newId = squares[parseInt(currentId) -1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 88 && !isRightEdge) {
                const newId = squares[parseInt(currentId) +1 +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 89) {
                const newId = squares[parseInt(currentId) +width].id
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }

        },10)
    }
//Game Over
function gameOver(square) {
    console.log('BOOM GAME OVER');
    isGameOver = true
    
    //SHOW ALL BOMBS
    squares.forEach(square => {
        if (square.classList.contains('bomb')){
            square.innerHTML = '💣'
        }
    })
}


})