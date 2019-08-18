const whiteKingInCheck = (id) => {
  const row = Number(id[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(id[0]);

  const blackPieces = [9823, 9822, 9821, 9820, 9819, 9818];

  //make list of possible threats

  let forwardLeft = columns[columnIndex - 1] + (row + 2); //black knight threat
  let forwardRight = columns[columnIndex + 1] + (row + 2);
  let leftUp = columns[columnIndex - 2] + (row + 1);
  let leftDown = columns[columnIndex - 2] + (row - 1);
  let downLeft = columns[columnIndex - 1] + (row - 2);
  let downRight = columns[columnIndex + 1] + (row - 2);
  let rightUp = columns[columnIndex + 2] + (row + 1);
  let rightDown = columns[columnIndex + 2] + (row - 1);

  if (columnIndex > 1) { // logic for 'leftUp' and 'leftDown'
    if (row < 8) {
      if (document.getElementById(leftUp).textContent !== '') {
        let content = document.getElementById(leftUp).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9822) { //black knight
          blackAttackingId = leftUp;
          return true;
        }
      }
    }
    if (row > 1) {
      if (document.getElementById(leftDown).textContent !== '') {
        let content = document.getElementById(leftDown).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9822) { //black knight
          blackAttackingId = leftDown;
          return true;
        }
      }
    }
  }

  if (columnIndex < 6) { // logic for 'rightUp' and 'rightDown'
    if (row < 8) {
      if (document.getElementById(rightUp).textContent !== '') {
        let content = document.getElementById(rightUp).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9822) { //black knight
          blackAttackingId = rightUp;
          return true;
        }
      }
    }
    if (row > 1) {
      if (document.getElementById(rightDown).textContent !== '') {
        let content = document.getElementById(rightDown).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9822) { //black knight
          blackAttackingId = rightDown;
          return true;
        }
      }
    }
  }

  if (row < 7) { // logic for 'forwardLeft' and 'forwardRight'
    if (columnIndex > 0) {
      if (document.getElementById(forwardLeft).textContent !== '') {
        let content = document.getElementById(forwardLeft).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9822) { //black knight
          blackAttackingId = forwardLeft;
          return true;
        }
      }
    }
    if (columnIndex < 7) {
      if (document.getElementById(forwardRight).textContent !== '') {
        let content = document.getElementById(forwardRight).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9822) { //black knight
          blackAttackingId = forwardRight;
          return true;
        }
      }
    }
  }

  if (row > 2) { // logic for 'downLeft' and 'downRight'
    if (columnIndex > 0) {
      if (document.getElementById(downLeft).textContent !== '') {
        let content = document.getElementById(downLeft).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9822) { //black knight
          blackAttackingId = downLeft;
          return true;
        }
      }
    }
    if (columnIndex < 7) {
      if (document.getElementById(downRight).textContent !== '') {
        let content = document.getElementById(downRight).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9822) { //black knight
          blackAttackingId = downRight;
          return true;
        }
      }
    }
  }


  const diagonalThreats = [9821, 9819]; // black bishop, queen (only long-range threats)

  if (row < 8) { // logic for 'fLeft' and 'fRight'
    if (columnIndex > 0) {
      for (let i = 1; i <= columnIndex; i++) {
        if (row + i === 9) { //bug fix
          break
        } else {
          let fLeft = columns[columnIndex - i] + (row + i);

          if (document.getElementById(fLeft).textContent !== '') {
            let content = document.getElementById(fLeft).textContent;
            let pieceCode = content.charCodeAt(0);

            if (i === 1 && pieceCode === 9818) { //black king
              blackAttackingId = fLeft;
              return true;
            }

            if (i === 1 && pieceCode === 9823) { //black pawn
              blackAttackingId = fLeft;
              return true;
            }

            for (let j = 0; j < diagonalThreats.length; j++) {
              if (diagonalThreats[j] === pieceCode) {
                blackAttackingId = fLeft;
                return true;
              }
            }
            break
          }
        }
      }
    }
    if (columnIndex < 7) {
      for (let i = 1; i <= (7 - columnIndex); i++) {
        if (row + i === 9) { //bug fix
          break
        } else {
          let fRight = columns[columnIndex + i] + (row + i);

          if (document.getElementById(fRight).textContent !== '') {
            let content = document.getElementById(fRight).textContent;
            let pieceCode = content.charCodeAt(0);

            if (i === 1 && pieceCode === 9818) { //black king
              blackAttackingId = fRight;
              return true;
            }

            if (i === 1 && pieceCode === 9823) { //black pawn
              blackAttackingId = fRight;
              return true;
            }

            for (let j = 0; j < diagonalThreats.length; j++) {
              if (diagonalThreats[j] === pieceCode) {
                blackAttackingId = fRight;
                return true;
              }
            }
            break
          }
        }
      }
    }
  }

  if (row > 1) { // logic for 'dLeft' and 'dRight'
    if (columnIndex > 0) {
      for (let i = 1; i <= columnIndex; i++) {
        if (row - i === 0) { //bug fix
          break
        } else {
          let dLeft = columns[columnIndex - i] + (row - i);

          if (document.getElementById(dLeft).textContent !== '') {
            let content = document.getElementById(dLeft).textContent;
            let pieceCode = content.charCodeAt(0);

            if (i === 1 && pieceCode === 9818) { //black king
              blackAttackingId = dLeft;
              return true;
            }

            for (let j = 0; j < diagonalThreats.length; j++) {
              if (diagonalThreats[j] === pieceCode) {
                blackAttackingId = dLeft;
                return true;
              }
            }
            break
          }
        }
      }
    }
    if (columnIndex < 7) {
      for (let i = 1; i <= (7 - columnIndex); i++) {
        if (row - i === 0) { //bug fix
          break
        } else {
          let dRight = columns[columnIndex + i] + (row - i);

          if (document.getElementById(dRight).textContent !== '') {
            let content = document.getElementById(dRight).textContent;
            let pieceCode = content.charCodeAt(0);

            if (i === 1 && pieceCode === 9818) { //black king
              blackAttackingId = dRight;
              return true;
            }

            for (let j = 0; j < diagonalThreats.length; j++) {
              if (diagonalThreats[j] === pieceCode) {
                blackAttackingId = dRight;
                return true;
              }
            }
            break
          }
        }
      }
    }
  }

  let forward = columns[columnIndex] + (row + 1); // black rook, queen and king threats
  let back = columns[columnIndex] + (row - 1);
  let left = columns[columnIndex - 1] + (row);
  let right = columns[columnIndex + 1] + (row);
  const perpendicularThreats = [9820, 9819] // only long-range threats

  if (row < 8) { // logic for 'forward'
    for (let i = 1; i <= (8 - row); i++) {
      if (row + i === 9) { //bug fix
        break
      } else {
        let forward = columns[columnIndex] + (row + i);

        if (document.getElementById(forward).textContent !== '') {
          let content = document.getElementById(forward).textContent;
          let pieceCode = content.charCodeAt(0);

          if (i === 1 && pieceCode === 9818) { //black king
            blackAttackingId = forward;
            return true;
          }

          for (let j = 0; j < perpendicularThreats.length; j++) {
            if (perpendicularThreats[j] === pieceCode) {
              blackAttackingId = forward;
              return true;
            }
          }
          break
        }
      }
    }
  }
  if (row > 1) { // logic for 'back'
    for (let i = 1; i <= row; i++) {
      if (row - i === 0) { //bug fix
        break
      } else {
        let back = columns[columnIndex] + (row - i);

        if (document.getElementById(back).textContent !== '') {
          let content = document.getElementById(back).textContent;
          let pieceCode = content.charCodeAt(0);

          if (i === 1 && pieceCode === 9818) { //black king
            blackAttackingId = back;
            return true;
          }

          for (let j = 0; j < perpendicularThreats.length; j++) {
            if (perpendicularThreats[j] === pieceCode) {
              blackAttackingId = back;
              return true;
            }
          }
          break
        }
      }
    }
  }
  if (columnIndex > 0) { // logic for 'left'
    for (let i = 1; i <= columnIndex; i++) {
      if (columnIndex - i === -1) { //bug fix
        break
      } else {
        let left = columns[columnIndex - i] + (row);

        if (document.getElementById(left).textContent !== '') {
          let content = document.getElementById(left).textContent;
          let pieceCode = content.charCodeAt(0);

          if (i === 1 && pieceCode === 9818) { //black king
            blackAttackingId = left;
            return true;
          }

          for (let j = 0; j < perpendicularThreats.length; j++) {
            if (perpendicularThreats[j] === pieceCode) {
              blackAttackingId = left;
              return true;
            }
          }
          break
        }
      }
    }
  }
  if (columnIndex < 7) { // logic for 'right'
    for (let i = 1; i <= (7 - columnIndex); i++) {
      if (columnIndex + i === 8) { //bug fix
        break
      } else {
        let right = columns[columnIndex + i] + (row);

        if (document.getElementById(right).textContent !== '') {
          let content = document.getElementById(right).textContent;
          let pieceCode = content.charCodeAt(0);

          if (i === 1 && pieceCode === 9818) { //black king
            blackAttackingId = right;
            return true;
          }

          for (let j = 0; j < perpendicularThreats.length; j++) {
            if (perpendicularThreats[j] === pieceCode) {
              blackAttackingId = right;
              return true;
            }
          }
          break
        }
      }
    }
  }

}
