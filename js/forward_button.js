const forwardButton = () => {

  currentIndex += 1;

  const moveObj = movements[currentIndex];

  if (moveObj.capture) {
    if (moveObj.pieceColor === "white") {
      if (moveObj.enPassant) {
        document.querySelector(".black-taken").innerHTML =
        document.querySelector(".black-taken").innerHTML +
        document.getElementById(moveObj.enPassant).innerHTML;
        document.getElementById(moveObj.enPassant).innerHTML = '';
      } else {
        document.querySelector(".black-taken").innerHTML =
        document.querySelector(".black-taken").innerHTML +
        document.getElementById(moveObj.cell2).innerHTML;
        document.getElementById(moveObj.cell2).innerHTML = '';
      }
    } else {
      if (moveObj.enPassant) {
        document.querySelector(".white-taken").innerHTML =
        document.querySelector(".white-taken").innerHTML +
        document.getElementById(moveObj.enPassant).innerHTML;
        document.getElementById(moveObj.enPassant).innerHTML = '';
      } else {
        document.querySelector(".white-taken").innerHTML =
        document.querySelector(".white-taken").innerHTML +
        document.getElementById(moveObj.cell2).innerHTML;
        document.getElementById(moveObj.cell2).innerHTML = '';
      }
    }
  }

  if (moveObj.promotion) {
    document.getElementById(moveObj.cell2).innerHTML = moveObj.promotionChoice;
    document.getElementById(moveObj.cell1).innerHTML = '';
  } else {

    if (moveObj.castling) {
      if (moveObj.pieceColor === "white") {
        if (moveObj.castling === 'g1') { //kingside castle
          document.getElementById('f1').innerHTML = '&#9814;'; //white rook
          document.getElementById('h1').innerHTML = '';
        } else { //queenside castle
          document.getElementById('d1').innerHTML = '&#9814;'; //white rook
          document.getElementById('a1').innerHTML = '';
        }
      } else {
        if (moveObj.castling === 'g8') { //kingside castle
          document.getElementById('f8').innerHTML = '&#9820;'; //black rook
          document.getElementById('h8').innerHTML = '';
        } else { //queenside castle
          document.getElementById('d8').innerHTML = '&#9820;'; //black rook
          document.getElementById('a8').innerHTML = '';
        }
      }
    }

    if (moveObj.isKing) {
      if (moveObj.pieceColor === "white") {
        whiteKingMoved += 1;
        whiteKingLocation = moveObj.cell2;
      } else {
        blackKingMoved += 1;
        blackKingLocation = moveObj.cell2;
      }
    }

    if (moveObj.isRook) {
      if (moveObj.pieceColor === "white") {
        if (moveObj.columnIndex === 0) {
          whiteRook_QS += 1;
        } if (moveObj.columnIndex === 7) {
          whiteRook_KS += 1;
        }
      } else {
        if (moveObj.columnIndex === 0) {
          blackRook_QS += 1;
        } if (moveObj.columnIndex === 7) {
          blackRook_KS += 1;
        }
      }
    }

    document.getElementById(moveObj.cell2).innerHTML =
    document.getElementById(moveObj.cell1).innerHTML;
    document.getElementById(moveObj.cell1).innerHTML = '';

    if (moveObj.twoForwardJump) {
      if (moveObj.pieceColor === "white") {
        whiteTwoForward = moveObj.cell2;
      } else {
        blackTwoForward = moveObj.cell2;
      }
    }
  }

  if (!gameOver) {
    if (moveObj.pieceColor === "white") {
      whitesTurn = false;
      document.querySelector("p").innerHTML = "Black's turn.";
    } else {
      whitesTurn = true;
      document.querySelector("p").innerHTML = "White's turn.";
    }
  }
  
  arrowColors();

}
