const blackPawn = (currentSpot, listener) => {

  const legalMoves = [];

  const row = Number(currentSpot[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(currentSpot[0]);

  const whitePieces = [9817, 9816, 9815, 9814, 9813, 9812];

  // make a list of potentially legal moves

  const oneForward = currentSpot[0] + (row - 1);
  const twoForward = currentSpot[0] + (row - 2);
  const leftAttack = columns[columnIndex + 1] + (row - 1);
  const rightAttack = columns[columnIndex - 1] + (row - 1);
  const rightAdjacentId = columns[columnIndex - 1] + row; // 'en passant'
  const leftAdjacentId = columns[columnIndex + 1] + row; // 'en passant'


  if (row > 1) {
    if (document.getElementById(oneForward).textContent === '') {
      legalMoves.push(oneForward);
    }

    if (document.getElementById(oneForward).textContent === '' && row === 7) {
      if (document.getElementById(twoForward).textContent === '') {
        legalMoves.push(twoForward);
      }
    }

    if (columnIndex !== 7) {
      if (leftAdjacentId === whiteTwoForward) { // 'en passant'
        legalMoves.push(leftAttack);
      } if (document.getElementById(leftAttack).textContent !== '') {
        let content = document.getElementById(leftAttack).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < whitePieces.length; i++) {
          if (whitePieces[i] === pieceCode) {
            legalMoves.push(leftAttack);
            break
          }
        }
      }
    }
    if (columnIndex !== 0) {
      if (rightAdjacentId === whiteTwoForward) { // 'en passant'
        legalMoves.push(rightAttack);
      } if (document.getElementById(rightAttack).textContent !== '') {
        let content = document.getElementById(rightAttack).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < whitePieces.length; i++) {
          if (whitePieces[i] === pieceCode) {
            legalMoves.push(rightAttack);
            break
          }
        }
      }
    }
  }

  let legalMove = '';
  let pieceCaptured = '';
  let moveReversed = '';
  let enPassant = '';
  let twoForwardJump = '';

  const blackPromotionListener = (event) => {
    const blackPromotionIds = ["black-queen", "black-rook", "black-bishop", "black-knight"];
    for (let i = 0; i < blackPromotionIds.length; i++) {
      if (event.target.id === blackPromotionIds[i]) {
        document.getElementById(legalMove).innerHTML =
        document.getElementById(blackPromotionIds[i]).innerHTML;
        let promotionChoice = document.getElementById(blackPromotionIds[i]).innerHTML;
        document.removeEventListener('click', blackPromotionListener);
        document.querySelector(".black-promotion-pieces").style.visibility = "hidden";
        document.addEventListener('click', listener);
        if (whiteKingInCheck(whiteKingLocation)) {
          if (whiteKingCheckmate(whiteKingLocation)) { //white king in checkmate
            document.querySelector("p").innerHTML =
            `<b>White king in checkmate.</b>
            <br>Black wins.`;
            gameOver = true;
          } else {
            document.querySelector("p").innerHTML =
            `<b>White king in check.</b>
            <br>White's turn.`;
          }
        } else {
          document.querySelector("p").innerHTML =
          `White's turn.`;
        }

        let newMovement = { //add movement for 'forward' and 'back' buttons
          cell1: currentSpot,
          cell2: legalMove,
          capture: pieceCaptured,
          enPassant: enPassant,
          promotion: true,
          promotionChoice: promotionChoice, //innerHTML
          pieceColor: "black"
        };
        movements = movements.slice(0, movements.length - 1) //remove last movement object
        currentIndex -= 1;
        if (currentIndex + 1 !== movements.length) {
          movements = movements.slice(0, currentIndex + 1)
          movements.push(newMovement);
        } else {
          movements.push(newMovement);
        }
        currentIndex += 1;

        break
      }
    }
  }

  const movePawnListener = (event) => {
    document.getElementById(currentSpot).classList.remove('selected');
    document.querySelector("p").innerHTML = '';
    for (let i = 0; i < legalMoves.length; i++) {
      if (event.target.id === legalMoves[i]) {
        legalMove = legalMoves[i]; //store outside of function for blackPromotionListener
        twoForwardJump = true;
        if (legalMoves[i] === twoForward) {
          blackTwoForward = twoForward; //stored temporarily for 'en passant'
        } if (legalMove === rightAttack && rightAdjacentId === whiteTwoForward) { // 'en passant' rightAttack
          document.querySelector(".white-taken").innerHTML =
          document.querySelector(".white-taken").innerHTML +
          document.getElementById(rightAdjacentId).innerHTML;
          document.getElementById(rightAdjacentId).innerHTML = '';
          pieceCaptured = true;
          enPassant = whiteTwoForward;
        } if (legalMove === leftAttack && leftAdjacentId === whiteTwoForward) { //'en passant' leftAttack
          document.querySelector(".white-taken").innerHTML =
          document.querySelector(".white-taken").innerHTML +
          document.getElementById(leftAdjacentId).innerHTML;
          document.getElementById(leftAdjacentId).innerHTML = '';
          pieceCaptured = true;
          enPassant = whiteTwoForward;
        } if (document.getElementById(legalMoves[i]).textContent !== '') {
          document.querySelector(".white-taken").innerHTML =
          document.querySelector(".white-taken").innerHTML +
          document.getElementById(legalMoves[i]).innerHTML;
          document.getElementById(legalMoves[i]).innerHTML = '';
          pieceCaptured = true;
        }
        document.getElementById(currentSpot).textContent = '';
        document.getElementById(legalMoves[i]).innerHTML = '&#9823;';

        if (blackKingInCheck(blackKingLocation)) { // reverse illegal move
          moveReversed = true;
          document.getElementById(legalMoves[i]).innerHTML = '';
          document.getElementById(currentSpot).innerHTML = '&#9823;';
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

            if (whiteKingCheckmate(whiteKingLocation)) { //white king in checkmate
              document.querySelector("p").innerHTML =
              `<b>White king in checkmate.</b>
              <br>Black wins.`;
              gameOver = true;
            } else {
              document.querySelector("p").innerHTML =
              `Black pawn moved from ${currentSpot} to ${legalMoves[i]}.
              <br><b>White king in check.</b>
              <br>White's turn.`;
            }
          } else {
            document.querySelector("p").innerHTML =
            `Black pawn moved from ${currentSpot} to ${legalMoves[i]}.
            <br>White's turn.`;
          }
          whitesTurn = true;

          let newMovement = { //add movement for 'forward' and 'back' buttons
            cell1: currentSpot,
            cell2: legalMove,
            capture: pieceCaptured,
            enPassant: enPassant,
            twoForwardJump: twoForwardJump,
            promotion: false,
            pieceColor: "black"
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
    if (row === 2 && legalMove && !moveReversed) {
      document.querySelector(".black-promotion-pieces").style.visibility = "visible";
      document.addEventListener('click', blackPromotionListener);
    } else {
      document.addEventListener('click', listener);
    }
  }

    document.addEventListener('click', movePawnListener);
}
