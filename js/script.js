// white_pawn = &#9817;
// white_knight = &#9816;
// white_bishop = &#9815;
// white_rook = &#9814;
// white_queen = &#9813;
// white_king = &#9812;
//
// black_pawn = &#9823;
// black_knight = &#9822;
// black_bishop = &#9821;
// black_rook = &#9820;
// black_queen = &#9819;
// black_king = &#9818;

let whitesTurn = true;
let gameOver = false;

let whiteTwoForward = ''; // 'en passant'
let blackTwoForward = '';

let whiteKingMoved = 0; // castling
let whiteRook_KS = 0;
let whiteRook_QS = 0;
let blackKingMoved = 0;
let blackRook_KS = 0;
let blackRook_QS = 0;

let whiteKingLocation = 'e1'; // check and checkmate
let blackKingLocation = 'e8';
let blackAttackingId = '';
let whiteAttackingId = '';

let movements = []; //back and forward buttons
let currentIndex = -1;

let blackTimerInterval = '';
let whiteTimerInterval = '';
let blackTimerRunning = false;
let whiteTimerRunning = false;

const startGame = () => {
    const piecesListener = (event) => {

      const x = event.target.textContent;
      const charCode = x.charCodeAt(0);

      const elementId = event.target.id;
      const clickedElement = document.getElementById(elementId);

      if (charCode === 10502) { //back button
        if (currentIndex >= 0) {
          backButton();
        }
      }
      if (charCode === 10503) { //forward button
        if (currentIndex < movements.length - 1) {
          forwardButton();
        }
      }
      
      if (!gameOver) {
        if (whitesTurn) {
          whiteTwoForward = '';
          if (charCode === 9812) {
            document.querySelector("p").innerHTML = `White king (${elementId}) selected.`;
            clickedElement.classList.add('selected');
            document.removeEventListener('click', piecesListener);
            whiteKing(elementId, piecesListener);
          } if (charCode === 9813) {
            document.querySelector("p").innerHTML = `White queen (${elementId}) selected.`;
            clickedElement.classList.add('selected');
            document.removeEventListener('click', piecesListener);
            whiteQueen(elementId, piecesListener);
          } if (charCode === 9814) {
            document.querySelector("p").innerHTML = `White rook (${elementId}) selected.`;
            clickedElement.classList.add('selected');
            document.removeEventListener('click', piecesListener);
            whiteRook(elementId, piecesListener);
          } if (charCode === 9815) {
            document.querySelector("p").innerHTML = `White bishop (${elementId}) selected.`;
            clickedElement.classList.add('selected');
            document.removeEventListener('click', piecesListener);
            whiteBishop(elementId, piecesListener);
          } if (charCode === 9816) {
            document.querySelector("p").innerHTML = `White knight (${elementId}) selected.`;
            clickedElement.classList.add('selected');
            document.removeEventListener('click', piecesListener);
            whiteKnight(elementId, piecesListener);
          } if (charCode === 9817) {
            document.querySelector("p").innerHTML = `White pawn (${elementId}) selected.`;
            clickedElement.classList.add('selected');
            document.removeEventListener('click', piecesListener);
            whitePawn(elementId, piecesListener);
          }
        }

        if (!whitesTurn) {
          blackTwoForward = '';
          if (charCode === 9818) {
           document.querySelector("p").innerHTML = `Black king (${elementId}) selected.`;
           clickedElement.classList.add('selected');
           document.removeEventListener('click', piecesListener);
           blackKing(elementId, piecesListener);
         } if (charCode === 9819) {
           document.querySelector("p").innerHTML = `Black queen (${elementId}) selected.`;
           clickedElement.classList.add('selected');
           document.removeEventListener('click', piecesListener);
           blackQueen(elementId, piecesListener);
         } if (charCode === 9820) {
           document.querySelector("p").innerHTML = `Black rook (${elementId}) selected.`;
           clickedElement.classList.add('selected');
           document.removeEventListener('click', piecesListener);
           blackRook(elementId, piecesListener);
         } if (charCode === 9821) {
           document.querySelector("p").innerHTML = `Black bishop (${elementId}) selected.`;
           clickedElement.classList.add('selected');
           document.removeEventListener('click', piecesListener);
           blackBishop(elementId, piecesListener);
         } if (charCode === 9822) {
           document.querySelector("p").innerHTML = `Black knight (${elementId}) selected.`;
           clickedElement.classList.add('selected');
           document.removeEventListener('click', piecesListener);
           blackKnight(elementId, piecesListener);
         } if (charCode === 9823) {
           document.querySelector("p").innerHTML = `Black pawn (${elementId}) selected.`;
           clickedElement.classList.add('selected');
           document.removeEventListener('click', piecesListener);
           blackPawn(elementId, piecesListener);
          }
        }
      }
    }

  document.addEventListener('click', piecesListener);

}

// king data --> after every move on the board, a function has to run to
// check if either king is in check or could be put in check... not an easy
// problem to solve! This will probably involve inspecting all of the rows,
// columns and diagonals that intersect each king, in addition to the 'box'
// around each king from which an enemy knight could attack.

// FOR CHECKMATE:
//
// Run the "blackKingInCheck" function on the piece that has placed the white king in check. If it comes back as false, then killing the attacking piece is not an option. --> if it is true, but the king is exposed by the piece that kills the attacking piece, then killing the attacking piece is still not an option.
//
// Make a list of legal moves for threatened king and run the "whiteKingInCheck" function on each of those spots. If all of them come back as true, then moving the king is not an option.
//
// If the attacking piece is not a knight, then determine how many spaces, if any, are between the attacking piece and the threatened king. Run the 'blackKingInCheck' function on all of those spaces. If all of them come back as false, then placing another piece in front of the king isn't an option. --> if it is true, but the king is exposed by the piece that moves in front of the attacking piece, then this move is still not an option.
//
// If all three scenarios are determined to be impossible, then the king is declared to be in checkmate.
