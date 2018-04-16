import React, { Component } from 'react'
import Knight from './Knight'
import BoardSquare from './BoardSquare'
import PropTypes from 'prop-types'
import { moveKnight, canMoveKnight } from './Game';
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

/*
    Had to change board https://github.com/react-dnd/react-dnd/issues/830
 */
class Board extends Component {
    static propTypes = {
        knightPosition: PropTypes.arrayOf(
            PropTypes.number.isRequired
        ).isRequired
    }

    handleSquareClick(toX, toY) {
        if (canMoveKnight(toX, toY)) {
            moveKnight(toX, toY);
        }
    }

    renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
            return <Knight/>;
        }
    }

    renderSquare(i) {
        const x = i % 8
        const y = Math.floor( i / 8 )
        const black = (x + y) % 2 === 1
        const [knightX, knightY] = this.props.knightPosition
        const piece = ( x === knightX && y === knightY ) ? <Knight/> : null;

        return (
            <div key={i}
                 style={{ width: '12.5%', height: '12.5%' }}
                 onClick={() => this.handleSquareClick(x, y)}>
                <BoardSquare x={x} y={y}>
                    {this.renderPiece(x, y)}
                </BoardSquare>
            </div>
        )
    }

    render() {
        const squares =[]
        for (let i = 0; i < 64; i++){
            squares.push(this.renderSquare(i))
        }
        return (
            <div style={{
                width: '30vw',
                height: '30vh',
                display: 'flex',
                flexWrap: 'wrap'
            }}>
                {squares}
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(Board)