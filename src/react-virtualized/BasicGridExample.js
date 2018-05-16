import React, {Component} from 'react'
import {Grid, AutoSizer} from 'react-virtualized'
import family from '../data/family'
import { getFamilyCells } from "./utils";


class BasicGridExample extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.data || family
        }
    }

    _cellRenderer = ({columnIndex, key, rowIndex, style}) => {
        const { data } = this.state
        return (
            <div key={key}
                 style={style}>
                {getFamilyCells(columnIndex, data[rowIndex])}
            </div>
        )
    }

    render() {
        const { data } = this.state

        return (
            <div>
                <h3>Basic Grid with AutoSizer</h3>
                <AutoSizer>
                    {({width}) => (
                        <Grid
                            cellRenderer={this._cellRenderer}
                            columnCount={4}
                            columnWidth={100}
                            height={300}
                            rowCount={data.length}
                            rowHeight={30}
                            width={width}/>
                    )}
                </AutoSizer>
            </div>
        )

    }
}

export default BasicGridExample