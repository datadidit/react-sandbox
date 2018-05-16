import React, {Component} from 'react'
import {MultiGrid, AutoSizer} from 'react-virtualized'
import data from '../data/org_stats'
import family from '../data/family'
import {getFamilyCells, getBattingStats, headers} from "./utils";


class MultiGridExample extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rows: this.props.batting || data.BATTING,
            headers: this.props.headers || headers,
            family: this.props.family || family
        }
    }

    _cellRenderer = ({columnIndex, key, rowIndex, style}) => {
        const { rows, headers } = this.state

        if(rowIndex == 0){
            return (
                <div key={key} style={style}>
                    {headers[columnIndex]['title']}
                </div>
            )
        }else{
            return (
                <div key={key} style={style}>
                    {getBattingStats(columnIndex, headers, rows[rowIndex])}
                </div>
            )
        }
    }

    render() {
        const { rows, family, headers } = this.state

        return (
            <div style={{
                width: 500
            }}>
                <h3>Multi Grid Example</h3>
                <AutoSizer disableHeight>
                    {({width}) => (
                        <MultiGrid
                            cellRenderer={this._cellRenderer}
                            columnWidth={140}
                            columnCount={headers.length}
                            fixedRowCount={1}
                            fixedColumnCount={1}
                            height={300}
                            rowHeight={40}
                            rowCount={rows.length}
                            width={width}
                        />
                    )}
                </AutoSizer>
            </div>
        )
    }
}

export default MultiGridExample