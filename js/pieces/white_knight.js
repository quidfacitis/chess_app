const whiteKnight = (currentSpot, listener) => {

  const legalMoves = [];

  const row = Number(currentSpot[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(currentSpot[0]);

  const blackPieces = [9823, 9822, 9821, 9820, 9819, 9818];

  // make a list of potentially legal moves

  const forwardLeft = columns[columnIndex - 1] + (row + 2);
  const forwardRight = columns[columnIndex + 1] + (row + 2);
  const leftUp = columns[columnIndex - 2] + (row + 1);
  const leftDown = columns[columnIndex - 2] + (row - 1);
  const downLeft = columns[columnIndex - 1] + (row - 2);
  const downRight = columns[columnIndex + 1] + (row - 2);
  const rightUp = columns[columnIndex + 2] + (row + 1);
  const rightDown = columns[columnIndex + 2] + (row - 1);


  if (columnIndex > 1) { // logic for 'leftUp' and 'leftDown'
    if (row < 8) {
      if (document.getElementById(leftUp).textContent === '') {
        legalMoves.push(leftUp);
      } else if (document.getElementById(leftUp).textContent !== '') {
        let content = document.getElementById(leftUp).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(leftUp);
            break
          }
        }
      }
    }
    if (row > 1) {
      if (document.getElementById(leftDown).textContent === '') {
        legalMoves.push(leftDown);
      } else if (document.getElementById(leftDown).textContent !== '') {
        let content = document.getElementById(leftDown).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(leftDown);
            break
          }
        }
      }
    }
  }

  if (columnIndex < 6) { // logic for 'rightUp' and 'rightDown'
    if (row < 8) {
      if (document.getElementById(rightUp).textContent === '') {
        legalMoves.push(rightUp);
      } else if (document.getElementById(rightUp).textContent !== '') {
        let content = document.getElementById(rightUp).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(rightUp);
            break
          }
        }
      }
    }
    if (row > 1) {
      if (document.getElementById(rightDown).textContent === '') {
        legalMoves.push(rightDown);
      } else if (document.getElementById(rightDown).textContent !== '') {
        let content = document.getElementById(rightDown).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(rightDown);
            break
          }
        }
      }
    }
  }

  if (row < 7) { // logic for 'forwardLeft' and 'forwardRight'
    if (columnIndex > 0) {
      if (document.getElementById(forwardLeft).textContent === '') {
        legalMoves.push(forwardLeft);
      } else if (document.getElementById(forwardLeft).textContent !== '') {
        let content = document.getElementById(forwardLeft).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(forwardLeft);
            break
          }
        }
      }
    }
    if (columnIndex < 7) {
      if (document.getElementById(forwardRight).textContent === '') {
        legalMoves.push(forwardRight);
      } else if (document.getElementById(forwardRight).textContent !== '') {
        let content = document.getElementById(forwardRight).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(forwardRight);
            break
          }
        }
      }
    }
  }

  if (row > 2) { // logic for 'downLeft' and 'downRight'
    if (columnIndex > 0) {
      if (document.getElementById(downLeft).textContent === '') {
        legalMoves.push(downLeft);
      } else if (document.getElementById(downLeft).textContent !== '') {
        let content = document.getElementById(downLeft).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(downLeft);
            break
          }
        }
      }
    }
    if (columnIndex < 7) {
      if (document.getElementById(downRight).textContent === '') {
        legalMoves.push(downRight);
      } else if (document.getElementById(downRight).textContent !== '') {
        let content = document.getElementById(downRight).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(downRight);
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
        document.getElementById(legalMoves[i]).innerHTML = '&#9816;';

        if (whiteKingInCheck(whiteKingLocation)) { // reverse illegal move
          document.getElementById(legalMoves[i]).innerHTML = '';
          document.getElementById(currentSpot).innerHTML = '&#9816;';
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
              `White knight moved from ${currentSpot} to ${legalMoves[i]}.
              <br><b>Black king in check.</b>
              <br>Black's turn.`;
            }
          } else {
            document.querySelector("p").innerHTML =
            `White knight moved from ${currentSpot} to ${legalMoves[i]}.
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
