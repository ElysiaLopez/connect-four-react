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
      cells: Array.from({length: 6}, () => Array(7).fill('white')),
      isRed: true
    };
  }
  render() {
    const rows = [];

    for (let row = 0; row < ROWS; row++) {
      const cols = [];
      for (let col = 0; col < COLS; col++) {
        cols.push(<Square key={`cell-${row}-${col}`} i={row} j={col} color={this.state.cells[row][col]} onClick={() => this.handleClick(row, col)}/>);
      }
      rows.push(<tr key={`row-${row}`}>{cols}</tr>);
    }

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  handleClick(row, col)
  {
    console.log("hola");

    let newCells = this.state.cells.slice();

    for(let i = 0; i < newCells.length; i++)
    {
      for(let j = 0; j < newCells[0].length; j++)
      {
        if(i === row && j === col)
        {
          newCells[i][j] = this.state.isRed ? 'red' : 'black';
        }
      }
    }

    this.setState({
      cells: newCells,
      isRed: !this.state.isRed
    });
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Board />)

let test = Array.from({length: 5}, _ => (Array.from({length: 6}, )));