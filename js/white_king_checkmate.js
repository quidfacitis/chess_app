const whiteKingCheckmate = (id) => {

  //The blackAttackingId needs to be stored in a separate variable because
  //other IDs will potentially be generated every time the whiteKingInCheck()
  //function is run
  const bAttackingId = blackAttackingId;

  //TEST 1: DETERMINE IF ATTACKING PIECE CAN BE CAPTURED BY NON-KING PIECE

  if (blackKingInCheck(bAttackingId)) {

    document.getElementById(id).innerHTML = '_'; //temporarily remove white king
                                                //to see if it is the only piece
                                                //that can capture the attacking piece

    //If the white king is the only piece that can capture the attacking piece,
    //but that move would be illegal, then it will fail the second test. It can
    //therefore be ignored by the first test.
    if (blackKingInCheck(bAttackingId)) {

      document.getElementById(id).innerHTML = '&#9812;'; // replace white king

      const bAttackingInnerHtml = document.getElementById(bAttackingId).innerHTML;

      document.getElementById(bAttackingId).innerHTML =
      document.getElementById(whiteAttackingId).innerHTML;
      document.getElementById(whiteAttackingId).innerHTML = '';

      let kingExposed = whiteKingInCheck(id);

      document.getElementById(whiteAttackingId).innerHTML =
      document.getElementById(bAttackingId).innerHTML;
      document.getElementById(bAttackingId).innerHTML = bAttackingInnerHtml;

      if (!kingExposed) {
        return false;
      }
    } else {
      document.getElementById(id).innerHTML = '&#9812;'; // replace white king
    }
  }

  //TEST 2: DETERMINE IF WHITE KING CAN MOVE OUT OF CHECK

  document.getElementById(id).innerHTML = ''; //temporarily remove white king
                                              //to determine the safety of its
                                              //legal moves
  const legalMoves = [];
  const row = Number(id[1]); //extract the row from the cell id
  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const columnIndex = columns.indexOf(id[0]);
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

  // determine if white king can move out of check
  if (legalMoves.length > 0) {
    for (let i = 0; i < legalMoves.length; i++) {
      if (!whiteKingInCheck(legalMoves[i])) {
        document.getElementById(id).innerHTML = '&#9812;'; // replace white king
        return false; // white king is not in checkmate
      } else {
        if (i === legalMoves.length - 1) {
          document.getElementById(id).innerHTML = '&#9812;'; // replace white king
        }
      }
    }
  } else {
    document.getElementById(id).innerHTML = '&#9812;'; // replace white king
  }

  //TEST 3: DETERMINE IF WHITE PIECE CAN MOVE IN FRONT OF THREATENED WHITE KING

  let bCellText = document.getElementById(bAttackingId).textContent;
  let bCellCode = bCellText.charCodeAt(0);

  if (bCellCode !== 9822) { // black knight

    // First, generate the cells between threatened king and attacking piece

    const bRow = Number(bAttackingId[1]); //extract the row from the cell id
    const bColumnIndex = columns.indexOf(bAttackingId[0]);

    const cellArray = [];

    let lowestColumnIndex = '';
    let highestColumnIndex = '';
    let lowestColumnRow = '';
    let highestColumnRow = '';

    if (bColumnIndex > columnIndex) {
      lowestColumnIndex = columnIndex;
      highestColumnIndex = bColumnIndex;
      lowestColumnRow = row;
      highestColumnRow = bRow;
    } else {
      lowestColumnIndex = bColumnIndex;
      highestColumnIndex = columnIndex;
      lowestColumnRow = bRow;
      highestColumnRow = row;
    }

    let counter = 1;

    if (lowestColumnIndex === highestColumnIndex) { //for vertical threats
      if (lowestColumnRow > highestColumnRow) {
        for (let i = lowestColumnRow - 1; i > highestColumnRow; i--) {
          let cell = columns[lowestColumnIndex] + i;
          cellArray.push(cell);
        }
      } else {
        for (let i = highestColumnRow - 1; i > lowestColumnRow; i--) {
          let cell = columns[lowestColumnIndex] + i;
          cellArray.push(cell);
        }
      }
    } if (lowestColumnRow === highestColumnRow) { // for horizontal threats
      for (let i = lowestColumnIndex + 1; i < highestColumnIndex; i++) {
        let cell = columns[i] + lowestColumnRow;
        cellArray.push(cell);
      }
    } else { // for diagonal threats
      for (let i = lowestColumnIndex + 1; i < highestColumnIndex; i++) {
        if (lowestColumnRow > highestColumnRow) {
          let j = lowestColumnRow - counter;
          let cell = columns[i] + j;
          cellArray.push(cell);
          counter++;
        } else {
          let j = lowestColumnRow + counter;
          let cell = columns[i] + j;
          cellArray.push(cell);
          counter++;
        }
      }
    }

    // Second, see if any white pieces can legally move to one of the identified cells

    if (cellArray.length > 0) {
      for (let i = 0; i < cellArray.length; i++) {
        let cellId = cellArray[i];
        let cellRow = Number(cellArray[i][1]);
        let twoDownId = cellArray[i][0] + (cellRow - 2);
        let oneDownId = cellArray[i][0] + (cellRow - 1);

        if (cellRow === 4 && document.getElementById(oneDownId).innerHTML === '') { // check pawns first
          if (document.getElementById(twoDownId).innerHTML !== '') {
            let cellText = document.getElementById(twoDownId).textContent;
            let cellCode = cellText.charCodeAt(0);
            if (cellCode === 9817) { // white pawn
              document.getElementById(twoDownId).innerHTML = ''; // temporarily remove white pawn
              document.getElementById(cellId).innerHTML = '&#9817;';
              let kingExposed = whiteKingInCheck(id); // verify if king would be left in check
              document.getElementById(twoDownId).innerHTML = '&#9817;'; // replace white pawn
              document.getElementById(cellId).innerHTML = '';
              if (!kingExposed) {
                return false;
              }
            }
          }
        } else {
          if (cellRow > 2) {
            if (document.getElementById(oneDownId).innerHTML !== '') {
              let cellText = document.getElementById(oneDownId).textContent;
              let cellCode = cellText.charCodeAt(0);
              if (cellCode === 9817) { // white pawn
                document.getElementById(oneDownId).innerHTML = ''; // temporarily remove white pawn
                document.getElementById(cellId).innerHTML = '&#9817;';
                let kingExposed = whiteKingInCheck(id); // verify if king would be left in check
                document.getElementById(oneDownId).innerHTML = '&#9817;'; // replace white pawn
                document.getElementById(cellId).innerHTML = '';
                if (!kingExposed) {
                  return false;
                }
              }
            }
          }
        }

        let removedPawnIds = [];

        const wNonPawnHero = (c) => { // 'c' for 'cellId'
          if (blackKingInCheck(c)) {
            let wText = document.getElementById(whiteAttackingId).textContent;
            let wCode = wText.charCodeAt(0);
            if (wCode === 9817 || wCode === 9812) { // white pawn/king
              document.getElementById(whiteAttackingId).innerHTML = ''; // temporarily remove white pawn/king
              removedPawnIds.push(whiteAttackingId); // store removed pawn/king id in array
              return wNonPawnHero(c);
            } else {
              if (removedPawnIds.length > 0) { // put back all the removed pieces
                for (let i = 0; i < removedPawnIds.length; i++) {
                  if (removedPawnIds[i] === id) {
                    document.getElementById(id).innerHTML = '&#9812;'; // replace white king
                  } else {
                    document.getElementById(removedPawnIds[i]).innerHTML = '&#9817;'; // replace white pawn
                  }
                }
              }

              removedPawnIds = []; // clear removedPawnIds array

              let wHeroInnerHtml = document.getElementById(whiteAttackingId).innerHTML;

              document.getElementById(cellId).innerHTML = wHeroInnerHtml;
              document.getElementById(whiteAttackingId).innerHTML = '';

              let kingExposed = whiteKingInCheck(id);

              document.getElementById(cellId).innerHTML = '';
              document.getElementById(whiteAttackingId).innerHTML = wHeroInnerHtml;

              if (!kingExposed) {
                return true;
              } else {
                return false;
              }
            }
          } else {
            return false;
          }
        }

        if (wNonPawnHero(cellId)) {
          if (removedPawnIds.length > 0) {
            for (let i = 0; i < removedPawnIds.length; i++) {
              if (removedPawnIds[i] === id) {
                document.getElementById(id).innerHTML = '&#9812;'; // replace white king
              } else {
                document.getElementById(removedPawnIds[i]).innerHTML = '&#9817;'; // replace white pawn
              }
            }
          }
          return false;
        } else {
          if (removedPawnIds.length > 0) {
            for (let i = 0; i < removedPawnIds.length; i++) {
              if (removedPawnIds[i] === id) {
                document.getElementById(id).innerHTML = '&#9812;'; // replace white king
              } else {
                document.getElementById(removedPawnIds[i]).innerHTML = '&#9817;'; // replace white pawn
              }
            }
          }
        }
      }
    }
  }
  // if all tests fail, return true
  console.log("White king in checkmate.");
  return true;
}
