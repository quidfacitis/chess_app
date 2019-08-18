const whiteBishop = (currentSpot, listener) => {

  const legalMoves = [];

  const row = Number(currentSpot[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(currentSpot[0]);

  const blackPieces = [9823, 9822, 9821, 9820, 9819, 9818];

  // make a list of potentially legal moves

  let forwardLeft = columns[columnIndex - 1] + (row + 1);
  let forwardRight = columns[columnIndex + 1] + (row + 1);
  let downLeft = columns[columnIndex - 1] + (row - 1);
  let downRight = columns[columnIndex + 1] + (row - 1);


  if (row < 8) { // logic for 'forwardLeft' and 'forwardRight'
    if (columnIndex > 0) {
      for (let i = 1; i <= columnIndex; i++) {
        if (row + i === 9) { //bug fix
          break
        } else {
          let forwardLeft = columns[columnIndex - i] + (row + i);

          if (document.getElementById(forwardLeft).textContent === '') {
            legalMoves.push(forwardLeft);
          } else if (document.getElementById(forwardLeft).textContent !== '') {
            let content = document.getElementById(forwardLeft).textContent;
            let pieceCode = content.charCodeAt(0);

            for (let j = 0; j < blackPieces.length; j++) {
              if (blackPieces[j] === pieceCode) {
                legalMoves.push(forwardLeft);
                break
              }
            }
            break
          }
        }
      }
    }
    if (columnIndex < 7) {
      for (let i = 1; i <= (7 - columnIndex); i++) {
        if (row + i === 9) { //bug fix
          break
        } else {
          let forwardRight = columns[columnIndex + i] + (row + i);
          if (document.getElementById(forwardRight).textContent === '') {
            legalMoves.push(forwardRight);
          } else if (document.getElementById(forwardRight).textContent !== '') {
            let content = document.getElementById(forwardRight).textContent;
            let pieceCode = content.charCodeAt(0);

            for (let j = 0; j < blackPieces.length; j++) {
              if (blackPieces[j] === pieceCode) {
                legalMoves.push(forwardRight);
                break
              }
            }
            break
          }
        }
      }
    }
  }


  if (row > 1) { // logic for 'downLeft' and 'downRight'

    if (columnIndex > 0) {
      for (let i = 1; i <= columnIndex; i++) {
        if (row - i === 0) { //bug fix
          break
        } else {
          let downLeft = columns[columnIndex - i] + (row - i);

          if (document.getElementById(downLeft).textContent === '') {
            legalMoves.push(downLeft);
          } else if (document.getElementById(downLeft).textContent !== '') {
            let content = document.getElementById(downLeft).textContent;
            let pieceCode = content.charCodeAt(0);

            for (let j = 0; j < blackPieces.length; j++) {
              if (blackPieces[j] === pieceCode) {
                legalMoves.push(downLeft);
                break
              }
            }
            break
          }
        }
      }
    }
    if (columnIndex < 7) {
      for (let i = 1; i <= (7 - columnIndex); i++) {
        if (row - i === 0) { //bug fix
          break
        } else {
          let downRight = columns[columnIndex + i] + (row - i);

          if (document.getElementById(downRight).textContent === '') {
            legalMoves.push(downRight);
          } else if (document.getElementById(downRight).textContent !== '') {
            let content = document.getElementById(downRight).textContent;
            let pieceCode = content.charCodeAt(0);

            for (let j = 0; j < blackPieces.length; j++) {
              if (blackPieces[j] === pieceCode) {
                legalMoves.push(downRight);
                break
              }
            }
            break
          }
        }
      }
    }
  }

  let pieceCaptured = '';

  const movePawnListener = (event) => {
    document.getElementById(currentSpot).classList.remove('selected');
    document.querySelector("p").innerHTML = '';
    for (let i = 0; i < legalMoves.length; i++) {
      if (event.target.id === legalMoves[i]) {
        if (document.getElementById(legalMoves[i]).textContent !== '') {
          document.querySelector(".black-taken").innerHTML =
          document.querySelector(".black-taken").innerHTML +
          document.getElementById(legalMoves[i]).innerHTML;
          document.getElementById(legalMoves[i]).innerHTML = '';
          pieceCaptured = true;
        }
        document.getElementById(currentSpot).textContent = '';
        document.getElementById(legalMoves[i]).innerHTML = '&#9815;';

        if (whiteKingInCheck(whiteKingLocation)) { // reverse illegal move
          document.getElementById(legalMoves[i]).innerHTML = '';
          document.getElementById(currentSpot).innerHTML = '&#9815;';
          if (pieceCaptured) { // restore captured piece from .black-taken graveyard
            let capturedPieces = document.querySelector(".black-taken").textContent;
            let restoredPiece = capturedPieces.charCodeAt(capturedPieces.length - 1);
            document.getElementById(legalMoves[i]).innerHTML = `&#${restoredPiece};`;
            let newCapturedPieces = capturedPieces.slice(0, capturedPieces.length - 1);
            document.querySelector(".black-taken").innerHTML = newCapturedPieces;
          }
          document.querySelector("p").innerHTML =
          `<b>Move not possible. White king left in check.</b>
          <br>White's turn.`;
          break
        } else {
          if (blackKingInCheck(blackKingLocation)) { //black king in check

            if (blackKingCheckmate(blackKingLocation)) { //black king in checkmate
              document.querySelector("p").innerHTML =
              `<b>Black king in checkmate.</b>
              <br>White wins.`;
              gameOver = true;
            } else {
              document.querySelector("p").innerHTML =
              `White bishop moved from ${currentSpot} to ${legalMoves[i]}.
              <br><b>Black king in check.</b>
              <br>Black's turn.`;
            }
          } else {
            document.querySelector("p").innerHTML =
            `White bishop moved from ${currentSpot} to ${legalMoves[i]}.
            <br>Black's turn.`;
          }
          whitesTurn = false;

          let newMovement = { //add movement for 'forward' and 'back' buttons
            cell1: currentSpot,
            cell2: legalMoves[i],
            capture: pieceCaptured,
            promotion: false,
            pieceColor: "white"
          };
          if (currentIndex + 1 !== movements.length) {
            movements = movements.slice(0, currentIndex + 1)
            movements.push(newMovement);
          } else {
            movements.push(newMovement);
          }
          currentIndex += 1;
          arrowColors();

          break
        }
      }
    }
    document.removeEventListener('click', movePawnListener);
    document.addEventListener('click', listener);
  }

  document.addEventListener('click', movePawnListener);
}
