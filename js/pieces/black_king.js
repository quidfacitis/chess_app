const blackKing = (currentSpot, listener) => {

  const legalMoves = [];

  const row = Number(currentSpot[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(currentSpot[0]);

const whitePieces = [9817, 9816, 9815, 9814, 9813, 9812];

  // make a list of potentially legal moves

  const forward = columns[columnIndex] + (row - 1);
  const leftUp = columns[columnIndex + 1] + (row - 1);
  const rightUp = columns[columnIndex - 1] + (row - 1);
  const back = columns[columnIndex] + (row + 1);
  const leftDown = columns[columnIndex + 1] + (row + 1);
  const rightDown = columns[columnIndex - 1] + (row + 1);
  const left = columns[columnIndex + 1] + row;
  const right = columns[columnIndex - 1] + row;
  const kingsideCastle = "g8"; //castling
  const queensideCastle = "c8"; //castling

  if (row > 1) { // logic for 'forward,' 'leftUp,' and 'rightUp'
    if (document.getElementById(forward).textContent === '') {
      legalMoves.push(forward);
    } else if (document.getElementById(forward).textContent !== '') {
      let content = document.getElementById(forward).textContent;
      let pieceCode = content.charCodeAt(0);

      for (let i = 0; i < whitePieces.length; i++) {
        if (whitePieces[i] === pieceCode) {
          legalMoves.push(forward);
          break
        }
      }
    }
    if (columnIndex < 7) {
      if (document.getElementById(leftUp).textContent === '') {
        legalMoves.push(leftUp);
      } else if (document.getElementById(leftUp).textContent !== '') {
        let content = document.getElementById(leftUp).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < whitePieces.length; i++) {
          if (whitePieces[i] === pieceCode) {
            legalMoves.push(leftUp);
            break
          }
        }
      }
    }
    if (columnIndex > 0) {
      if (document.getElementById(rightUp).textContent === '') {
        legalMoves.push(rightUp);
      } else if (document.getElementById(rightUp).textContent !== '') {
        let content = document.getElementById(rightUp).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < whitePieces.length; i++) {
          if (whitePieces[i] === pieceCode) {
            legalMoves.push(rightUp);
            break
          }
        }
      }
    }
  }
  if (row < 8) { // logic for 'back,' 'leftDown,' and 'rightDown'
    if (document.getElementById(back).textContent === '') {
      legalMoves.push(back);
    } else if (document.getElementById(back).textContent !== '') {
      let content = document.getElementById(back).textContent;
      let pieceCode = content.charCodeAt(0);

      for (let i = 0; i < whitePieces.length; i++) {
        if (whitePieces[i] === pieceCode) {
          legalMoves.push(back);
          break
        }
      }
    }
    if (columnIndex < 7) {
      if (document.getElementById(leftDown).textContent === '') {
        legalMoves.push(leftDown);
      } else if (document.getElementById(leftDown).textContent !== '') {
        let content = document.getElementById(leftDown).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < whitePieces.length; i++) {
          if (whitePieces[i] === pieceCode) {
            legalMoves.push(leftDown);
            break
          }
        }
      }
    }
    if (columnIndex > 0) {
      if (document.getElementById(rightDown).textContent === '') {
        legalMoves.push(rightDown);
      } else if (document.getElementById(rightDown).textContent !== '') {
        let content = document.getElementById(rightDown).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < whitePieces.length; i++) {
          if (whitePieces[i] === pieceCode) {
            legalMoves.push(rightDown);
            break
          }
        }
      }
    }
  }
  if (columnIndex < 7) { // logic for 'left'
    if (document.getElementById(left).textContent === '') {
      legalMoves.push(left);
    } else if (document.getElementById(left).textContent !== '') {
      let content = document.getElementById(left).textContent;
      let pieceCode = content.charCodeAt(0);

      for (let i = 0; i < whitePieces.length; i++) {
        if (whitePieces[i] === pieceCode) {
          legalMoves.push(left);
          break
        }
      }
    }
  }
  if (columnIndex > 0) { // logic for 'right'
    if (document.getElementById(right).textContent === '') {
      legalMoves.push(right);
    } else if (document.getElementById(right).textContent !== '') {
      let content = document.getElementById(right).textContent;
      let pieceCode = content.charCodeAt(0);

      for (let i = 0; i < whitePieces.length; i++) {
        if (whitePieces[i] === pieceCode) {
          legalMoves.push(right);
          break
        }
      }
    }
  }

  if (!blackKingInCheck(blackKingLocation) && blackKingMoved === 0 && blackRook_KS === 0) { // logic for kingsideCastle
    if (document.getElementById("f8").textContent === '' &&
    document.getElementById("g8").textContent === '') {
      legalMoves.push(kingsideCastle);
    }
  }

  if (!blackKingInCheck(blackKingLocation) && blackKingMoved === 0 && blackRook_QS === 0) { // logic for queensideCastle
    if (document.getElementById("d8").textContent === '' &&
    document.getElementById("c8").textContent === '' &&
    document.getElementById("b8").textContent === '') {
      legalMoves.push(queensideCastle);
    }
  }

  let pieceCaptured = '';
  let castling = '';

  const movePawnListener = (event) => {
    document.getElementById(currentSpot).classList.remove('selected');
    document.querySelector("p").innerHTML = '';
    for (let i = 0; i < legalMoves.length; i++) {
      if (event.target.id === legalMoves[i]) {
        if (legalMoves[i] === kingsideCastle) { // castling
          document.getElementById("h8").textContent = '';
          document.getElementById("f8").innerHTML = '&#9820;'; // black rook
          castling = kingsideCastle;
        } if (legalMoves[i] === queensideCastle) { // castling
          document.getElementById("a8").textContent = '';
          document.getElementById("d8").innerHTML = '&#9820;'; // black rook
          castling = queensideCastle;
        } if (document.getElementById(legalMoves[i]).textContent !== '') {
          document.querySelector(".white-taken").innerHTML =
          document.querySelector(".white-taken").innerHTML +
          document.getElementById(legalMoves[i]).innerHTML;
          document.getElementById(legalMoves[i]).innerHTML = '';
          pieceCaptured = true;
        }
        document.getElementById(currentSpot).textContent = '';
        document.getElementById(legalMoves[i]).innerHTML = '&#9818;';

        blackKingLocation = legalMoves[i];

        if (legalMoves[i] === kingsideCastle) { // kingside castle check
          if (blackKingInCheck("f8") || blackKingInCheck("g8")) {
            document.getElementById(legalMoves[i]).innerHTML = '';
            document.getElementById(currentSpot).innerHTML = '&#9818;';
            document.getElementById("h8").innerHTML = '&#9820;'; // black rook
            document.getElementById("f8").innerHTML = '';
            blackKingLocation = currentSpot;
            document.querySelector("p").innerHTML =
            `<b>Move not possible. Black king left in check.</b>
            <br>Black's turn.`;
            break
          }
        } if (legalMoves[i] === queensideCastle) { // queenside castle check
          if (blackKingInCheck("d8") || blackKingInCheck("c8")) {
            document.getElementById(legalMoves[i]).innerHTML = '';
            document.getElementById(currentSpot).innerHTML = '&#9818;';
            document.getElementById("a8").innerHTML = '&#9820;'; // black rook
            document.getElementById("d8").innerHTML = '';
            blackKingLocation = currentSpot;
            document.querySelector("p").innerHTML =
            `<b>Move not possible. Black king left in check.</b>
            <br>Black's turn.`;
            break
          }
        } if (blackKingInCheck(blackKingLocation)) { // reverse illegal move
          document.getElementById(legalMoves[i]).innerHTML = '';
          document.getElementById(currentSpot).innerHTML = '&#9818;';
          blackKingLocation = currentSpot;
          if (pieceCaptured) { // restore captured piece from .black-taken graveyard
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

            if (whiteKingCheckmate(whiteKingLocation)) { //white king in checkmate
              document.querySelector("p").innerHTML =
              `<b>White king in checkmate.</b>
              <br>Black wins.`;
              gameOver = true;
            } else {
              document.querySelector("p").innerHTML =
              `Black king moved from ${currentSpot} to ${legalMoves[i]}.
              <br><b>White king in check.</b>
              <br>White's turn.`;
              blackKingMoved += 1; //castling
              blackKingLocation = legalMoves[i]; //check and checkmate
            }
          } else {
            document.querySelector("p").innerHTML =
            `Black king moved from ${currentSpot} to ${legalMoves[i]}.
            <br>White's turn.`;
            blackKingMoved += 1; //castling
            blackKingLocation = legalMoves[i]; //check and checkmate
          }
          whitesTurn = true;

          let newMovement = { //add movement for 'forward' and 'back' buttons
            cell1: currentSpot,
            cell2: legalMoves[i],
            capture: pieceCaptured,
            promotion: false,
            pieceColor: "black",
            castling: castling, //cell ID
            isKing: true
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
