const whiteKing = (currentSpot, listener) => {

  const legalMoves = [];

  const row = Number(currentSpot[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(currentSpot[0]);

  const blackPieces = [9823, 9822, 9821, 9820, 9819, 9818];

  // make a list of potentially legal moves

  const forward = columns[columnIndex] + (row + 1);
  const leftUp = columns[columnIndex - 1] + (row + 1);
  const rightUp = columns[columnIndex + 1] + (row + 1);
  const back = columns[columnIndex] + (row - 1);
  const leftDown = columns[columnIndex - 1] + (row - 1);
  const rightDown = columns[columnIndex + 1] + (row - 1);
  const left = columns[columnIndex - 1] + row;
  const right = columns[columnIndex + 1] + row;
  const kingsideCastle = "g1"; //castling
  const queensideCastle = "c1"; //castling

  if (row < 8) { // logic for 'forward,' 'leftUp,' and 'rightUp'
    if (document.getElementById(forward).textContent === '') {
      legalMoves.push(forward);
    } else if (document.getElementById(forward).textContent !== '') {
      let content = document.getElementById(forward).textContent;
      let pieceCode = content.charCodeAt(0);

      for (let i = 0; i < blackPieces.length; i++) {
        if (blackPieces[i] === pieceCode) {
          legalMoves.push(forward);
          break
        }
      }
    }
    if (columnIndex > 0) {
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
    if (columnIndex < 7) {
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
  }
  if (row > 1) { // logic for 'back,' 'leftDown,' and 'rightDown'
    if (document.getElementById(back).textContent === '') {
      legalMoves.push(back);
    } else if (document.getElementById(back).textContent !== '') {
      let content = document.getElementById(back).textContent;
      let pieceCode = content.charCodeAt(0);

      for (let i = 0; i < blackPieces.length; i++) {
        if (blackPieces[i] === pieceCode) {
          legalMoves.push(back);
          break
        }
      }
    }
    if (columnIndex > 0) {
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
    if (columnIndex < 7) {
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
  if (columnIndex > 0) { // logic for 'left'
    if (document.getElementById(left).textContent === '') {
      legalMoves.push(left);
    } else if (document.getElementById(left).textContent !== '') {
      let content = document.getElementById(left).textContent;
      let pieceCode = content.charCodeAt(0);

      for (let i = 0; i < blackPieces.length; i++) {
        if (blackPieces[i] === pieceCode) {
          legalMoves.push(left);
          break
        }
      }
    }
  }
  if (columnIndex < 7) { // logic for 'right'
    if (document.getElementById(right).textContent === '') {
      legalMoves.push(right);
    } else if (document.getElementById(right).textContent !== '') {
      let content = document.getElementById(right).textContent;
      let pieceCode = content.charCodeAt(0);

      for (let i = 0; i < blackPieces.length; i++) {
        if (blackPieces[i] === pieceCode) {
          legalMoves.push(right);
          break
        }
      }
    }
  }

  if (!whiteKingInCheck(whiteKingLocation) && whiteKingMoved === 0 && whiteRook_KS === 0) { // logic for kingsideCastle
    if (document.getElementById("f1").textContent === '' &&
    document.getElementById("g1").textContent === '') {
      legalMoves.push(kingsideCastle);
    }
  }

  if (!whiteKingInCheck(whiteKingLocation) && whiteKingMoved === 0 && whiteRook_QS === 0) { // logic for queensideCastle
    if (document.getElementById("d1").textContent === '' &&
    document.getElementById("c1").textContent === '' &&
    document.getElementById("b1").textContent === '') {
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
          document.getElementById("h1").textContent = '';
          document.getElementById("f1").innerHTML = '&#9814;'; // white rook
          castling = kingsideCastle;
        } if (legalMoves[i] === queensideCastle) { // castling
          document.getElementById("a1").textContent = '';
          document.getElementById("d1").innerHTML = '&#9814;'; // white rook
          castling = queensideCastle;
        } if (document.getElementById(legalMoves[i]).textContent !== '') {
          document.querySelector(".black-taken").innerHTML =
          document.querySelector(".black-taken").innerHTML +
          document.getElementById(legalMoves[i]).innerHTML;
          document.getElementById(legalMoves[i]).innerHTML = '';
          pieceCaptured = true;
        }
        document.getElementById(currentSpot).textContent = '';
        document.getElementById(legalMoves[i]).innerHTML = '&#9812;';

        whiteKingLocation = legalMoves[i];

        if (legalMoves[i] === kingsideCastle) { // kingside castle check
          if (whiteKingInCheck("f1") || whiteKingInCheck("g1")) {
            document.getElementById(legalMoves[i]).innerHTML = '';
            document.getElementById(currentSpot).innerHTML = '&#9812;';
            document.getElementById("h1").innerHTML = '&#9814;'; // white rook
            document.getElementById("f1").innerHTML = '';
            whiteKingLocation = currentSpot;
            document.querySelector("p").innerHTML =
            `<b>Move not possible. White king left in check.</b>
            <br>White's turn.`;
            break
          }
        } if (legalMoves[i] === queensideCastle) { // queenside castle check
          if (whiteKingInCheck("d1") || whiteKingInCheck("c1")) {
            document.getElementById(legalMoves[i]).innerHTML = '';
            document.getElementById(currentSpot).innerHTML = '&#9812;';
            document.getElementById("a1").innerHTML = '&#9814;'; // white rook
            document.getElementById("d1").innerHTML = '';
            whiteKingLocation = currentSpot;
            document.querySelector("p").innerHTML =
            `<b>Move not possible. White king left in check.</b>
            <br>White's turn.`;
            break
          }
        } if (whiteKingInCheck(whiteKingLocation)) { // reverse illegal move
          document.getElementById(legalMoves[i]).innerHTML = '';
          document.getElementById(currentSpot).innerHTML = '&#9812;';
          whiteKingLocation = currentSpot;
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
              `White king moved from ${currentSpot} to ${legalMoves[i]}.
              <br><b>Black king in check.</b>
              <br>Black's turn.`;
              whiteKingMoved += 1; //castling
              whiteKingLocation = legalMoves[i]; //check and checkmate
            }
          } else {
            document.querySelector("p").innerHTML =
            `White king moved from ${currentSpot} to ${legalMoves[i]}.
            <br>Black's turn.`;
            whiteKingMoved += 1; //castling
            whiteKingLocation = legalMoves[i]; //check and checkmate
          }
          whitesTurn = false;

          let newMovement = { //add movement for 'forward' and 'back' buttons
            cell1: currentSpot,
            cell2: legalMoves[i],
            capture: pieceCaptured,
            promotion: false,
            pieceColor: "white",
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
