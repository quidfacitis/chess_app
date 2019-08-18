const blackRook = (currentSpot, listener) => {

  const legalMoves = [];

  const row = Number(currentSpot[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(currentSpot[0]);

  const whitePieces = [9817, 9816, 9815, 9814, 9813, 9812];

  // make a list of potentially legal moves

  let back = columns[columnIndex] + (row + 1);
  let forward = columns[columnIndex] + (row - 1);
  let right = columns[columnIndex - 1] + (row);
  let left = columns[columnIndex + 1] + (row);


  if (row < 8) { // logic for 'back'
    for (let i = 1; i <= (8 - row); i++) {
      if (row + i === 9) { //bug fix
        break
      } else {
        let back = columns[columnIndex] + (row + i);

        if (document.getElementById(back).textContent === '') {
            legalMoves.push(back);
        } else if (document.getElementById(back).textContent !== '') {
            let content = document.getElementById(back).textContent;
            let pieceCode = content.charCodeAt(0);

          for (let j = 0; j < whitePieces.length; j++) {
            if (whitePieces[j] === pieceCode) {
              legalMoves.push(back);
              break
            }
          }
          break
        }
      }
    }
  }
  if (row > 1) { // logic for 'forward'
    for (let i = 1; i <= row; i++) {
      if (row - i === 0) { //bug fix
        break
      } else {
        let forward = columns[columnIndex] + (row - i);

        if (document.getElementById(forward).textContent === '') {
            legalMoves.push(forward);
        } else if (document.getElementById(forward).textContent !== '') {
            let content = document.getElementById(forward).textContent;
            let pieceCode = content.charCodeAt(0);

          for (let j = 0; j < whitePieces.length; j++) {
            if (whitePieces[j] === pieceCode) {
              legalMoves.push(forward);
              break
            }
          }
          break
        }
      }
    }
  }
  if (columnIndex > 0) { // logic for 'right'
    for (let i = 1; i <= columnIndex; i++) {
      if (columnIndex - i === -1) { //bug fix
        break
      } else {
        let right = columns[columnIndex - i] + (row);

        if (document.getElementById(right).textContent === '') {
            legalMoves.push(right);
        } else if (document.getElementById(right).textContent !== '') {
            let content = document.getElementById(right).textContent;
            let pieceCode = content.charCodeAt(0);

          for (let j = 0; j < whitePieces.length; j++) {
            if (whitePieces[j] === pieceCode) {
              legalMoves.push(right);
              break
            }
          }
          break
        }
      }
    }
  }
  if (columnIndex < 7) { // logic for 'left'
    for (let i = 1; i <= (7 - columnIndex); i++) {
      if (columnIndex + i === 8) { //bug fix
        break
      } else {
        let left = columns[columnIndex + i] + (row);

        if (document.getElementById(left).textContent === '') {
            legalMoves.push(left);
        } else if (document.getElementById(left).textContent !== '') {
            let content = document.getElementById(left).textContent;
            let pieceCode = content.charCodeAt(0);

          for (let j = 0; j < whitePieces.length; j++) {
            if (whitePieces[j] === pieceCode) {
              legalMoves.push(left);
              break
            }
          }
          break
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
          document.querySelector(".white-taken").innerHTML =
          document.querySelector(".white-taken").innerHTML +
          document.getElementById(legalMoves[i]).innerHTML;
          document.getElementById(legalMoves[i]).innerHTML = '';
          pieceCaptured = true;
        }
        document.getElementById(currentSpot).textContent = '';
        document.getElementById(legalMoves[i]).innerHTML = '&#9820;';

        if (blackKingInCheck(blackKingLocation)) { // reverse illegal move
          document.getElementById(legalMoves[i]).innerHTML = '';
          document.getElementById(currentSpot).innerHTML = '&#9820;';
          if (pieceCaptured) { // restore captured piece from .white-taken graveyard
            let capturedPieces = document.querySelector(".white-taken").textContent;
            let restoredPiece = capturedPieces.charCodeAt(capturedPieces.length - 1);
            document.getElementById(legalMoves[i]).innerHTML = `&#${restoredPiece};`;
            let newCapturedPieces = capturedPieces.slice(0, capturedPieces.length - 1);
            document.querySelector(".white-taken").innerHTML = newCapturedPieces;
          }
          document.querySelector("p").innerHTML =
          `<b>Move not possible. Black king left in check.</b>
          <br>Black's turn.`;
          break
        } else {
          if (whiteKingInCheck(whiteKingLocation)) { //white king in check

            console.log("White king in check.");

            if (whiteKingCheckmate(whiteKingLocation)) { //white king in checkmate
              console.log("White king in checkmate.");
              document.querySelector("p").innerHTML =
              `<b>White king in checkmate.</b>
              <br>Black wins.`;
              gameOver = true;
            } else {
              document.querySelector("p").innerHTML =
              `Black rook moved from ${currentSpot} to ${legalMoves[i]}.
              <br><b>White king in check.</b>
              <br>White's turn.`;
            }
          } else {
            document.querySelector("p").innerHTML =
            `Black rook moved from ${currentSpot} to ${legalMoves[i]}.
            <br>White's turn.`;
          }
          if (columnIndex === 0) { // castling
            blackRook_QS += 1;
          } if (columnIndex === 7) {
            blackRook_KS += 1;
          }
          whitesTurn = true;

          let newMovement = { //add movement for 'forward' and 'back' buttons
            cell1: currentSpot,
            cell2: legalMoves[i],
            capture: pieceCaptured,
            promotion: false,
            pieceColor: "black",
            isRook: true,
            columnIndex: columnIndex
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
