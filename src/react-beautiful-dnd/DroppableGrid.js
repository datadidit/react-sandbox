import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import { Droppable } from 'react-beautiful-dnd'
import DraggableCard from './DraggableCard'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

const grid = 8

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: "100%",
    height: "100%"
});

class GridDroppable extends Component {
    constructor(props){
        super(props)
        this.state = {
            draggables: this.props.draggables || []
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.draggables != nextProps.draggables){
            this.setState({
                draggables: nextProps.draggables
            })
            console.log("Updated state")
        }
    }

    render() {
        const { draggables } = this.state
        let draggableCards = []
        for(let [index, draggable] of draggables.entries()) {
            draggableCards.push(<DraggableCard name={draggable.name} id={draggable.id} index={index}/>)
        }

        return (
            <Droppable droppableId="droppable-mui-grid">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}
                         style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {draggableCards}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
}

GridDroppable.propTypes = {
    draggables: PropTypes.array.isRequired
}

export default GridDroppable

