const backButton = () => {

  const moveObj = movements[currentIndex];

  if (moveObj.promotion) {
    if (moveObj.pieceColor === "white") {
      document.getElementById(moveObj.cell1).innerHTML = `&#9817;`; //white pawn
      document.getElementById(moveObj.cell2).innerHTML = '';
    } else {
      document.getElementById(moveObj.cell1).innerHTML = `&#9823;`; //black pawn
      document.getElementById(moveObj.cell2).innerHTML = '';
    }
    if (moveObj.capture) {
      if (moveObj.pieceColor === "white") {
        let capturedPieces = document.querySelector(".black-taken").textContent;
        let restoredPiece = capturedPieces.charCodeAt(capturedPieces.length - 1);
        document.getElementById(moveObj.cell2).innerHTML = `&#${restoredPiece};`;
        let newCapturedPieces = capturedPieces.slice(0, capturedPieces.length - 1);
        document.querySelector(".black-taken").innerHTML = newCapturedPieces;
      } else {
        let capturedPieces = document.querySelector(".white-taken").textContent;
        let restoredPiece = capturedPieces.charCodeAt(capturedPieces.length - 1);
        document.getElementById(moveObj.cell2).innerHTML = `&#${restoredPiece};`;
        let newCapturedPieces = capturedPieces.slice(0, capturedPieces.length - 1);
        document.querySelector(".white-taken").innerHTML = newCapturedPieces;
      }
    }
  } else {

    document.getElementById(moveObj.cell1).innerHTML =
    document.getElementById(moveObj.cell2).innerHTML;
    document.getElementById(moveObj.cell2).innerHTML = '';

    if (moveObj.castling) {
      if (moveObj.pieceColor === "white") {
        if (moveObj.castling === 'g1') { //kingside castle
          document.getElementById('f1').innerHTML = '';
          document.getElementById('h1').innerHTML = '&#9814;'; //white rook
        } else { //queenside castle
          document.getElementById('d1').innerHTML = '';
          document.getElementById('a1').innerHTML = '&#9814;'; //white rook
        }
      } else {
        if (moveObj.castling === 'g8') { //kingside castle
          document.getElementById('f8').innerHTML = '';
          document.getElementById('h8').innerHTML = '&#9820;'; //black rook
        } else { //queenside castle
          document.getElementById('d8').innerHTML = '';
          document.getElementById('a8').innerHTML = '&#9820;'; //black rook
        }
      }
    }

    if (moveObj.isKing) {
      if (moveObj.pieceColor === "white") {
        whiteKingMoved -= 1;
        whiteKingLocation = moveObj.cell1;
      } else {
        blackKingMoved -= 1;
        blackKingLocation = moveObj.cell1;
      }
    }

    if (moveObj.isRook) {
      if (moveObj.pieceColor === "white") {
        if (moveObj.columnIndex === 0) {
          whiteRook_QS -= 1;
        } if (moveObj.columnIndex === 7) {
          whiteRook_KS -= 1;
        }
      } else {
        if (moveObj.columnIndex === 0) {
          blackRook_QS -= 1;
        } if (moveObj.columnIndex === 7) {
          blackRook_KS -= 1;
        }
      }
    }

    if (moveObj.capture) { // restore captured piece from graveyard
      if (moveObj.pieceColor === "white") {
        if (moveObj.enPassant) {
          blackTwoForward = moveObj.enPassant; // allow for 'en passant' capture to take place again
          let capturedPieces = document.querySelector(".black-taken").textContent;
          let restoredPiece = capturedPieces.charCodeAt(capturedPieces.length - 1);
          document.getElementById(moveObj.enPassant).innerHTML = `&#${restoredPiece};`;
          let newCapturedPieces = capturedPieces.slice(0, capturedPieces.length - 1);
          document.querySelector(".black-taken").innerHTML = newCapturedPieces;
        } else {
          let capturedPieces = document.querySelector(".black-taken").textContent;
          let restoredPiece = capturedPieces.charCodeAt(capturedPieces.length - 1);
          document.getElementById(moveObj.cell2).innerHTML = `&#${restoredPiece};`;
          let newCapturedPieces = capturedPieces.slice(0, capturedPieces.length - 1);
          document.querySelector(".black-taken").innerHTML = newCapturedPieces;
        }
      } else {
        if (moveObj.enPassant) {
          whiteTwoForward = moveObj.enPassant; // allow for 'en passant' capture to take place again
          let capturedPieces = document.querySelector(".white-taken").textContent;
          let restoredPiece = capturedPieces.charCodeAt(capturedPieces.length - 1);
          document.getElementById(moveObj.enPassant).innerHTML = `&#${restoredPiece};`;
          let newCapturedPieces = capturedPieces.slice(0, capturedPieces.length - 1);
          document.querySelector(".white-taken").innerHTML = newCapturedPieces;
        } else {
          let capturedPieces = document.querySelector(".white-taken").textContent;
          let restoredPiece = capturedPieces.charCodeAt(capturedPieces.length - 1);
          document.getElementById(moveObj.cell2).innerHTML = `&#${restoredPiece};`;
          let newCapturedPieces = capturedPieces.slice(0, capturedPieces.length - 1);
          document.querySelector(".white-taken").innerHTML = newCapturedPieces;
        }
      }
    }
  }

  if (!gameOver) {
    if (moveObj.pieceColor === "white") {
      whitesTurn = true;
      document.querySelector("p").innerHTML = "White's turn.";
    } else {
      whitesTurn = false;
      document.querySelector("p").innerHTML = "Black's turn.";
    }
  }

  currentIndex -= 1;
  arrowColors();

}
