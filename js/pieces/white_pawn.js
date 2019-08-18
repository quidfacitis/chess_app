const whitePawn = (currentSpot, listener) => {

  const legalMoves = [];

  const row = Number(currentSpot[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(currentSpot[0]);

  const blackPieces = [9823, 9822, 9821, 9820, 9819, 9818];

  // make a list of potentially legal moves

  const oneForward = currentSpot[0] + (row + 1);
  const twoForward = currentSpot[0] + (row + 2);
  const leftAttack = columns[columnIndex - 1] + (row + 1);
  const rightAttack = columns[columnIndex + 1] + (row + 1);
  const rightAdjacentId = columns[columnIndex + 1] + row; // 'en passant' rightAttack
  const leftAdjacentId = columns[columnIndex - 1] + row; // 'en passant' rightAttack

  if (row < 8) {
    if (document.getElementById(oneForward).textContent === '') {
      legalMoves.push(oneForward);
    }

    if (document.getElementById(oneForward).textContent === '' && row === 2) {
      if (document.getElementById(twoForward).textContent === '') {
        legalMoves.push(twoForward);
      }
    }

    if (columnIndex !== 0) {
      if (leftAdjacentId === blackTwoForward) { // 'en passant'
        legalMoves.push(leftAttack);
      } if (document.getElementById(leftAttack).textContent !== '') {
        let content = document.getElementById(leftAttack).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(leftAttack);
            break
          }
        }
      }
    }

    if (columnIndex !== 7) {
      if (rightAdjacentId === blackTwoForward) { // 'en passant'
        legalMoves.push(rightAttack);
      } if (document.getElementById(rightAttack).textContent !== '') {
        let content = document.getElementById(rightAttack).textContent;
        let pieceCode = content.charCodeAt(0);

        for (let i = 0; i < blackPieces.length; i++) {
          if (blackPieces[i] === pieceCode) {
            legalMoves.push(rightAttack);
            break
          }
        }
      }
    }
  }

  let legalMove = '';
  let pieceCaptured = '';
  let moveReversed = ''; //bug fix for illegal pawn promotion
  let enPassant = '';
  let twoForwardJump = '';

  const whitePromotionListener = (event) => {
    const whitePromotionIds = ["white-queen", "white-rook", "white-bishop", "white-knight"];
    for (let i = 0; i < whitePromotionIds.length; i++) {
      if (event.target.id === whitePromotionIds[i]) {
        document.getElementById(legalMove).innerHTML =
        document.getElementById(whitePromotionIds[i]).innerHTML;
        let promotionChoice = document.getElementById(whitePromotionIds[i]).innerHTML;
        document.removeEventListener('click', whitePromotionListener);
        document.querySelector(".white-promotion-pieces").style.visibility = "hidden";
        document.addEventListener('click', listener);
        if (blackKingInCheck(blackKingLocation)) {
          if (blackKingCheckmate(blackKingLocation)) { //black king in checkmate
            document.querySelector("p").innerHTML =
            `<b>Black king in checkmate.</b>
            <br>White wins.`;
            gameOver = true;
          } else {
            document.querySelector("p").innerHTML =
            `<b>Black king in check.</b>
            <br>Black's turn.`;
          }  
        } else {
          document.querySelector("p").innerHTML =
          `Black's turn.`;
        }

        let newMovement = { //add movement for 'forward' and 'back' buttons
          cell1: currentSpot, // cell ID
          cell2: legalMove, // cell ID
          capture: pieceCaptured, //true or false
          enPassant: enPassant, //cell ID
          promotion: true,
          promotionChoice: promotionChoice, //innerHTML
          pieceColor: "white"
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
        legalMove = legalMoves[i];
        if (legalMoves[i] === twoForward) {
          whiteTwoForward = twoForward; //stored temporarily for 'en passant'
          twoForwardJump = true;
        } if (legalMove === rightAttack && rightAdjacentId === blackTwoForward) { // 'en passant' rightAttack
          document.querySelector(".black-taken").innerHTML =
          document.querySelector(".black-taken").innerHTML +
          document.getElementById(rightAdjacentId).innerHTML;
          document.getElementById(rightAdjacentId).innerHTML = '';
          pieceCaptured = true;
          enPassant = blackTwoForward;
        } if (legalMove === leftAttack && leftAdjacentId === blackTwoForward) { //'en passant' leftAttack
          document.querySelector(".black-taken").innerHTML =
          document.querySelector(".black-taken").innerHTML +
          document.getElementById(leftAdjacentId).innerHTML;
          document.getElementById(leftAdjacentId).innerHTML = '';
          pieceCaptured = true;
          enPassant = blackTwoForward;
        } if (document.getElementById(legalMoves[i]).textContent !== '') {
          document.querySelector(".black-taken").innerHTML =
          document.querySelector(".black-taken").innerHTML +
          document.getElementById(legalMoves[i]).innerHTML;
          document.getElementById(legalMoves[i]).innerHTML = '';
          pieceCaptured = true;
        }
        document.getElementById(currentSpot).textContent = '';
        document.getElementById(legalMoves[i]).innerHTML = '&#9817;';

        if (whiteKingInCheck(whiteKingLocation)) { // reverse illegal move
          moveReversed = true;
          document.getElementById(legalMoves[i]).innerHTML = '';
          document.getElementById(currentSpot).innerHTML = '&#9817;';
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
              `White pawn moved from ${currentSpot} to ${legalMoves[i]}.
              <br><b>Black king in check.</b>
              <br>Black's turn.`;
            }
          } else {
            document.querySelector("p").innerHTML =
            `White pawn moved from ${currentSpot} to ${legalMoves[i]}.
            <br>Black's turn.`;
          }
          whitesTurn = false;

          let newMovement = { //add movement for 'forward' and 'back' buttons
            cell1: currentSpot,
            cell2: legalMove,
            capture: pieceCaptured,
            enPassant: enPassant,
            twoForwardJump: twoForwardJump,
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
    if (row === 7 && legalMove && !moveReversed) {
      document.querySelector(".white-promotion-pieces").style.visibility = "visible";
      document.addEventListener('click', whitePromotionListener);
    } else {
      document.addEventListener('click', listener);
    }
  }

  document.addEventListener('click', movePawnListener);
}
