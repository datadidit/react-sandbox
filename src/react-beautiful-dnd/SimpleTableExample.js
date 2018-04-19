import React, {Component} from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import PropTypes from 'prop-types'

class TableRow extends Component {
    render() {
        const {name, age, index, salary} = this.props
        return (
            <Draggable draggableId={name} index={index}>
                {(provided, snapshot) => (
                    <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <td>{name}</td>
                        <td>{salary}</td>
                        <td>{age}</td>
                    </tr>
                )}
            </Draggable>
        )
    }
}

TableRow.propTypes = {
    name: PropTypes.string.isRequired,
    salary: PropTypes.number.isRequired,
    age: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}

class DraggableTableExample extends Component {
    constructor(props) {
        super(props)

        this.onDragEnd = this.onDragEnd.bind(this)
    }

    onDragEnd = result => {
        console.log(result)
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        this.props.reorder(result.source.index, result.destination.index, 'employees')
    }

    render() {
        const { rows } = this.props
        let draggableRows = []
        for(let [index, key] of rows.entries()){
            draggableRows.push(
                <TableRow name={key.name} salary={key.salary} age={key.age} index={index}/>
            )
        }

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                    </tr>
                    <Droppable droppableId="tableExample">
                        {(provided, snapshot) => (
                            <tbody
                                ref={provided.innerRef}>
                                {draggableRows}
                            </tbody>
                        )}
                    </Droppable>
                </table>
            </DragDropContext>
        )
    }
}

DraggableTableExample.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array,
    reorder: PropTypes.func.isRequired
}

export default DraggableTableExample