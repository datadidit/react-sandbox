import React, { Component } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import DraggableCard from './DraggableCard'
import PropTypes from 'prop-types'

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    width: "100%",
    height: "100%"
});

class GridDroppable extends Component {
    constructor(props){
        super(props)
        this.state = {
            draggables: this.props.draggables || [],
            droppableId: this.props.droppableId || "droppable-mui-grid"
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.draggables != nextProps.draggables){
            this.setState({
                draggables: nextProps.draggables
            })
        }
    }

    render() {
        const { draggables, droppableId } = this.state
        let draggableCards = []
        for(let [index, draggable] of draggables.entries()) {
            draggableCards.push(<DraggableCard name={draggable.name} id={draggable.id} index={index}/>)
        }

        return (
            <Droppable droppableId={droppableId}>
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
    draggables: PropTypes.array.isRequired,
    droppableId: PropTypes.string
}

export default GridDroppable

