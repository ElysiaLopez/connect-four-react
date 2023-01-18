import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const ROWS = 6;
const COLS = 7;

class Square extends React.Component {
  render() {
    return <td id={`cell-${this.props.i}-${this.props.j}`} bgcolor={this.props.color} onClick={this.props.onClick}></td>;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cells: Array.from({ length: ROWS }, () => Array(COLS).fill('white')),
      isRed: true,
      statusLabel: 'Red next'
    };
  }
  render() {
    const rows = [];

    for (let row = 0; row < ROWS; row++) {
      const cols = [];
      for (let col = 0; col < COLS; col++) {
        cols.push(<Square key={`cell-${row}-${col}`} i={row} j={col} color={this.state.cells[row][col]} onClick={() => this.handleClick(row, col)} />);
      }
      rows.push(<tr key={`row-${row}`}>{cols}</tr>);
    }

    return (
      <div>
        <table>
          <tbody>{rows}</tbody>
        </table>
        <h3>{this.state.statusLabel}</h3>
      </div>
    );
  }

  findLowestAvailableCell(col) {
    for (let i = ROWS - 1; i >= 0; i--) {
      if (this.state.cells[i][col] == 'white') {
        return i;
      }
    }

    return -1;
  }

  checkDownDiagonal(row, col) {
    let count = 1;


    const cells = this.state.cells;
    let color = cells[row][col];

    for (let i = 1; i < 4; i++) {
      if (row + i >= ROWS || col + i >= COLS || cells[row + i][col + i] !== color) {
        break;
      }
      count++;
    }

    for (let i = 1; i < 4; i++) {
      if (row - i < 0 || col - i < 0 || cells[row - i][col - i] !== color) {
        break;
      }
      count++;
    }

    return count >= 4;
  }

  checkUpDiagonal(row, col) {
    let count = 1;
    const cells = this.state.cells;
    const color = cells[row][col];

    for (let i = 0; i < 4; i++) {
      if (row - i < 0 || col + i >= COLS || cells[row - i][col + i] !== color) {
        break;
      }
      count++;
    }

    for (let i = 0; i < 4; i++) {
      if (row + i >= ROWS || col - i < 0 || cells[row + i][col - i] !== color) {
        break;
      }
      count++;
    }

    return count >= 4;
  }

  checkHorizontal(row, col) {
    let count = 1;
    const cells = this.state.cells;
    const color = cells[row][col];

    for (let i = 1; i < 4; i++) {
      if (col + i >= COLS || cells[row][col + i] !== color) {
        break;
      }
      count++;
    }

    for (let i = 1; i < 4; i++) {
      if (col + i >= COLS || cells[row][col - i] !== color) {
        break;
      }
      count++;
    }

    return count >= 4;
  }

  checkVertical(row, col) {
    const cells = this.state.cells;
    const color = cells[row][col];

    let count = 1;

    for (let i = 1; i < 4 && row + i < ROWS; i++) {
      if (cells[row + i][col] !== color) {
        break;
      }
      count++;
    }

    for (let i = 1; i < 4 && row - i >= 0; i++) {
      if (cells[row - i][col] !== color) {
        break;
      }
      count++;
    }

    return count >= 4;

  }

  handleClick(row, col) {
    let newCells = this.state.cells.slice();

    row = this.findLowestAvailableCell(col);

    if (row === -1) return;

    newCells[row][col] = this.state.isRed ? 'red' : 'black';

    const checkWin = this.checkUpDiagonal(row, col) ||
      this.checkDownDiagonal(row, col) ||
      this.checkHorizontal(row, col) ||
      this.checkVertical(row, col)

    
    let newStatusLabel;

    if(checkWin)
    {
      newStatusLabel = this.state.isRed ? 'Red won!' : 'Black won!'
    }
    else
    {
      newStatusLabel = this.state.isRed ? 'Black next' : 'Red won';
    }

    this.setState({
      cells: newCells,
      isRed: !this.state.isRed,
      statusLabel: newStatusLabel
    });


  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Board />)
