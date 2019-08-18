const blackKingCheckmate = (id) => {

  //The whiteAttackingId needs to be stored in a separate variable because
  //other IDs will potentially be generated every time the blackKingInCheck()
  //function is run
  const wAttackingId = whiteAttackingId;

  //TEST 1: DETERMINE IF ATTACKING PIECE CAN BE CAPTURED BY NON-KING PIECE

  if (whiteKingInCheck(wAttackingId)) {

    document.getElementById(id).innerHTML = '_'; //temporarily remove black king
                                                //to see if it is the only piece
                                                //that can capture the attacking piece

    //If the black king is the only piece that can capture the attacking piece,
    //but that move would be illegal, then it will fail the second test. It can
    //therefore be ignored by the first test.
    if (whiteKingInCheck(wAttackingId)) {

      document.getElementById(id).innerHTML = '&#9818;'; // replace black king

      const wAttackingInnerHtml = document.getElementById(wAttackingId).innerHTML;

      document.getElementById(wAttackingId).innerHTML =
      document.getElementById(blackAttackingId).innerHTML;
      document.getElementById(blackAttackingId).innerHTML = '';

      let kingExposed = blackKingInCheck(id);

      document.getElementById(blackAttackingId).innerHTML =
      document.getElementById(wAttackingId).innerHTML;
      document.getElementById(wAttackingId).innerHTML = wAttackingInnerHtml;

      if (!kingExposed) {
        console.log("White attacking piece can be legally captured.");
        return false;
      }
    } else {
      document.getElementById(id).innerHTML = '&#9818;'; // replace black king
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
  const whitePieces = [9817, 9816, 9815, 9814, 9813, 9812];

  // make a list of potentially legal moves
  const back = columns[columnIndex] + (row + 1);
  const rightDown = columns[columnIndex - 1] + (row + 1);
  const leftDown = columns[columnIndex + 1] + (row + 1);
  const forward = columns[columnIndex] + (row - 1);
  const rightUp = columns[columnIndex - 1] + (row - 1);
  const leftUp = columns[columnIndex + 1] + (row - 1);
  const right = columns[columnIndex - 1] + row;
  const left = columns[columnIndex + 1] + row;

  if (row < 8) { // logic for 'back,' 'rightDown,' and 'leftDown'
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
  }
  if (row > 1) { // logic for 'forward,' 'rightUp,' and 'leftUp'
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

  // determine if black king can move out of check
  if (legalMoves.length > 0) {
    for (let i = 0; i < legalMoves.length; i++) {
      if (!blackKingInCheck(legalMoves[i])) {
        document.getElementById(id).innerHTML = '&#9818;'; // replace black king
        console.log("Black king can legally move out of check.");
        return false; // black king is not in checkmate
      } else {
        if (i === legalMoves.length - 1) {
          document.getElementById(id).innerHTML = '&#9818;'; // replace black king
        }
      }
    }
  } else {
    document.getElementById(id).innerHTML = '&#9818;'; // replace black king
  }

  //TEST 3: DETERMINE IF BLACK PIECE CAN MOVE IN FRONT OF THREATENED BLACK KING

  let wCellText = document.getElementById(wAttackingId).textContent;
  let wCellCode = wCellText.charCodeAt(0);

  if (wCellCode !== 9816) { // white knight

    // First, generate the cells between threatened king and attacking piece

    const wRow = Number(wAttackingId[1]); //extract the row from the cell id
    const wColumnIndex = columns.indexOf(wAttackingId[0]);

    const cellArray = [];

    let lowestColumnIndex = '';
    let highestColumnIndex = '';
    let lowestColumnRow = '';
    let highestColumnRow = '';

    if (wColumnIndex > columnIndex) {
      lowestColumnIndex = columnIndex;
      highestColumnIndex = wColumnIndex;
      lowestColumnRow = row;
      highestColumnRow = wRow;
    } else {
      lowestColumnIndex = wColumnIndex;
      highestColumnIndex = columnIndex;
      lowestColumnRow = wRow;
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

    console.log(cellArray);

    // Second, see if any white pieces can legally move to one of the identified cells

    if (cellArray.length > 0) {
      for (let i = 0; i < cellArray.length; i++) {
        let cellId = cellArray[i];
        let cellRow = Number(cellArray[i][1]);
        let twoDownId = cellArray[i][0] + (cellRow + 2);
        let oneDownId = cellArray[i][0] + (cellRow + 1);

        if (cellRow === 5 && document.getElementById(oneDownId).innerHTML === '') { // check pawns first
          if (document.getElementById(twoDownId).innerHTML !== '') {
            let cellText = document.getElementById(twoDownId).textContent;
            let cellCode = cellText.charCodeAt(0);
            if (cellCode === 9823) { // black pawn
              console.log(`The pawn at ${twoDownId} can potentially move two spaces to save the king.`)

              document.getElementById(twoDownId).innerHTML = ''; // temporarily remove black pawn
              document.getElementById(cellId).innerHTML = '&#9823;';
              let kingExposed = blackKingInCheck(id); // verify if king would be left in check
              document.getElementById(twoDownId).innerHTML = '&#9823;'; // replace black pawn
              document.getElementById(cellId).innerHTML = '';
              if (!kingExposed) {
                console.log(`The pawn at ${twoDownId} can legally move to ${cellId}.`);
                return false;
              } else {
                console.log(`The pawn at ${twoDownId} CANNOT legally move to ${cellId}.`);
              }
            }
          }
        } else {
          if (cellRow < 7) {
            if (document.getElementById(oneDownId).innerHTML !== '') {
              let cellText = document.getElementById(oneDownId).textContent;
              let cellCode = cellText.charCodeAt(0);
              if (cellCode === 9823) { // black pawn
                console.log(`The pawn at ${oneDownId} can potentially move one space to save the king.`)

                document.getElementById(oneDownId).innerHTML = ''; // temporarily remove black pawn
                document.getElementById(cellId).innerHTML = '&#9823;';
                let kingExposed = blackKingInCheck(id); // verify if king would be left in check
                document.getElementById(oneDownId).innerHTML = '&#9823;'; // replace white pawn
                document.getElementById(cellId).innerHTML = '';
                if (!kingExposed) {
                  console.log(`The pawn at ${oneDownId} can legally move to ${cellId}.`);
                  return false;
                } else {
                  console.log(`The pawn at ${oneDownId} CANNOT legally move to ${cellId}.`);
                }
              }
            }
          }
        }

        let removedPawnIds = [];

        const bNonPawnHero = (c) => { // 'c' for 'cellId'
          if (whiteKingInCheck(c)) {
            let bText = document.getElementById(blackAttackingId).textContent;
            let bCode = bText.charCodeAt(0);
            if (bCode === 9823 || bCode === 9818) { // black pawn/king
              document.getElementById(blackAttackingId).innerHTML = ''; // temporarily remove black pawn/king
              removedPawnIds.push(blackAttackingId); // store removed pawn/king id in array
              return bNonPawnHero(c);
            } else {
              if (removedPawnIds.length > 0) { // put back all the removed pieces
                for (let i = 0; i < removedPawnIds.length; i++) {
                  if (removedPawnIds[i] === id) {
                    document.getElementById(id).innerHTML = '&#9818;'; // replace black king
                  } else {
                    document.getElementById(removedPawnIds[i]).innerHTML = '&#9823;'; // replace black pawn
                  }
                }
              }

              removedPawnIds = []; // clear removedPawnIds array

              let bHeroInnerHtml = document.getElementById(blackAttackingId).innerHTML;

              document.getElementById(cellId).innerHTML = bHeroInnerHtml;
              document.getElementById(blackAttackingId).innerHTML = '';

              let kingExposed = blackKingInCheck(id);

              document.getElementById(cellId).innerHTML = '';
              document.getElementById(blackAttackingId).innerHTML = bHeroInnerHtml;

              if (!kingExposed) {
                console.log(`The black piece at ${blackAttackingId} can save the king.`);
                return true;
              } else {
                console.log(`The white piece at ${blackAttackingId} CANNOT save the king.`);
                return false;
              }
            }
          } else {
            return false;
          }
        }

        if (bNonPawnHero(cellId)) {
          if (removedPawnIds.length > 0) {
            for (let i = 0; i < removedPawnIds.length; i++) {
              if (removedPawnIds[i] === id) {
                document.getElementById(id).innerHTML = '&#9818;'; // replace black king
              } else {
                document.getElementById(removedPawnIds[i]).innerHTML = '&#9823;'; // replace black pawn
              }
            }
          }
          console.log(`A non-pawn black piece can potentially move to ${cellId} to protect the king.`);
          return false;
        } else {
          if (removedPawnIds.length > 0) {
            for (let i = 0; i < removedPawnIds.length; i++) {
              if (removedPawnIds[i] === id) {
                document.getElementById(id).innerHTML = '&#9818;'; // replace black king
              } else {
                document.getElementById(removedPawnIds[i]).innerHTML = '&#9823;'; // replace black pawn
              }
            }
          }
          console.log(`No non-pawn black pieces can potentially move to ${cellId} to protect the king.`);
        }
      }
    }
  }
  // if all tests fail, return true
  console.log("Black king in checkmate.");
  return true;
}
