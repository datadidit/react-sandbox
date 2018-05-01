import React, {Component} from 'react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import TableStyle from './TableStyle.css'

const getStyledTd = (content) => {
    return (
        <td style={{
            boxSizing: 'border-box',
            width: '50%'
        }}>{ content }</td>
    )
}

class TableRow extends Component {
    constructor(props){
        super(props)

    }

    handleClick = event => {
        console.log(event)
        console.log("Row clicked ")
    }
    render() {
        const {name, age, index, salary} = this.props
        let data = [
            getStyledTd(name),
            getStyledTd(salary),
            getStyledTd(age)
        ]
        return (
            <Draggable draggableId={name} index={index} key={index}>
                {(provided, snapshot) => (
                    <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={this.handleClick}
                    >
                        {data}
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
        const {rows} = this.props
        let draggableRows = []
        for (let [index, key] of rows.entries()) {
            draggableRows.push(
                <TableRow name={key.name} salary={key.salary} age={key.age} index={index}/>
            )
        }

        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <table style={{
                    width: '100%',
                }}>
                    <thead>
                        <tr style={{
                            backgroundColor: 'black',
                            color: 'white'
                        }}>
                            <th>Name</th>
                            <th>Salary</th>
                            <th>Age</th>
                        </tr>
                    </thead>
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