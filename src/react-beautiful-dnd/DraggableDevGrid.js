import React, {Component} from 'react'
import {
    Grid,
    Table,
    TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';
import {Draggable, Droppable, DragDropContext} from 'react-beautiful-dnd'

const TableRow = ({row, ...restProps}) => (
    <Draggable draggableId={row.name} index={row.rank}>
        {(provided, snapshot) => (
            <Table.Row
                {...restProps}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragableHandleProps}
            />
        )}

    </Draggable>
);

class TableRowComp extends Component {
    render() {
        console.log(this.props)
        const { row } = this.props
        return (
            <Draggable draggableId={row.name} index={row.rank}>
                {(provided, snapshot) => (
                    <Table.Row
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragableHandleProps}
                        {...this.props} />
                )}
            </Draggable>
        )
    }
}

class DevExpressTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            columns: this.props.columns
        }

        this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragEnd = result => {
        console.log(result)
    }

    render() {
        const {rows} = this.props
        const {columns} = this.state

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppableTable">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            <Grid rows={rows}
                                  columns={columns}
                            >
                                <Table rowComponent={TableRowComp}/>
                                <TableHeaderRow/>
                            </Grid>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default DevExpressTable