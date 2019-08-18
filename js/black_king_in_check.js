const blackKingInCheck = (id) => {
  const row = Number(id[1]); //extract the row from the cell id

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

  const columnIndex = columns.indexOf(id[0]);

  const whitePieces = [9817, 9816, 9815, 9814, 9813, 9812];

  //make list of possible threats

  let forwardLeft = columns[columnIndex + 1] + (row - 2); //white knight threat
  let forwardRight = columns[columnIndex - 1] + (row - 2);
  let leftUp = columns[columnIndex + 2] + (row - 1);
  let leftDown = columns[columnIndex + 2] + (row + 1);
  let downLeft = columns[columnIndex + 1] + (row + 2);
  let downRight = columns[columnIndex - 1] + (row + 2);
  let rightUp = columns[columnIndex - 2] + (row - 1);
  let rightDown = columns[columnIndex - 2] + (row + 1);

  if (columnIndex < 6) { // logic for 'leftUp' and 'leftDown'
    if (row > 1) {
      if (document.getElementById(leftUp).textContent !== '') {
        let content = document.getElementById(leftUp).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9816) { //white knight
          whiteAttackingId = leftUp;
          return true;
        }
      }
    }
    if (row < 8) {
      if (document.getElementById(leftDown).textContent !== '') {
        let content = document.getElementById(leftDown).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9816) { //white knight
          whiteAttackingId = leftDown;
          return true;
        }
      }
    }
  }

  if (columnIndex > 1) { // logic for 'rightUp' and 'rightDown'
    if (row > 1) {
      if (document.getElementById(rightUp).textContent !== '') {
        let content = document.getElementById(rightUp).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9816) { //white knight
          whiteAttackingId = rightUp;
          return true;
        }
      }
    }
    if (row < 8) {
      if (document.getElementById(rightDown).textContent !== '') {
        let content = document.getElementById(rightDown).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9816) { //white knight
          whiteAttackingId = rightDown;
          return true;
        }
      }
    }
  }

  if (row > 2) { // logic for 'forwardLeft' and 'forwardRight'
    if (columnIndex < 7) {
      if (document.getElementById(forwardLeft).textContent !== '') {
        let content = document.getElementById(forwardLeft).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9816) { //white knight
          whiteAttackingId = forwardLeft;
          return true;
        }
      }
    }
    if (columnIndex > 0) {
      if (document.getElementById(forwardRight).textContent !== '') {
        let content = document.getElementById(forwardRight).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9816) { //white knight
          whiteAttackingId = forwardRight;
          return true;
        }
      }
    }
  }

  if (row < 7) { // logic for 'downLeft' and 'downRight'
    if (columnIndex < 7) {
      if (document.getElementById(downLeft).textContent !== '') {
        let content = document.getElementById(downLeft).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9816) { //white knight
          whiteAttackingId = downLeft;
          return true;
        }
      }
    }
    if (columnIndex > 0) {
      if (document.getElementById(downRight).textContent !== '') {
        let content = document.getElementById(downRight).textContent;
        let pieceCode = content.charCodeAt(0);
        if (pieceCode === 9816) { //white knight
          whiteAttackingId = downRight;
          return true;
        }
      }
    }
  }

  const diagonalThreats = [9815, 9813]; // white bishop, queen (only long-range threats)

  if (row > 1) { // logic for 'fLeft' and 'fRight'
    if (columnIndex < 7) {
      for (let i = 1; i <= (7 - columnIndex); i++) {
        if (row - i === 0) { //bug fix
          break
        } else {
          let fLeft = columns[columnIndex + i] + (row - i);

          if (document.getElementById(fLeft).textContent !== '') {
            let content = document.getElementById(fLeft).textContent;
            let pieceCode = content.charCodeAt(0);

            if (i === 1 && pieceCode === 9812) { //white king
              whiteAttackingId = fLeft;
              return true;
            }

            if (i === 1 && pieceCode === 9817) { //white pawn
              whiteAttackingId = fLeft;
              return true;
            }

            for (let j = 0; j < diagonalThreats.length; j++) {
              if (diagonalThreats[j] === pieceCode) {
                whiteAttackingId = fLeft;
                return true;
              }
            }
            break
          }
        }
      }
    }
    if (columnIndex > 0) {
      for (let i = 1; i <= columnIndex; i++) {
        if (row - i === 0) { //bug fix
          break
        } else {
          let fRight = columns[columnIndex - i] + (row - i);

          if (document.getElementById(fRight).textContent !== '') {
            let content = document.getElementById(fRight).textContent;
            let pieceCode = content.charCodeAt(0);

            if (i === 1 && pieceCode === 9812) { //white king
              whiteAttackingId = fRight;
              return true;
            }

            if (i === 1 && pieceCode === 9817) { //white pawn
              whiteAttackingId = fRight;
              return true;
            }

            for (let j = 0; j < diagonalThreats.length; j++) {
              if (diagonalThreats[j] === pieceCode) {
                whiteAttackingId = fRight;
                return true;
              }
            }
            break
          }
        }
      }
    }
  }

  if (row < 8) { // logic for 'dLeft' and 'dRight'
    if (columnIndex < 7) {
      for (let i = 1; i <= (7 - columnIndex); i++) {
        if (row + i === 9) { //bug fix
          break
        } else {
          let dLeft = columns[columnIndex + i] + (row + i);

          if (document.getElementById(dLeft).textContent !== '') {
            let content = document.getElementById(dLeft).textContent;
            let pieceCode = content.charCodeAt(0);

            if (i === 1 && pieceCode === 9812) { //white king
              whiteAttackingId = dLeft;
              return true;
            }

            for (let j = 0; j < diagonalThreats.length; j++) {
              if (diagonalThreats[j] === pieceCode) {
                whiteAttackingId = dLeft;
                return true;
              }
            }
            break
          }
        }
      }
    }
    if (columnIndex > 0) {
      for (let i = 1; i <= columnIndex; i++) {
        if (row + i === 9) { //bug fix
          break
        } else {
          let dRight = columns[columnIndex - i] + (row + i);

          if (document.getElementById(dRight).textContent !== '') {
            let content = document.getElementById(dRight).textContent;
            let pieceCode = content.charCodeAt(0);

            if (i === 1 && pieceCode === 9812) { //white king
              whiteAttackingId = dRight;
              return true;
            }

            for (let j = 0; j < diagonalThreats.length; j++) {
              if (diagonalThreats[j] === pieceCode) {
                whiteAttackingId = dRight;
                return true;
              }
            }
            break
          }
        }
      }
    }
  }

  const perpendicularThreats = [9814, 9813] // only long-range threats

  if (row > 1) { // logic for 'forward'
    for (let i = 1; i <= row; i++) {
      if (row - i === 0) { //bug fix
        break
      } else {
        let forward = columns[columnIndex] + (row - i);

        if (document.getElementById(forward).textContent !== '') {
          let content = document.getElementById(forward).textContent;
          let pieceCode = content.charCodeAt(0);

          if (i === 1 && pieceCode === 9812) { //white king
            whiteAttackingId = forward;
            return true;
          }

          for (let j = 0; j < perpendicularThreats.length; j++) {
            if (perpendicularThreats[j] === pieceCode) {
              whiteAttackingId = forward;
              return true;
            }
          }
          break
        }
      }
    }
  }
  if (row < 8) { // logic for 'back'
    for (let i = 1; i <= (8 - row); i++) {
      if (row + i === 9) { //bug fix
        break
      } else {
        let back = columns[columnIndex] + (row + 1);

        if (document.getElementById(back).textContent !== '') {
          let content = document.getElementById(back).textContent;
          let pieceCode = content.charCodeAt(0);

          if (i === 1 && pieceCode === 9812) { //white king
            whiteAttackingId = back;
            return true;
          }

          for (let j = 0; j < perpendicularThreats.length; j++) {
            if (perpendicularThreats[j] === pieceCode) {
              whiteAttackingId = back;
              return true;
            }
          }
          break
        }
      }
    }
  }
  if (columnIndex < 7) { // logic for 'left'
    for (let i = 1; i <= (7 - columnIndex); i++) {
      if (columnIndex + i === 8) { //bug fix
        break
      } else {
        let left = columns[columnIndex + i] + (row);

        if (document.getElementById(left).textContent !== '') {
          let content = document.getElementById(left).textContent;
          let pieceCode = content.charCodeAt(0);

          if (i === 1 && pieceCode === 9812) { //white king
            whiteAttackingId = left;
            return true;
          }

          for (let j = 0; j < perpendicularThreats.length; j++) {
            if (perpendicularThreats[j] === pieceCode) {
              whiteAttackingId = left;
              return true;
            }
          }
          break
        }
      }
    }
  }
  if (columnIndex > 0) { // logic for 'right'
    for (let i = 1; i <= columnIndex; i++) {
      if (columnIndex - i === -1) { //bug fix
        break
      } else {
        let right = columns[columnIndex - i] + (row);

        if (document.getElementById(right).textContent !== '') {
          let content = document.getElementById(right).textContent;
          let pieceCode = content.charCodeAt(0);

          if (i === 1 && pieceCode === 9812) { //white king
            whiteAttackingId = right;
            return true;
          }

          for (let j = 0; j < perpendicularThreats.length; j++) {
            if (perpendicularThreats[j] === pieceCode) {
              whiteAttackingId = right;
              return true;
            }
          }
          break
        }
      }
    }
  }

}
