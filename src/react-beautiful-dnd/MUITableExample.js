import React, {Component} from 'react'
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Grid from 'material-ui/Grid'
import PropTypes from 'prop-types'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

class MUITableRows extends Component {
    constructor(props){
        super(props)

        this.tableRow = React.createRef()
    }

    render() {
        const {name, age, salary, index} = this.props

        return (
            <Draggable draggableId={name} indec={index}>
                {(provided, snapshot) => (
                    <TableRow
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <TableCell>{name}</TableCell>
                        <TableCell>{age}</TableCell>
                        <TableCell>{salary}</TableCell>
                    </TableRow>
                )}
            </Draggable>
        )
    }
}

MUITableRows.propTypes = {
    name: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}

class MUITable extends Component {
    render() {
        const {rows} = this.props
        let tableRows = []

        for (let [index, key] of rows.entries()) {
            tableRows.push(
                <MUITableRows name={key.name} salary={key.salary} age={key.age} index={index}/>
            )
        }

        return (
            <DragDropContext>
                <Grid container>
                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableCell>name</TableCell>
                                <TableCell>salary</TableCell>
                                <TableCell>age</TableCell>
                            </TableHead>
                            <Droppable droppableId={"muiTableExample"}>
                                {(provided, snapshot) => (
                                    <TableBody
                                        ref={provided.innerRef}
                                    >
                                        {tableRows}
                                    </TableBody>
                                )}
                            </Droppable>
                        </Table>
                    </Grid>
                </Grid>
            </DragDropContext>
        )
    }
}

MUITable.propTypes = {
    rows: PropTypes.array.isRequired
}

export default MUITable